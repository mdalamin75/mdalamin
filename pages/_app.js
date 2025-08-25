import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, Suspense } from "react";
import { LoadingProvider } from "../contexts/LoadingContext";
import dynamic from "next/dynamic";

// Dynamic imports for better code splitting
const Navbar = dynamic(() => import("../components/Navbar"), {
    ssr: true,
    loading: () => <div className="h-16 bg-dark-bg" /> // Placeholder to prevent layout shift
});

const Footer = dynamic(() => import("../components/Footer"), {
    ssr: true,
    loading: () => <div className="h-32 bg-dark-bg" />
});

const ClientAnimations = dynamic(() => import("../components/ClientAnimations"), {
    ssr: false,
    loading: () => null
});

const PreloaderOptimized = dynamic(() => import("../components/SimplePreloader"), {
    ssr: false,
    loading: () => null
});

const PerformanceMonitor = dynamic(() => import("../components/PerformanceMonitor"), {
    ssr: false,
    loading: () => null
});

const LoadingDebug = dynamic(() => import("../components/LoadingDebug"), {
    ssr: false,
    loading: () => null
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Preload critical route components
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Preload components for the next route
      if (url.includes('/portfolio')) {
        import('../components/ProjectItem');
        import('../components/ParticlesOptimized');
      }
      if (url.includes('/about')) {
        import('../components/CountUpAnimation');
      }
      if (url.includes('/contact')) {
        import('../components/ContactForm');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  return (
    <LoadingProvider>
      <SessionProvider session={session}>
        {/* Performance monitoring */}
        <PerformanceMonitor />
        
        {/* Debug info in development */}
        <LoadingDebug />
        
        {/* Optimized Preloader */}
        <PreloaderOptimized />

        {/* Main content with optimized layout */}
        <div className="app-wrapper min-h-screen flex flex-col">
          <Suspense fallback={<div className="h-16 bg-dark-bg" />}>
            {!isAdminRoute && <Navbar />}
          </Suspense>
          
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen bg-dark-bg flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-color3"></div>
            </div>}>
              <Component {...pageProps} />
            </Suspense>
          </main>
          
          <ClientAnimations />
          
          <Suspense fallback={<div className="h-32 bg-dark-bg" />}>
            {!isAdminRoute && <Footer />}
          </Suspense>
        </div>
      </SessionProvider>
    </LoadingProvider>
  );
}

export default MyApp;