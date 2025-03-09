"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const CursorAnimation = () => {
  const [theme, setTheme] = useState("light");
  const [hoveringClickable, setHoveringClickable] = useState(false);
  const clickablesRef = useRef(null);

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
  }, []);

  const cursorInnerColor = theme === "night" ? "white" : "black";
  const cursorOuterColor = theme === "night" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
  const cursorMixBlendMode = hoveringClickable ? "difference" : "normal";

  return (
    <div style={{ zIndex: 999999, position: 'fixed', pointerEvents: 'none' }}>
      <AnimatedCursor
        innerSize={8}
        outerSize={40}
        color="255, 255, 255"
        outerAlpha={0.1}
        innerScale={1}
        outerScale={1.5}
        innerStyle={{
          backgroundColor: hoveringClickable ? "transparent" : cursorInnerColor,
          zIndex: 999999,
        }}
        outerStyle={{
          border: `2px solid ${hoveringClickable ? "currentColor" : cursorOuterColor}`,
          mixBlendMode: cursorMixBlendMode,
          zIndex: 999999,
        }}
        clickables={["a", "input", "label", "select", "textarea", "button", ".link", "svg", ".btn", "[role='button']", ".cursor-pointer", "h1", "h2", "h3", "h4"]}
      />
    </div>
  );
};

export default CursorAnimation;
