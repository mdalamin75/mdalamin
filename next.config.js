/** @type {import('next').NextConfig} */
const nextConfig = {
    // Basic image optimization
    images: {
        domains: ['localhost', 'res.cloudinary.com'],
        formats: ['image/webp'],
    },
    // Enable compression
    compress: true,
    // Optimize fonts
    optimizeFonts: true,
}

module.exports = nextConfig;