/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    poweredByHeader: false,
    compress: true,
    swcMinify: true,
    reactStrictMode: true,
    
    // Experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-icons', 'framer-motion'],
    },
    
    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: false,
    },
    
    // Security headers
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
    
    // Webpack optimizations for better performance
    webpack: (config, { isServer, dev }) => {
        // Tree shaking and bundle optimization
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                'react-icons/fa': 'react-icons/fa/index.esm.js',
                'react-icons/fi': 'react-icons/fi/index.esm.js',
                'react-icons/bs': 'react-icons/bs/index.esm.js',
                'react-icons/io': 'react-icons/io/index.esm.js',
                'react-icons/ai': 'react-icons/ai/index.esm.js',
            };
            
            // Optimize chunks for better caching
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: 10,
                    },
                    reactIcons: {
                        test: /[\\/]node_modules[\\/]react-icons[\\/]/,
                        name: 'react-icons',
                        chunks: 'all',
                        priority: 20,
                    },
                    framerMotion: {
                        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                        name: 'framer-motion',
                        chunks: 'all',
                        priority: 20,
                    },
                },
            };
        }
        
        // Production optimizations
        if (!dev) {
            config.optimization.minimize = true;
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;
        }
        
        return config;
    },
}

module.exports = nextConfig;