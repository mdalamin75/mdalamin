import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Essential Meta Tags */}
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Base meta tags - specific tags will be added by SEO component */}
                <meta name="description" content="MD. AL AMIN - Professional web developer specializing in React, Next.js, WordPress, and e-commerce solutions. Expert in frontend and full-stack development." />
                <meta name="keywords" content="mdalamin, mdalamin75, web developer, full stack developer, freelancer, React developer, Next.js developer, WordPress expert, frontend developer, web designer, e-commerce developer, shopify expert, portfolio website, responsive web design, UI/UX design, performance optimization, website maintenance, custom web development" />
                <meta name="author" content="MD. AL AMIN" />
                
                {/* Google Site Verification */}
                <meta name="google-site-verification" content="ukw3LwFvjHV9lmixrpwMYH6gmX3psZHdtCVUZGAHyP4" />
                
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                
                {/* Theme Color */}
                <meta name="theme-color" content="#0b1121" />
                <meta name="msapplication-TileColor" content="#0b1121" />
                
                {/* Base Open Graph */}
                <meta property="og:site_name" content="MD. AL AMIN - Professional Web Developer" />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter base settings */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@mdalamin75" />

                {/* Preconnect to essential domains */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}