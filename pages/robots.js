// pages/robots.js
export default function Robots() {
    return `
        User-agent: *
        Allow: /
        Disallow: /admin
        Disallow: /privacy

        Sitemap: https://mdalamin.vercel.app/sitemap.xml
    `;
}

export async function getServerSideProps(context) {
    context.res.setHeader("Content-Type", "text/plain");
    return { props: {} };
}
