import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientAnimations from "../components/ClientAnimations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Preloader from "../components/Preloader";
import { LoadingProvider, useLoading } from "../contexts/LoadingContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        {/* Preloader must be the first element */}
        <Preloader />

        {/* Main content with flex layout to keep footer at bottom */}
        <div className="app-wrapper min-h-screen flex flex-col">
          {!isAdminRoute && <Navbar />}
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <ClientAnimations />
          {!isAdminRoute && <Footer />}
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;