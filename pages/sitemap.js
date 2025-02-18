// app/sitemap.js

export default function sitemap() {
    return [
      {
        url: 'https://mdalamin.vercel.app',
        lastModified: new Date().toISOString(),
      },
      {
        url: 'https://mdalamin.vercel.app/about',
        lastModified: new Date().toISOString(),
      },
      {
        url: 'https://mdalamin.vercel.app/portfolio',
        lastModified: new Date().toISOString(),
      },
      {
        url: 'https://mdalamin.vercel.app/contact',
        lastModified: new Date().toISOString(),
      },
    ];
  }