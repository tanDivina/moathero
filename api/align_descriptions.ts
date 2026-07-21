import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'edge',
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const { brandDescription, profiles } = await req.json();

    if (!brandDescription || !profiles || !Array.isArray(profiles)) {
      return new Response(JSON.stringify({ error: 'Missing brandDescription or profiles array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Filter to active profiles only
    const activeProfiles = profiles.filter((p: any) => p.exists && p.bio);

    if (activeProfiles.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          alignmentScore: 100,
          details: [],
          message: 'No active third-party social biographies found to audit.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    // AI Semantic Audit Prompt (Strictly forbids em-dashes in instructions and outputs)
    const prompt = `
      You are an elite Brand Authority auditor. Compare a brand's core offering (source of truth) with its public social media bios to identify semantic contradictions and alignment discrepancies. This helps search models and LLMs classify the brand correctly in their entity databases.

      **STRICT CONSTRAINTS:**
      1. Under no circumstances should you include any em-dashes ("—") in your entire response or in any generated copy suggestions. Use colons (":"), commas (","), or hyphens/dashes ("-") with proper spacing instead.
      2. Return your response as raw JSON that fits the exact TypeScript format specified below.
      3. For each platform, provide a direct, optimized copy rewrite that matches its specific character limits:
         - GitHub: Max 160 characters
         - Instagram: Max 150 characters
         - YouTube: Max 1000 characters
         - Twitter/X: Max 160 characters
         - LinkedIn: Max 220 characters

      **INPUTS:**
      - Core Brand Description (Source of Truth): "${brandDescription}"
      - Active Public Profiles to Compare:
        ${activeProfiles
          .map(
            (p: any) => `
        Platform: ${p.platform}
        Profile Name: ${p.profileName}
        Public Bio/Description: "${p.bio}"
        `
          )
          .join('\n')}

      **JSON OUTPUT FORMAT:**
      \`\`\`json
      {
        "alignmentScore": 75, 
        "details": [
          {
            "platform": "GitHub",
            "score": 60,
            "discrepancy": "Contradictory location or legacy service keywords found.",
            "suggestion": "Update this profile bio to match current core competencies.",
            "optimizedBio": "Direct copy rewrite under 160 characters with colons, commas, or hyphens instead of em-dashes."
          }
        ]
      }
      \`\`\`
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON block safely
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain a valid JSON object');
    }

    const auditData = JSON.parse(jsonMatch[0]);

    // Clean any accidental em-dashes from AI generation
    const sanitizeObj = (obj: any): any => {
      if (typeof obj === 'string') {
        return obj.replace(/—/g, ' - ');
      } else if (Array.isArray(obj)) {
        return obj.map(sanitizeObj);
      } else if (typeof obj === 'object' && obj !== null) {
        const cleaned: any = {};
        for (const key of Object.keys(obj)) {
          cleaned[key] = sanitizeObj(obj[key]);
        }
        return cleaned;
      }
      return obj;
    };

    const sanitizedData = sanitizeObj(auditData);

    return new Response(JSON.stringify({ success: true, ...sanitizedData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('AI Alignment Audit API failed:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
