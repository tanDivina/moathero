import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'edge',
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const isRetryableGeminiError = (error: unknown) =>
  /\b(429|503)\b|high demand|service unavailable|temporarily unavailable/i.test(
    error instanceof Error ? error.message : String(error)
  );

async function generateWithRetry(model: any, prompt: string) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      lastError = error;
      if (!isRetryableGeminiError(error) || attempt === 2) break;
      await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt));
    }
  }

  throw lastError;
}

async function fetchSearchSnippets(query: string): Promise<string> {
  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return '';
    }

    const html = await response.text();
    
    // Extract description snippets from DuckDuckGo search result page
    const snippetRegex = /<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/g;
    let match;
    const snippets: string[] = [];
    
    while ((match = snippetRegex.exec(html)) !== null && snippets.length < 10) {
      const cleanSnippet = match[1]
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      snippets.push(cleanSnippet);
    }
    
    return snippets.join('\n');
  } catch (err) {
    console.warn('Search snippet fetch failed or timed out:', err);
    return '';
  }
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const url = new URL(req.url);
  const brandName = url.searchParams.get('brandName') || '';
  const domain = url.searchParams.get('domain') || '';

  if (!brandName || !domain) {
    return new Response(JSON.stringify({ error: 'Missing brandName or domain' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    // Fetch live search results for the brand and domain
    const [brandSnippets, forumSnippets] = await Promise.all([
      fetchSearchSnippets(`"${brandName}" OR "${domain}"`),
      fetchSearchSnippets(`site:reddit.com "${brandName}" OR site:github.com "${brandName}"`)
    ]);

    const combinedSnippets = `
      BRAND SEARCH RESULTS:
      ${brandSnippets || 'No search results found.'}

      FORUM & DEV ENGAGEMENT RESULTS:
      ${forumSnippets || 'No forum/developer results found.'}
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    // AI Citation Evaluation Prompt (Strictly forbids em-dashes)
    const prompt = `
      You are an advanced AI search engine analyzer. Based on the scraped search snippets, evaluate the brand's citation density, category consensus, and Share of Voice (SoV) across different AI Search Models.

      **STRICT CONSTRAINTS:**
      1. Under no circumstances should you include any em-dashes ("—") in your entire response or generated outputs. Use colons (":"), commas (","), or hyphens/dashes ("-") with proper spacing instead.
      2. Return your response as raw JSON that fits the exact format specified below.

      **INPUTS:**
      - Brand Name: "${brandName}"
      - Brand Domain: "${domain}"
      - Scraped Search Snippets:
        "${combinedSnippets.substring(0, 8000)}"

      **JSON OUTPUT FORMAT:**
      \`\`\`json
      {
        "consensusIndex": 75,
        "citationDensity": 62,
        "authorAttribution": 55,
        "forumMentions": 48,
        "sov": [
          { "query": "${brandName} services", "gemini": 80, "chatgpt": 65, "perplexity": 72 },
          { "query": "best ${brandName} solutions", "gemini": 72, "chatgpt": 58, "perplexity": 64 }
        ],
        "targetArticles": [
          {
            "title": "Top ${brandName} Trends",
            "publisher": "Industry Insider",
            "traffic": "15k/mo",
            "query": "${brandName}",
            "targetUrl": "https://example.com/trends"
          }
        ]
      }
      \`\`\`
    `;

    const result = await generateWithRetry(model, prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain a valid JSON object');
    }

    const citationData = JSON.parse(jsonMatch[0]);

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

    const sanitizedData = sanitizeObj(citationData);

    return new Response(JSON.stringify({ success: true, ...sanitizedData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('AI Citation SOV API failed:', error);
    const retryable = isRetryableGeminiError(error);
    return new Response(JSON.stringify({
      error: retryable
        ? 'Gemini is temporarily busy. Please retry the audit in a moment.'
        : error.message || 'Internal server error',
      retryable,
    }), {
      status: retryable ? 503 : 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
