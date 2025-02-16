import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

const Preloader = ({ isDataLoading }) => {
    const router = useRouter();
    const [isRouteChanging, setIsRouteChanging] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const animationComplete = useRef(false);
    const timeline = useRef(null);

    const getPageName = (path) => {
        if (path === "/") return "HOME";
        const routeName = path.split("/")[1].toUpperCase();
        return routeName || "HOME";
    };

    const runAnimation = (onComplete) => {
        // Kill any existing animation
        if (timeline.current) {
            timeline.current.kill();
        }

        timeline.current = gsap.timeline({
            onComplete: () => {
                animationComplete.current = true;
                if (onComplete) onComplete();
            }
        });

        const curve = "M0 500S175 300 500 300s500 200 500 200V0H0Z";
        const flat = "M0 0S175 0 500 0s500 0 500 0V0H0Z";

        // Reset states
        gsap.set(".preloader", {
            y: 0,
            display: "flex",
            zIndex: 9999,
            opacity: 1,
            visibility: "visible"
        });

        gsap.set("#preloaderSvg", {
            attr: { d: "M0 1000S175 1000 500 1000s500 0 500 0V0H0Z" }
        });

        gsap.set(".preloader-heading .load-text", {
            y: 0,
            opacity: 1
        });

        // Run animation sequence
        timeline.current
            .to(".preloader-heading .load-text", {
                delay: 0.3,
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to("#preloaderSvg", {
                duration: 0.8,
                attr: { d: curve },
                ease: "power2.inOut"
            })
            .to("#preloaderSvg", {
                duration: 0.8,
                attr: { d: flat },
                ease: "power2.inOut"
            })
            .to(".preloader", {
                duration: 0.8,
                y: -1500,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.set(".preloader", {
                        display: "none",
                        y: 0,
                        visibility: "hidden"
                    });
                }
            });
    };

    useEffect(() => {
        // Set initial page name
        setLoadingText(getPageName(router.pathname));

        const handleStart = (url) => {
            animationComplete.current = false;
            setIsRouteChanging(true);
            setLoadingText(getPageName(url));
            
            gsap.set(".preloader", {
                display: "flex",
                y: 0,
                visibility: "visible",
                zIndex: 9999
            });
            
            runAnimation();
        };

        const handleComplete = () => {
            if (!animationComplete.current) {
                runAnimation(() => {
                    setIsRouteChanging(false);
                });
            } else {
                setIsRouteChanging(false);
            }
        };

        const handleError = handleComplete;

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleError);

        // Initial load animation
        if (!isDataLoading && !isRouteChanging) {
            runAnimation();
        }

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleError);
            if (timeline.current) {
                timeline.current.kill();
            }
        };
    }, [router, isDataLoading, isRouteChanging]);

    return (
        <div className="preloader">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path 
                    id="preloaderSvg" 
                    d="M0 1000S175 1000 500 1000s500 0 500 0V0H0Z"
                ></path>
            </svg>
            
            <div className="preloader-heading">
                <div className="load-text">
                    {loadingText.split("").map((char, index) => (
                        <span 
                            key={index}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                display: 'inline-block'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preloader;