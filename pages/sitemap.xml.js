import { fetchAPI } from "../lib/api";

const EXTERNAL_DATA_URL = 'https://mdalamin.vercel.app';

function generateSiteMap(projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/portfolio</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/service</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/contact</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <!-- Dynamic portfolio pages -->
     ${projects
       ? projects
           .filter(project => project.status === "publish")
           .map(({ slug, updatedAt }) => {
             return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/portfolio/${slug}`}</loc>
           <lastmod>${updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
           })
           .join('')
       : ''}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Generate dynamic portfolio slugs
  let projects = [];
  try {
    projects = await fetchAPI('portfolio');
  } catch (error) {
    console.error('Error fetching portfolio for sitemap:', error);
  }

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  
  // Generate and serve sitemap
  const sitemap = generateSiteMap(projects);
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // Server-side rendered page, doesn't render on client
  return null;
}
