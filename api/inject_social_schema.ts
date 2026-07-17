import fs from 'fs';
import path from 'path';

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

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': brandName,
      'url': formattedDomain,
      'sameAs': confirmedProfiles,
    };

    const schemaBlock = `<!-- START RANKBEACON SAMEAS SCHEMA -->\n<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n<!-- END RANKBEACON SAMEAS SCHEMA -->`;

    // Let's locate the template index.html files in our local workspace to perform real injection
    const pathsToUpdate = [
      path.resolve(process.cwd(), 'rankbeacon-moat-hero/index.html'),
      path.resolve(process.cwd(), 'index.html')
    ];

    let writeCount = 0;

    for (const filePath of pathsToUpdate) {
      if (fs.existsSync(filePath)) {
        let htmlContent = fs.readFileSync(filePath, 'utf8');

        // Clean previous schema blocks if they exist
        const prevSchemaRegex = /<!-- START RANKBEACON SAMEAS SCHEMA -->[\s\S]*?<!-- END RANKBEACON SAMEAS SCHEMA -->/g;
        htmlContent = htmlContent.replace(prevSchemaRegex, '');

        // Inject schema before </head>
        if (htmlContent.includes('</head>')) {
          htmlContent = htmlContent.replace('</head>', `${schemaBlock}\n</head>`);
          fs.writeFileSync(filePath, htmlContent, 'utf8');
          writeCount++;
        }
      }
    }

    return res.status(200).json({
      success: true,
      writeCount,
      schema: jsonLd,
      snippet: schemaBlock,
      message: `Injected SameAs Organization Schema into ${writeCount} template file(s) in the workspace.`
    });
  } catch (error: any) {
    console.error('Schema Injector API failed:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
