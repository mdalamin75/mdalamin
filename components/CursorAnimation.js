"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const CursorAnimation = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={5}
        outerSize={40}
        color="255, 255, 255"
        outerAlpha={0.1}
        innerScale={0.7}
        outerScale={2}
        innerStyle={{
          backgroundColor: "#0B1121",
        }}
        outerStyle={{
          backgroundColor: "white",
          mixBlendMode: "difference",
        }}
        clickables={[
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
          "h1",
          "h2",
          "h3",
          "h4",
        ]}
      />
    </>
  )
};

export default CursorAnimation;
