import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoading } from "../contexts/LoadingContext";

const SimplePreloader = () => {
    const router = useRouter();
    const { isLoading, setIsLoading, isRouteChanging, setIsRouteChanging } = useLoading();
    const [pageText, setPageText] = useState("HOME");

    // Get page name from URL
    const getPageName = (path) => {
        if (path === "/") return "HOME";
        const routeName = path.split("/")[1]?.toUpperCase();
        return routeName || "HOME";
    };

    // Handle route changes
    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            setIsRouteChanging(true);
            setIsLoading(true);
            setPageText(getPageName(url));
        };

        const handleRouteChangeComplete = () => {
            setIsRouteChanging(false);
            setIsLoading(false);
        };

        const handleRouteChangeError = () => {
            setIsRouteChanging(false);
            setIsLoading(false);
        };

        // Set initial page text
        setPageText(getPageName(router.pathname));

        // Add event listeners
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeError);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, [router, setIsLoading, setIsRouteChanging]);

    // Don't show preloader if not loading
    if (!isLoading && !isRouteChanging) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-dark-bg via-dark2 to-dark-bg">
            <div className="flex flex-col items-center space-y-6">
                {/* Simple spinner */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-color3/30 rounded-full"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-color3 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Page name */}
                <div className="text-white text-lg font-josefin font-semibold tracking-wider">
                    {pageText}
                </div>

                {/* Loading dots */}
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-color3 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-color3 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-color3 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SimplePreloader;