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
  };
  
  module.exports = nextConfig;
  