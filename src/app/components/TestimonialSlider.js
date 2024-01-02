"use client";
import React from "react";
import TestimonialData from "../components/TestimonialData";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
// font
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Keyboard } from "swiper";

const TestimonialSlider = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination, Keyboard]}
        className="mySwiper">
        {TestimonialData.map((currentElement) => {
          const { id, date, name, nationality, review } = currentElement;
          return (
            <>
              <SwiperSlide key={id}>
                <div
                  className="review_card w-64 sm:w-80 h-full sm:h-96 min-h-96 flex flex-col justify-center bg-dark2 m-5 ml-12 sm:ml-5 p-5 rounded-xl shadow-lg shadow-emerald-600 text-center">
                  <h3
                    className={`${josefin.className} font-bold text-lg text-emerald-600`}>
                    {name}
                  </h3>
                  <h4
                    className={`${titillium.className} text-sm font-thin text-gray-400`}>
                    {nationality}
                  </h4>
                  <p
                    className={`${josefin.className} text-sm sm:text-sm font-medium text-white py-2 px-2`}>
                    <RiDoubleQuotesL className="inline-block mb-3 me-1 text-2xl font-bold" />
                    {review}
                    <RiDoubleQuotesR className="inline-block mb-3 ms-1 text-2xl font-bold" />
                  </p>
                  <p
                    className={`${titillium.className} text-sm font-thin text-gray-400`}>
                    {date}
                  </p>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
};

export default TestimonialSlider;
