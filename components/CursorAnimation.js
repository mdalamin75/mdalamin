"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const CursorAnimation = () => {
  const [theme, setTheme] = useState("light");
  const [hoveringClickable, setHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const clickablesRef = useRef(null);

  // Detect touch devices
  useEffect(() => {
    // Function to detect if the device is a touch device
    const detectTouchDevice = () => {
      const isTouchCapable = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      
      setIsTouchDevice(isTouchCapable);
    };

    // Detect on initial load
    detectTouchDevice();

    // Also detect on resize in case of device orientation changes or external displays
    window.addEventListener('resize', detectTouchDevice);
    
    return () => {
      window.removeEventListener('resize', detectTouchDevice);
    };
  }, []);

  useEffect(() => {
    // Function to update theme based on the current DaisyUI theme
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme);
    };

    // Update theme on initial load
    updateTheme();

    // Observe for theme changes and update accordingly
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Skip setup if it's a touch device
    if (isTouchDevice) return;

    // Define the selectors for clickable elements
    const selectors = [
      "a",
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      "label[for]",
      "select",
      "textarea",
      "button",
      ".link",
      "svg",
      ".btn",
      "[role='button']",
      ".cursor-pointer",
      "h1",
      "h2",
      "h3",
      "h4",
    ].join(", ");

    // Select all clickable elements and assign to ref
    clickablesRef.current = document.querySelectorAll(selectors);

    const handleMouseEnter = () => setHoveringClickable(true);
    const handleMouseLeave = () => setHoveringClickable(false);

    // Add event listeners to clickable elements
    clickablesRef.current.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (clickablesRef.current) {
        clickablesRef.current.forEach((element) => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        });
      }
    };
  }, [isTouchDevice]);

  // If it's a touch device, don't render the cursor animation
  if (isTouchDevice) {
    return null;
  }

  // Improved theme-based colors with more reliable detection
  const cursorInnerColor = theme === "night" || theme === "dark" ? "255, 255, 255" : "0, 0, 0";
  const cursorOuterColor = theme === "night" || theme === "dark" ? "255, 255, 255" : "0, 0, 0";
  const cursorMixBlendMode = hoveringClickable ? "difference" : "normal";

  return (
    <div style={{ zIndex: 999999, position: 'fixed', pointerEvents: 'none' }}>
      <AnimatedCursor
        innerSize={8}
        outerSize={40}
        color={cursorInnerColor}
        outerAlpha={0.1}
        innerScale={1}
        outerScale={1.5}
        innerStyle={{
          backgroundColor: hoveringClickable ? "transparent" : `rgb(${cursorInnerColor})`,
          zIndex: 999999,
        }}
        outerStyle={{
          border: `2px solid ${hoveringClickable ? "currentColor" : `rgba(${cursorOuterColor}, 0.5)`}`,
          mixBlendMode: cursorMixBlendMode,
          zIndex: 999999,
        }}
        clickables={["a", "input", "label", "select", "textarea", "button", ".link", "svg", ".btn", "[role='button']", ".cursor-pointer", "h1", "h2", "h3", "h4"]}
      />
    </div>
  );
};

export default CursorAnimation;
