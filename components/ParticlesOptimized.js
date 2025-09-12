import { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic import for particles to reduce initial bundle size
const Particles = dynamic(() => import("@tsparticles/react"), {
    ssr: false,
    loading: () => null,
});

// Dynamic import for particles engine
const loadParticlesEngine = dynamic(
    () => import("@tsparticles/react").then(mod => mod.initParticlesEngine),
    { ssr: false }
);

const loadSlim = dynamic(
    () => import("@tsparticles/slim").then(mod => mod.loadSlim),
    { ssr: false }
);

const ParticlesOptimized = ({ reduceMotion = false }) => {
    const [init, setInit] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [theme, setTheme] = useState("light");

    // Check for user preference for reduced motion
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setShouldRender(!prefersReducedMotion && !reduceMotion);
    }, [reduceMotion]);

    // Detect theme changes
    useEffect(() => {
        const detectTheme = () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            setTheme(currentTheme || "light");
        };

        // Initial theme detection
        detectTheme();

        // Watch for theme changes
        const observer = new MutationObserver(detectTheme);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ["data-theme"] 
        });

        return () => observer.disconnect();
    }, []);

    // Initialize particles engine only when needed
    useEffect(() => {
        if (!shouldRender) return;
        
        let isMounted = true;
        
        const initEngine = async () => {
            try {
                const { initParticlesEngine } = await import("@tsparticles/react");
                const { loadSlim } = await import("@tsparticles/slim");
                
                await initParticlesEngine(async (engine) => {
                    await loadSlim(engine);
                });
                
                if (isMounted) {
                    setInit(true);
                }
            } catch (error) {
                console.warn("Failed to load particles:", error);
            }
        };

        initEngine();
        
        return () => {
            isMounted = false;
        };
    }, [shouldRender]);

    const particlesLoaded = useCallback((container) => {
        // Particles loaded successfully
    }, []);

    // Get theme-aware particle color
    const getParticleColor = () => {
        return theme === "light" ? "#6b7280" : "#ffffff"; // Gray for light theme, white for dark/night theme
    };

    // Simplified and optimized particle configuration
    const options = useMemo(() => ({
        autoPlay: true,
        background: {
            opacity: 0
        },
        detectRetina: true,
        fpsLimit: 60, // Reduced from 120 for better performance
        
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: {
                    enable: true
                }
            },
            modes: {
                push: {
                    distance: 200,
                    duration: 0.4,
                    quantity: 1
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                    factor: 100,
                    speed: 1,
                    maxSpeed: 50
                }
            }
        },
        
        particles: {
            bounce: {
                horizontal: {
                    value: 1
                },
                vertical: {
                    value: 1
                }
            },
            collisions: {
                absorb: {
                    speed: 2
                },
                bounce: {
                    horizontal: {
                        value: 1
                    },
                    vertical: {
                        value: 1
                    }
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                    enable: true,
                    retries: 0
                }
            },
            color: {
                value: getParticleColor(),
                animation: {
                    h: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    },
                    s: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    },
                    l: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    }
                }
            },
            move: {
                angle: {
                    offset: 0,
                    value: 90
                },
                attract: {
                    distance: 200,
                    enable: false,
                    rotate: {
                        x: 3000,
                        y: 3000
                    }
                },
                center: {
                    x: 50,
                    y: 50,
                    mode: "percent",
                    radius: 0
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                    acceleration: 9.81,
                    enable: false,
                    inverse: false,
                    maxSpeed: 50
                },
                path: {
                    clamp: true,
                    delay: {
                        value: 0
                    },
                    enable: false,
                    options: {}
                },
                outModes: {
                    default: "out",
                    bottom: "out",
                    left: "out",
                    right: "out",
                    top: "out"
                },
                random: false,
                size: false,
                speed: 2,
                spin: {
                    acceleration: 0,
                    enable: false
                },
                straight: false,
                trail: {
                    enable: false,
                    length: 10,
                    fill: {}
                },
                vibrate: false,
                warp: false
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080
                },
                limit: {
                    mode: "delete",
                    value: 0
                },
                value: 50 // Reduced from potentially higher values for performance
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 0.5
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none"
                }
            },
            reduceDuplicates: false,
            shadow: {
                blur: 0,
                color: {
                    value: "#000"
                },
                enable: false,
                offset: {
                    x: 0,
                    y: 0
                }
            },
            shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle"
            },
            size: {
                value: {
                    min: 1,
                    max: 3
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 2,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none"
                }
            },
            stroke: {
                width: 0
            },
            zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1
            }
        },
        
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [
            {
                maxWidth: 768,
                options: {
                    particles: {
                        number: {
                            value: 25 // Reduce particles on mobile
                        }
                    }
                }
            }
        ],
        smooth: false,
        style: {},
        themes: [],
        zLayers: 100
    }), [theme]);

    // Don't render if motion should be reduced or not initialized
    if (!shouldRender || !init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none"
            }}
        />
    );
};

export default ParticlesOptimized;