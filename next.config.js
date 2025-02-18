/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
    exportPathMap: async function (defaultPathMap) {
        return {
            ...defaultPathMap,
            '/robots': { page: '/robots' },
        };
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