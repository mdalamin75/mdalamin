"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AosAnimation = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return;
};

export default AosAnimation;
