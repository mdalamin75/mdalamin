import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientAnimations from "../components/ClientAnimations";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  return (
    <SessionProvider session={session}>
      {!isAdminRoute && <Navbar />} 
        <ClientAnimations/>
        <Component {...pageProps} /> 
      {!isAdminRoute && <Footer />}
    </SessionProvider>
  )
}

export default MyApp;