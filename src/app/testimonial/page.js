import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import TestimonialSlider from "../components/TestimonialSlider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Testimonial = () => {
  return (
    <>
      <section id="testimonial">
        <div className="container">
          <div className="testimonial_head py-16">
            <h1
              className={`${josefin.className} uppercase text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-slate-300 drop-shadow-2xl`}>
              Testimonial
            </h1>
            <p className={`${titillium.className} text-center py-3`}>
              Here you will find all my Reviews. <br /> There is my web
              development journey review from my valuable clients.
            </p>
          </div>
          <div className="testimonial_slider pb-10">
            <TestimonialSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
