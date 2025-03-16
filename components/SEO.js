import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO Component for optimizing website for search engines
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Page title (will be appended with site name)
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {boolean} props.noindex - Whether to prevent indexing
 */
const SEO = ({ 
  title = "MD. AL AMIN - Web Developer & Full Stack Developer",
  description = "Expert web developer and designer specializing in React, Next.js, WordPress, Shopify, Email Signature, and e-commerce solutions. Hire MD. AL AMIN for professional web development services.",
  keywords = "mdalamin, mdalamin75, web developer, full stack developer, freelancer, React developer, Next.js developer, WordPress expert, frontend developer, web designer, portfolio, email signature, email template, Shopify store development, custom web solutions",
  ogImage = "/profile.jpg",
  ogType = "website",
  noindex = false
}) => {
  const router = useRouter();
  const canonicalUrl = `https://mdalamin.vercel.app${router.asPath}`;
  const fullTitle = title.includes("MD. AL AMIN") ? title : `${title} | MD. AL AMIN`;
  
  // Default list of services
  const services = [
    "Web Development",
    "Frontend Development",
    "React.js Development",
    "Next.js Development",
    "WordPress Development",
    "E-commerce Solutions",
    "Shopify Store Development",
    "Full Stack Development",
    "UI/UX Design",
    "Responsive Web Design",
    "Web Performance Optimization"
  ];
  
  // Combine provided keywords with services
  const allKeywords = `${keywords}, ${services.join(", ")}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="MD. AL AMIN" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={typeof ogImage === 'string' && ogImage.startsWith('http') ? ogImage : `https://mdalamin.vercel.app${ogImage || '/profile.jpg'}`} />
      <meta property="og:site_name" content="MD. AL AMIN - Professional Web Developer" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={typeof ogImage === 'string' && ogImage.startsWith('http') ? ogImage : `https://mdalamin.vercel.app${ogImage || '/profile.jpg'}`} />
      <meta name="twitter:creator" content="@mdalamin75" />
      
      {/* Robots Meta Tag */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Structured Data - Person */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "MD. AL AMIN",
            "url": "https://mdalamin.vercel.app",
            "image": "https://mdalamin.vercel.app/profile.jpg",
            "sameAs": [
              "https://github.com/mdalamin75",
              "https://linkedin.com/in/mdalamin75",
              "https://twitter.com/md_alamin75"
            ],
            "jobTitle": "Full Stack Web Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance Web Developer"
            }
          })
        }}
      />
      
      {/* Structured Data - Website */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://mdalamin.vercel.app",
            "name": "MD. AL AMIN - Professional Web Developer",
            "description": "Expert web developer specializing in React, WordPress, Shopify, and custom web solutions",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mdalamin.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
};

export default SEO; 