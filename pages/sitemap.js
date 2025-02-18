// app/sitemap.js

export default function sitemap() {
    return [
      {
        url: 'https://mdalamin.vercel.app',
        lastModified: new Date().toISOString(), // Convert Date to ISO string
        changeFrequency: 'yearly', // Note: Next.js doesn't actually use this value
        priority: 1, // Note: Next.js doesn't actually use this value
      },
      {
        url: 'https://mdalamin.vercel.app/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.9,
      },
      {
        url: 'https://mdalamin.vercel.app/portfolio',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://mdalamin.vercel.app/contact',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.7,
      },
    ];
  }