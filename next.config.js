/** @type {import('next').NextConfig} */
// Optional bundle analyzer - only load if package is installed and ANALYZE is true
let withBundleAnalyzer = (config) => config;
try {
    if (process.env.ANALYZE === 'true') {
        withBundleAnalyzer = require('@next/bundle-analyzer')({
            enabled: true,
        });
    }
} catch (error) {
    console.log('Bundle analyzer not available. Install with: npm install --save-dev @next/bundle-analyzer');
}

const nextConfig = {
    reactStrictMode: true,
    
    // Performance optimizations
    poweredByHeader: false,
    compress: true,
    
    // Image optimization
    images: {
        domains: ['res.cloudinary.com'],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    },
    
    // Bundle optimization
    experimental: {
        optimizePackageImports: ['react-icons', 'framer-motion', 'gsap'],
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    
    // Webpack optimizations
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    animations: {
                        test: /[\\/]node_modules[\\/](framer-motion|gsap|aos)[\\/]/,
                        name: 'animations',
                        chunks: 'all',
                        priority: 10,
                    },
                    particles: {
                        test: /[\\/]node_modules[\\/]@tsparticles[\\/]/,
                        name: 'particles',
                        chunks: 'all',
                        priority: 10,
                    },
                },
            },
        };
        
        // Tree shaking for specific libraries
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                'react-icons/fa': 'react-icons/fa/index.esm.js',
                'react-icons/fi': 'react-icons/fi/index.esm.js',
                'react-icons/bs': 'react-icons/bs/index.esm.js',
            };
        }
        
        return config;
    },
    
    // Headers for better caching
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
            {
                source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif|webp|avif|ico)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
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

module.exports = withBundleAnalyzer(nextConfig);