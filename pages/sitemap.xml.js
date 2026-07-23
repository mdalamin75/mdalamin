import { fetchAPI } from "../lib/api";

const EXTERNAL_DATA_URL = 'https://mdalamin.vercel.app';
const EXTERNAL_DATA_URL2 = 'https://www.mdalamin.online';

function generateSiteMap(projects) {
  // Helper to generate url entries for both domains
  const urlEntry = (loc, lastmod, changefreq, priority) => `
       <url>
           <loc>${loc}</loc>
           <lastmod>${lastmod}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>`;

  // Generate entries for a given domain
  const generateEntries = (domain) => {
    const staticPages = [
      { path: '', changefreq: 'daily', priority: '1.0' },
      { path: '/about', changefreq: 'weekly', priority: '0.8' },
      { path: '/portfolio', changefreq: 'weekly', priority: '0.8' },
      { path: '/service', changefreq: 'weekly', priority: '0.8' },
      { path: '/contact', changefreq: 'monthly', priority: '0.7' }
    ];

    let entries = '';

    // Static pages
    staticPages.forEach(page => {
      entries += urlEntry(
        `${domain}${page.path}`,
        new Date().toISOString(),
        page.changefreq,
        page.priority
      );
    });

    // Dynamic portfolio pages
    if (projects) {
      projects
        .filter(project => project.status === "publish")
        .forEach(({ slug, updatedAt }) => {
          entries += urlEntry(
            `${domain}/portfolio/${slug}`,
            updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
            'monthly',
            '0.7'
          );
        });
    }

    return entries;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Domain: mdalamin.vercel.app -->
     ${generateEntries(EXTERNAL_DATA_URL)}
     
     <!-- Domain: www.mdalamin.online -->
     ${generateEntries(EXTERNAL_DATA_URL2)}
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
