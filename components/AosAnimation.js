"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AosAnimation = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return null;
};

export default AosAnimation;
