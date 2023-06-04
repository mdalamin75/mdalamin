"use client";
// globalThis = window
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorAnimation = () => {
  const [mousePosition, setMosuePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMosuePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: "0.3s",
    },
    text: {
      width: 150,
      height: 150,
      x: mousePosition.x - 80,
      y: mousePosition.y - 80,
      bacgroundColor: "white",
      mixBlendMode: "difference",
      border: "none",
    },
  };

  const textEnter = () => setCursorVariant();
  const textLeave = () => setCursorVariant("default");
  return (
    <>
      <motion.div
        className="border-2 border-orange-500 w-10 h-10 rounded-full fixed top-0 left-0 z-50 duration-300 pointer-events-none"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="bg-white w-1 h-1 rounded-full fixed top-4 left-4 z-50 duration-100 pointer-events-none"
        variants={variants}
        animate={cursorVariant}
      />
    </>
  );
};

export default CursorAnimation;
