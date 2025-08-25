import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { LoadingProvider } from "../contexts/LoadingContext";

// Simple static imports for testing
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        {/* Minimal layout without dynamic imports */}
        <div className="app-wrapper min-h-screen flex flex-col">
          {!isAdminRoute && <Navbar />}
          
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          
          {!isAdminRoute && <Footer />}
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;