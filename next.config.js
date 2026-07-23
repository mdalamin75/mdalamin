/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    poweredByHeader: false,
    compress: true,
    reactStrictMode: process.env.NODE_ENV === 'production',

    // Experimental features for better performance
    experimental: {
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
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: false,
    },

    // Security headers (only in production to avoid interfering with dev HMR)
    async headers() {
        // In development, only return minimal security headers (no Cache-Control)
        // Aggressive Cache-Control in dev breaks Next.js webpack HMR hot-update.json requests
        if (process.env.NODE_ENV !== 'production') {
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
            ];
        }

        // Production headers with proper caching
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
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/(.*)\\.(woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif|webp|avif|ico)$',
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
        // Production optimizations (avoid in dev to prevent HMR issues in Next.js 15)
        if (!dev) {
            if (!isServer) {
                // Tree shaking and bundle optimization
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

            config.optimization.minimize = true;
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;
        }

        return config;
    }
}

module.exports = nextConfig;