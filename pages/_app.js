import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingProvider } from "../contexts/LoadingContext";
import Head from "next/head";
import { useEffect } from "react";

// Static imports to prevent dynamic loading issues
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CursorAnimation from "../components/CursorAnimation";
import ClientTawkMessenger from "../components/ClientTawkMessenger";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Register service worker only in production
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#10b981" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="MD. AL AMIN" />
        </Head>

        {/* Simplified layout without dynamic loading */}
        <div className="app-wrapper min-h-screen flex flex-col">
          {!isAdminRoute && <Navbar />}

          <main className="flex-grow">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={router.asPath}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </main>

          <CursorAnimation />
          
          {/* Live Chat - Only show on non-admin pages */}
          {!isAdminRoute && <ClientTawkMessenger />}

          {!isAdminRoute && <Footer />}
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;