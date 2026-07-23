import { fetchAPI } from "../lib/api";

const EXTERNAL_DATA_URL = 'https://mdalamin.vercel.app';
const EXTERNAL_DATA_URL2 = 'https://www.mdalamin.online';

function generateServiceSiteMap(services) {
  // Helper to generate url entries
  const urlEntry = (loc, lastmod, changefreq, priority) => `
       <url>
           <loc>${loc}</loc>
           <lastmod>${lastmod}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>`;

  const lastmod = new Date().toISOString();

  // Generate entries for a given domain
  const generateEntries = (domain) => {
    let entries = '';

    // Main services page
    entries += urlEntry(`${domain}/service`, lastmod, 'weekly', '1.0');

    // Individual service pages
    if (services) {
      services
        .filter(service => service.status === "publish")
        .forEach((service) => {
          entries += urlEntry(
            `${domain}/service#${service.title.toLowerCase().replace(/\s+/g, '-')}`,
            service.updatedAt ? new Date(service.updatedAt).toISOString() : lastmod,
            'monthly',
            '0.9'
          );
        });
    }

    // Service Category Pages
    const categories = [
      'web-development',
      'wordpress-development',
      'ecommerce-solutions',
      'frontend-development',
      'shopify-development'
    ];

    categories.forEach(category => {
      entries += urlEntry(`${domain}/service#${category}`, lastmod, 'monthly', '0.8');
    });

    return entries;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     
     <!-- Domain: mdalamin.vercel.app -->
     ${generateEntries(EXTERNAL_DATA_URL)}
     
     <!-- Domain: www.mdalamin.online -->
     ${generateEntries(EXTERNAL_DATA_URL2)}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Generate dynamic service entries
  let services = [];
  try {
    services = await fetchAPI('service');
  } catch (error) {
    console.error('Error fetching services for sitemap:', error);
  }

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

  // Generate and serve sitemap
  const sitemap = generateServiceSiteMap(services);
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function ServicesSiteMap() {
  // Server-side rendered page, doesn't render on client
  return null;
} 