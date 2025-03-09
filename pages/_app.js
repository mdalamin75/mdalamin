import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientAnimations from "../components/ClientAnimations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Preloader from "../components/Preloader";
import { LoadingProvider } from "../contexts/LoadingContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Initialize route for LoadingContext
  useEffect(() => {
    // We'll handle initial loading in the LoadingContext
  }, [router.pathname]);

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        {/* Preloader must be the first element */}
        <Preloader />
        
        {/* Main content */}
        <div id="app-content">
          {!isAdminRoute && <Navbar />}
          <Component {...pageProps} />
          <ClientAnimations />
          {!isAdminRoute && <Footer />}
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;