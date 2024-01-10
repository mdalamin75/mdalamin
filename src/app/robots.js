export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/privacy'],
        },
        sitemap: 'https://mdalamin.vercel.app/sitemap.xml',
    }
}