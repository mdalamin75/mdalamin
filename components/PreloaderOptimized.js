import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useLoading } from "../contexts/LoadingContext";

const PreloaderOptimized = () => {
    const router = useRouter();
    const preloaderRef = useRef(null);
    const textRef = useRef(null);
    const {
        isLoading,
        setIsLoading,
        isRouteChanging,
        setIsRouteChanging
    } = useLoading();
    const [pageText, setPageText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // Extract page name from URL path
    const getPageName = useCallback((path) => {
        if (path === "/") return "HOME";
        const routeName = path.split("/")[1]?.toUpperCase();
        return routeName || "HOME";
    }, []);

    // Simplified animation functions using CSS transitions
    const animateIn = useCallback(() => {
        setIsVisible(true);
    }, []);

    const animateOut = useCallback(() => {
        // Small delay for better UX, then hide
        setTimeout(() => {
            setIsVisible(false);
            setIsLoading(false);
            setIsRouteChanging(false);
        }, 300);
    }, [setIsLoading, setIsRouteChanging]);

    // Set up route change event handlers
    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            setIsRouteChanging(true);
            setIsLoading(true);
            setPageText(getPageName(url));
            animateIn();
        };

        const handleRouteChangeComplete = () => {
            // Immediate completion for better UX
            animateOut();
        };

        const handleRouteChangeError = () => {
            animateOut();
        };

        // Set initial page text
        setPageText(getPageName(router.pathname));

        // Attach route events
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeError);

        // Handle initial page load
        if (isLoading && !isRouteChanging) {
            animateIn();
            // Auto-hide after initial load
            const initialTimer = setTimeout(() => {
                if (!isRouteChanging) {
                    animateOut();
                }
            }, 1500); // Show for 1.5 seconds on initial load
            
            return () => {
                clearTimeout(initialTimer);
                router.events.off("routeChangeStart", handleRouteChangeStart);
                router.events.off("routeChangeComplete", handleRouteChangeComplete);
                router.events.off("routeChangeError", handleRouteChangeError);
            };
        }

        // Clean up event listeners
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, [router, animateIn, animateOut, getPageName, isLoading, isRouteChanging]);

    // Don't render if not visible
    if (!isVisible && !isLoading && !isRouteChanging) {
        return null;
    }

    return (
        <div
            ref={preloaderRef}
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-dark-bg via-dark2 to-dark-bg transition-all duration-500 ${
                isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
            style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            {/* Simplified SVG Animation */}
            <div className="relative flex flex-col items-center">
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    className="mb-6"
                >
                    <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-color3 animate-spin"
                        style={{
                            strokeDasharray: "164.93",
                            strokeDashoffset: "41.23",
                            animation: "spin 2s linear infinite",
                        }}
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r="25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        className="text-white/50 animate-spin"
                        style={{
                            strokeDasharray: "157.08",
                            strokeDashoffset: "78.54",
                            animation: "spin 1.5s linear infinite reverse",
                        }}
                    />
                </svg>

                {/* Page Text */}
                <div
                    ref={textRef}
                    className={`text-white text-lg font-josefin font-semibold tracking-wider transition-all duration-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                >
                    {pageText}
                </div>

                {/* Loading indicator */}
                <div className="mt-4 flex space-x-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-color3 rounded-full animate-pulse"
                            style={{
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: '1s',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreloaderOptimized;