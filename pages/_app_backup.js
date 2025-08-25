import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { LoadingProvider } from "../contexts/LoadingContext";
import Head from "next/head";

// Static imports to prevent dynamic loading issues
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SimpleAnimations from "../components/SimpleAnimations";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        
        {/* Simplified layout without dynamic loading */}
        <div className="app-wrapper min-h-screen flex flex-col">
          {!isAdminRoute && <Navbar />}
          
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          
          <SimpleAnimations />
          
          {!isAdminRoute && <Footer />}
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;