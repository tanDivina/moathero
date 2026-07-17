export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const brandName = url.searchParams.get('brandName') || '';
  const domain = url.searchParams.get('domain') || '';
  const brandDescription = url.searchParams.get('brandDescription') || '';

  const handle = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (!brandName || !domain) {
    return new Response(JSON.stringify({ error: 'Missing brandName or domain' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Define platforms to check
  const platforms = [
    {
      platform: "GitHub",
      key: "github",
      handle: `@${handle}`,
      url: `https://github.com/${handle}`
    },
    {
      platform: "Instagram",
      key: "instagram",
      handle: `@${handle}`,
      url: `https://www.instagram.com/${handle}/`
    },
    {
      platform: "YouTube",
      key: "youtube",
      handle: `@${handle}`,
      url: `https://www.youtube.com/@${handle}`
    }
  ];

  const results = await Promise.all(platforms.map(async (p) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const res = await fetch(p.url, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        }
      });
      clearTimeout(timeoutId);

      if (res.status === 200) {
        const html = await res.text();
        
        // Extract title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';

        // Extract description
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || 
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i) ||
                          html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["'][^>]*>/i);
                          
        const description = descMatch ? descMatch[1].trim() : '';

        // Extract profile name (often part of title, e.g. "GitHub - Handle/Repo" or "Name (@handle) • Instagram")
        let profileName = title;
        if (p.key === 'github') {
          profileName = title.split(' - ')[0] || title;
        } else if (p.key === 'instagram') {
          profileName = title.split('(')[0]?.trim() || title;
        } else if (p.key === 'youtube') {
          profileName = title.replace(' - YouTube', '').trim();
        }

        return {
          ...p,
          exists: true,
          status: "Profile Active",
          profileName: profileName,
          bio: description || "No bio found.",
          htmlLength: html.length
        };
      } else {
        return {
          ...p,
          exists: false,
          status: "Not Found",
          profileName: "",
          bio: ""
        };
      }
    } catch (e) {
      return {
        ...p,
        exists: false,
        status: "Error Fetching",
        profileName: "",
        bio: ""
      };
    }
  }));

  // Analyze discrepancies to match frontend expectations
  const stopwords = new Set(['and', 'the', 'with', 'for', 'from', 'this', 'that', 'your', 'our', 'specializing', 'specializes', 'offering', 'offers', 'boutique', 'brand', 'official', 'page', 'about', 'things', 'located', 'offering', 'specializing']);
  const extractedKeywords = brandDescription
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopwords.has(w));
  const coreKeywords = Array.from(new Set(extractedKeywords)).slice(0, 5);

  let scoreMultiplier = 0;

  const analyzedResults = results.map(r => {
    if (!r.exists) return r;

    let discrepancy = null;
    let fixRecommendation = null;

    const cleanProfileName = r.profileName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanBrandName = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (cleanProfileName === cleanBrandName) {
      scoreMultiplier += 0.4; 
    } else if (cleanProfileName.includes(cleanBrandName) || cleanBrandName.includes(cleanProfileName)) {
      scoreMultiplier += 0.2; 
      discrepancy = `Minor naming mismatch: '${r.profileName}' contains extra modifiers compared to brand '${brandName}'.`;
      fixRecommendation = `Consider updating your display name to exactly '${brandName}' on ${r.platform} to maximize entity authority.`;
    } else {
      discrepancy = `Critical branding mismatch: Profile name '${r.profileName}' does not match expected brand name '${brandName}'.`;
      fixRecommendation = `Change your profile name on ${r.platform} from '${r.profileName}' to '${brandName}' so search engines don't dilute your brand entity index.`;
    }

    const cleanBio = r.bio.toLowerCase();
    const matchedKeywords = coreKeywords.filter(k => cleanBio.includes(k));
    const matchPercentage = coreKeywords.length > 0 ? (matchedKeywords.length / coreKeywords.length) * 100 : 100;

    if (matchPercentage >= 40) {
      scoreMultiplier += 0.4; 
    } else {
      const missedKeywords = coreKeywords.filter(k => !cleanBio.includes(k));
      const driftNotice = `Topical Drift Alert: Description matches only ${matchedKeywords.length}/${coreKeywords.length} core brand topics (${Math.round(matchPercentage)}% alignment).`;
      discrepancy = discrepancy ? `${discrepancy} ${driftNotice}` : driftNotice;
      
      const keywordFix = `Integrate missing brand keywords like [${missedKeywords.join(', ')}] into your profile bio.`;
      fixRecommendation = fixRecommendation ? `${fixRecommendation} Also, ${keywordFix}` : keywordFix;
    }

    if (r.bio && r.bio.length > 0 && r.bio !== "No bio found.") {
      scoreMultiplier += 0.2; 
    }

    return {
      ...r,
      discrepancy,
      fixRecommendation,
      topicalScore: Math.round(matchPercentage),
      matchedKeywords
    };
  });

  const alignmentScore = Math.round((scoreMultiplier / Math.max(1, analyzedResults.length)) * 100);

  return new Response(JSON.stringify({ profiles: analyzedResults, alignmentScore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
