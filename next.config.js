/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    
    images: {
        domains: ['res.cloudinary.com'],
    },
    
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap.xml',
            },
        ];
    },
};

module.exports = nextConfig;