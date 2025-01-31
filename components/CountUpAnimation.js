"use client";
import React from "react";
import CountUp from "react-countup";
import AllProjects from "./AllProjects";
import TestimonialData from "./TestimonialData";
import { Titillium_Web, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const CountUpAnimation = () => {
  return (
    <>
      <section className="py-5">
        <div className="container mx-auto px-3 md:px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3">
            <div data-aos="fade-right" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600 bg-white/10 border border-white/20 backdrop-blur-md relative">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={TestimonialData.length} duration={5} delay={1} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Happy Clients</h3>
              <div className="absolute top-0 inset-x-0 bg-left-top bg-no-repeat rounded-lg shadow_06"></div>
            </div>
            <div data-aos="flip-up" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600  bg-white/10 border border-white/20 backdrop-blur-md">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={AllProjects.length} duration={5} delay={1} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Projects</h3>
              <div className="absolute top-0 inset-x-0 bg-left-top bg-no-repeat rounded-lg shadow_06"></div>
            </div>
            <div data-aos="fade-left" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600  bg-white/10 border border-white/20 backdrop-blur-md">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={3} duration={6} delay={1} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Years Experience</h3>
              <div className="absolute top-0 inset-x-0 bg-left-top bg-no-repeat rounded-lg shadow_06"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CountUpAnimation;
