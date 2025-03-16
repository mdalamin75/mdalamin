import { fetchAPI } from "../lib/api";

const EXTERNAL_DATA_URL = 'https://mdalamin.vercel.app';

function generateServiceSiteMap(services) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     <!-- Main services page -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/service</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- Individual service pages - if you create them in the future -->
     ${services
       ? services
           .filter(service => service.status === "publish")
           .map((service) => {
             return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/service#${service.title.toLowerCase().replace(/\s+/g, '-')}`}</loc>
           <lastmod>${service.updatedAt ? new Date(service.updatedAt).toISOString() : new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
       </url>
     `;
           })
           .join('')
       : ''}
     
     <!-- Service Category Pages -->
     <url>
       <loc>${EXTERNAL_DATA_URL}/service#web-development</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/service#wordpress-development</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/service#ecommerce-solutions</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/service#frontend-development</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/service#shopify-development</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
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