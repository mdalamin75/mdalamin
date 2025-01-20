import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* <title>MD. AL AMIN</title> */}
                <meta name="description" content="mdalamin portfolio website" />
                <meta name="keywords" content="mdalamin, mdalamin75, webdeveloper, freelancer, webdesigner, wordpress, frontenddeveloper, emailsignature, reactjs, nextjs, html, css, bootstrap, tailwind, website, git, shopify, wordpresscustomization, bugfixing, wordpressoptimization" />
                {/* Twitter Card meta tags */} <meta name="twitter:card" content="summary_large_image" /> {/* Google site verification meta tag */} 
                <meta name="google-site-verification" content="ukw3LwFvjHV9lmixrpwMYH6gmX3psZHdtCVUZGAHyP4" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}