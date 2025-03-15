import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useLoading } from "../contexts/LoadingContext";
import gsap from "gsap";

const Preloader = () => {
    const router = useRouter();
    const preloaderRef = useRef(null);
    const svgPathRef = useRef(null);
    const textRef = useRef(null);
    const textContainerRef = useRef(null);
    const { 
        isLoading, 
        setIsLoading, 
        isRouteChanging, 
        setIsRouteChanging 
    } = useLoading();
    const [pageText, setPageText] = useState("");
    const [hiddenClass, setHiddenClass] = useState("");
    
    // Extract page name from URL path
    const getPageName = (path) => {
        if (path === "/") return "HOME";
        const routeName = path.split("/")[1]?.toUpperCase();
        return routeName || "HOME";
    };

    // Apply hidden class when not loading
    useEffect(() => {
        if (!isLoading && !isRouteChanging) {
            // Add a small delay before adding hidden class
            const timer = setTimeout(() => {
                setHiddenClass("hidden");
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setHiddenClass("");
        }
    }, [isLoading, isRouteChanging]);

    // Ensure preloader shows on every page load
    useEffect(() => {
        // Force loading state to true on initial mount
        setIsLoading(true);
        
        // Set a minimum display time for the preloader
        const minDisplayTimer = setTimeout(() => {
            // After minimum time, check if data is loaded
            if (!isRouteChanging) {
                animateOut();
            }
        }, 800); // Ensure preloader shows for at least 800ms
        
        return () => clearTimeout(minDisplayTimer);
    }, []);

    // Set up route change event handlers
    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            // Set the state for route change start
            setIsRouteChanging(true);
            setIsLoading(true);
            setPageText(getPageName(url));
            
            // Show preloader
            if (preloaderRef.current) {
                gsap.set(preloaderRef.current, { 
                    autoAlpha: 1, 
                    display: "flex",
                    y: 0,
                    visibility: "visible"
                });
            }
            
            // Reset text container
            if (textContainerRef.current) {
                gsap.set(textContainerRef.current, {
                    autoAlpha: 1,
                    visibility: "visible"
                });
            }
            
            // Ensure text is visible
            if (textRef.current) {
                gsap.set(textRef.current, {
                    autoAlpha: 1,
                    visibility: "visible"
                });
            }
        };

        const handleRouteChangeComplete = () => {
            // After route change is complete, animate out preloader
            animateOut();
        };

        const handleRouteChangeError = () => {
            // Handle route change error the same way
            animateOut();
        };

        // Set initial page text
        setPageText(getPageName(router.pathname));

        // Attach route events
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeError);

        // Initial animation if needed
        if (isLoading && !isRouteChanging) {
            animateIn();
        }

        // Clean up event listeners
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, [router, setIsLoading, setIsRouteChanging, isLoading, isRouteChanging]);

    // Animate in the preloader
    const animateIn = () => {
        const tl = gsap.timeline();
        if (preloaderRef.current && svgPathRef.current && textRef.current) {
            // Ensure preloader is visible
            gsap.set(preloaderRef.current, { 
                autoAlpha: 1, 
                display: "flex",
                visibility: "visible"
            });
            
            // Ensure text container is visible
            gsap.set(textContainerRef.current, {
                autoAlpha: 1,
                visibility: "visible"
            });
            
            // Prepare each letter for animation
            const textChars = textRef.current.children;
            gsap.set(textChars, {
                y: 50,
                opacity: 0,
                visibility: "visible"
            });
            
            // Animate each letter with a fixed timeline
            gsap.to(textChars, {
                y: 0, 
                opacity: 1,
                duration: 0.3,
                stagger: 0.04,
                ease: "power2.out",
                visibility: "visible"
            });
        }
    };

    // Animate out the preloader
    const animateOut = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsRouteChanging(false);
                setIsLoading(false);
            }
        });

        if (preloaderRef.current && svgPathRef.current && textRef.current && textContainerRef.current) {
            // Hide all text letters first with improved animation
            const textChars = textRef.current.children;
            
            // Animate all text characters out with staggered animation
            gsap.to(textChars, {
                y: -30,
                opacity: 0,
                duration: 0.3,
                stagger: 0.03, 
                ease: "power2.in",
                onComplete: () => {
                    // After all letters are gone, hide the entire text container
                    gsap.set(textContainerRef.current, {
                        autoAlpha: 0,
                        visibility: "hidden",
                        display: "none"
                    });
                    
                    // Hide all individual letters
                    gsap.set(textChars, {
                        opacity: 0,
                        visibility: "hidden"
                    });
                }
            });
            
            // Continue with the SVG animation after a delay
            tl.to(svgPathRef.current, {
                attr: { d: "M0 500S175 300 500 300s500 200 500 200V0H0Z" },
                duration: 0.8,
                ease: "power2.inOut",
                delay: 0.3
            });
            
            tl.to(svgPathRef.current, {
                attr: { d: "M0 0S175 0 500 0s500 0 500 0V0H0Z" },
                duration: 0.8,
                ease: "power2.inOut"
            });
            
            // Hide preloader completely
            tl.to(preloaderRef.current, {
                y: -window.innerHeight,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => {
                    // Apply multiple visibility/display settings to ensure it's hidden
                    gsap.set(preloaderRef.current, { 
                        autoAlpha: 0, 
                        y: 0,
                        display: "none",
                        visibility: "hidden"
                    });
                    
                    // Double-check to ensure all text elements are completely gone
                    gsap.set(textContainerRef.current, { 
                        autoAlpha: 0,
                        visibility: "hidden",
                        display: "none"
                    });
                    
                    // Hide all individual text elements
                    gsap.set(textChars, { 
                        opacity: 0,
                        visibility: "hidden" 
                    });
                }
            });
        }
    };

    // Don't render if not loading and not route changing AND if hiddenClass is applied
    if (!isLoading && !isRouteChanging && hiddenClass) {
        return null;
    }

    return (
        <div 
            ref={preloaderRef} 
            className={`preloader ${hiddenClass}`}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100dvh",
                background: "transparent",
                zIndex: 9999,
                display: isLoading || isRouteChanging ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                pointerEvents: "none",
                opacity: isLoading || isRouteChanging ? 1 : 0,
                visibility: isLoading || isRouteChanging ? "visible" : "hidden"
            }}
        >
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path 
                    ref={svgPathRef}
                    d="M0 1000S175 1000 500 1000s500 0 500 0V0H0Z"
                    fill="#0b1121"
                ></path>
            </svg>
            
            <div 
                ref={textContainerRef}
                className="preloader-text"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    color: "#fff",
                    width: "100%",
                    textAlign: "center",
                    opacity: 1,
                    visibility: "visible"
                }}
            >
                <div 
                    ref={textRef}
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1,
                        visibility: "visible",
                        opacity: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    {pageText.split("").map((char, index) => (
                        <span 
                            key={index}
                            style={{
                                display: 'inline-block',
                                margin: '0 2px',
                                letterSpacing: '1px',
                                opacity: 1,
                                visibility: "visible",
                                transform: "translateY(0)"
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