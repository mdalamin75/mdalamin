"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AosAnimation = () => {
  useEffect(() => {
    AOS.init({
      offset: 100, // Adjust offset to prevent overflow
      duration: 600, // Adjust duration for smooth animations
      easing: "ease-in-out", // Improve animation flow
      //once: true, // Run animation only once
      mirror: false, // Prevent animations on scroll up
    });

    return () => {
      AOS.refresh(); // Refresh animations when component unmounts
    };
  }, []);

  return null;
};

export default AosAnimation;
