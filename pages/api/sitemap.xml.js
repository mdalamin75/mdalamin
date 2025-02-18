// pages/api/sitemap.xml.js

export default function handler(req, res) {
    const entries = [
      {
        url: 'https://mdalamin.vercel.app',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://mdalamin.vercel.app/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.9,
      },
      {
        url: 'https://mdalamin.vercel.app/portfolio',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://mdalamin.vercel.app/contact',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.7,
      },
    ];
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${entries.map(entry => `
          <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastModified}</lastmod>
            <changefreq>${entry.changeFrequency}</changefreq>
            <priority>${entry.priority}</priority>
          </url>
        `).join('')}
      </urlset>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
  }