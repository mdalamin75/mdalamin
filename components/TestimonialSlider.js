"use client";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaStar, FaRegStar } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Keyboard } from "swiper";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "./LoadingSpinner";

const TestimonialSlider = ({ initialData }) => {
  // Fetch Testimonial data
  const { data: testimonialData, loading, refetch } = useFetch("testimonial", initialData);

  if (loading) {
    return <LoadingSpinner variant="ring" size="md" text="Loading testimonials" />;
  }
  const testimonialPublishedData = testimonialData
    ? testimonialData.filter((ab) => ab.status === "publish")
    : [];

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
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
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
        {testimonialPublishedData.map((currentElement) => {
          const { id, date, clientname, nationality, review, star } = currentElement;

          const renderStars = (starCount) => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
              stars.push(i <= starCount ? <FaStar key={i} className="text-yellow-500 ms-1 my-2" /> : <FaRegStar key={i} className="text-gray-300 ms-1 my-2" />);
            }
            return <div className="star-rating flex justify-center">{stars}</div>;
          };

          return (
            <SwiperSlide key={id}>
              <div
                className="review_card w-64 sm:w-80 h-full sm:h-96 min-h-96 flex flex-col justify-center m-5 ml-12 sm:ml-5 p-5 rounded-xl shadow-lg shadow-purple-600 text-center">
                <h3
                  className="font-josefin font-bold text-lg text-emerald-600">
                  {clientname}
                </h3>
                <h4
                  className="font-titillium text-sm font-thin text-gray-500">
                  {nationality}
                </h4>
                <p>
                {renderStars(star)}
                </p>
                <p
                  className="font-josefin text-sm sm:text-sm font-medium py-2 px-2">
                  <RiDoubleQuotesL className="inline-block mb-3 me-1 text-2xl font-bold" />
                  {review}
                  <RiDoubleQuotesR className="inline-block mb-3 ms-1 text-2xl font-bold" />
                </p>
                <p
                  className="font-titillium text-sm font-thin text-gray-500">
                  {date}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TestimonialSlider;
