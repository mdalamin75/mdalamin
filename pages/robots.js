// pages/robots.js
export default function Robots() {
    return `# https://mdalamin.com robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/

# Allow images to be indexed
User-agent: Googlebot-Image
Allow: /

# Allow Googlebot to prioritize important pages
User-agent: Googlebot
Allow: /
Allow: /service
Allow: /portfolio
Allow: /about
Allow: /contact

# Sitemaps
Sitemap: https://mdalamin.com/sitemap.xml
Sitemap: https://mdalamin.com/services-sitemap.xml
`;
}

export async function getServerSideProps(context) {
    context.res.setHeader("Content-Type", "text/plain");
    context.res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return { props: {} };
}
