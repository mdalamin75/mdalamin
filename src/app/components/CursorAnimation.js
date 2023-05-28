"use client";
import React from "react";
import AnimatedCursor from "react-animated-cursor";

const CursorAnimation = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={50}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={2}
        outerStyle={{
          backgroundColor: "transparent",
          border: "2px solid orange",
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
        ]}
      />
    </>
  );
};

export default CursorAnimation;
