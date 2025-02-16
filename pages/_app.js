import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientAnimations from "../components/ClientAnimations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Allow time for initial animations
    setTimeout(() => setIsLoading(false), 500);
  }, [])
  return (
    <>
      <Preloader isDataLoading={isLoading} />
      <SessionProvider session={session}>
        {!isAdminRoute && <Navbar />}
        <ClientAnimations />
        <Component {...pageProps} />
        {!isAdminRoute && <Footer />}
      </SessionProvider>
    </>
  )
}

export default MyApp;