import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import TestimonialSlider from "../components/TestimonialSlider";
import CountUpAnimation from "../components/CountUpAnimation";
import review from "../../../public/testimonial/review.svg";
import Image from "next/image";

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
        <div className="container mx-auto px-3 md:px-5">
          <div className="testimonial_head py-16">
            <Image
              src={review}
              width={150}
              priority="true"
              alt="testimonial"
              className="mx-auto z-10"
            />

            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-slate-100 drop-shadow-2xl`}>
              Testimonial
            </h1>
            <p className={`${titillium.className} text-center py-3`}>
              Here you will find all my Reviews. <br /> There is my web
              development journey review from my valuable clients.
            </p>
          </div>
          <div className="testimonial_counter">
            <CountUpAnimation />
          </div>
          <div className="testimonial_slider py-10">
            <TestimonialSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
