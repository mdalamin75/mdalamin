"use client";
import React from "react";
import CountUp from "react-countup";
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
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3">
            <div className="text-center bg-dark2 px-5 py-10 rounded-lg shadow-inner shadow-sky-600">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={9} duration={3} delay={0} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Happy Clients</h3>
            </div>
            <div className="text-center bg-dark2 px-5 py-10 rounded-lg shadow-inner shadow-sky-600">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={10} duration={3} delay={0} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Projects</h3>
            </div>
            <div className="text-center bg-dark2 px-5 py-10 rounded-lg shadow-inner shadow-sky-600">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={2} duration={4} delay={0} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Years Experience</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CountUpAnimation;
