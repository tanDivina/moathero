export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { domain, brandName, confirmedProfiles } = req.body;

    if (!domain || !brandName || !confirmedProfiles || !Array.isArray(confirmedProfiles)) {
      return res.status(400).json({ error: 'Missing domain, brandName, or confirmedProfiles' });
    }

    const formattedDomain = domain.startsWith('http') ? domain : `https://${domain}`;
    const siteUrl = new URL(formattedDomain);
    if (!['http:', 'https:'].includes(siteUrl.protocol)) {
      return res.status(400).json({ error: 'Domain must be an HTTP(S) URL.' });
    }

    const verifiedProfiles = confirmedProfiles.filter((profile: unknown) => {
      if (typeof profile !== 'string') return false;
      try {
        const profileUrl = new URL(profile);
        return ['http:', 'https:'].includes(profileUrl.protocol);
      } catch {
        return false;
      }
    });

    if (verifiedProfiles.length === 0) {
      return res.status(400).json({ error: 'Provide at least one valid social profile URL.' });
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': brandName,
      'url': formattedDomain,
      'sameAs': verifiedProfiles,
    };

    const schemaBlock = `<!-- START RANKBEACON SAMEAS SCHEMA -->\n<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n<!-- END RANKBEACON SAMEAS SCHEMA -->`;

    return res.status(200).json({
      success: true,
      schema: jsonLd,
      snippet: schemaBlock,
      message: 'Copy the generated snippet into your website head before deploying.'
    });
  } catch (error: any) {
    console.error('Schema Injector API failed:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
