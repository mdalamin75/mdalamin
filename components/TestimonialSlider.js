"use client";
import { useState } from "react";
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
  
  // State for managing expanded reviews
  const [expandedReviews, setExpandedReviews] = useState({});

  if (loading) {
    return <LoadingSpinner variant="ring" size="md" text="Loading testimonials" />;
  }
  const testimonialPublishedData = testimonialData
    ? testimonialData.filter((ab) => ab.status === "publish")
    : [];

  // Function to toggle review expansion
  const toggleReview = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

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
        {testimonialPublishedData.map((currentElement, index) => {
          const { id, date, clientname, nationality, review, star } = currentElement;
          
          // Ensure we have valid data
          if (!currentElement) return null;

          const renderStars = (starCount) => {
            const stars = [];
            const validStarCount = Math.max(0, Math.min(5, starCount || 0)); // Ensure between 0-5
            for (let i = 1; i <= 5; i++) {
              stars.push(i <= validStarCount ? <FaStar key={i} className="text-yellow-500 dark:text-yellow-400 ms-1 my-2" /> : <FaRegStar key={i} className="text-gray-400 dark:text-gray-600 ms-1 my-2" />);
            }
            return <div className="star-rating flex justify-center">{stars}</div>;
          };

          // Review text handling
          const maxLength = 150; // Character limit for preview
          const reviewText = review || '';
          const isLongReview = reviewText.length > maxLength;
          const isExpanded = expandedReviews[id || index] || false;
          const displayText = isExpanded || !isLongReview ? reviewText : reviewText.substring(0, maxLength) + "...";

          return (
            <SwiperSlide key={`testimonial-${index}-${clientname || 'unknown'}-${reviewText.substring(0, 10).replace(/\s+/g, '')}-${date || 'no-date'}-${star || 0}`}>
              <div
                className="review_card w-64 sm:w-80 h-full sm:h-96 min-h-96 flex flex-col justify-between m-5 ml-12 sm:ml-5 p-5 rounded-xl shadow-lg shadow-purple-600/20 dark:shadow-purple-600 text-center border border-gray-200 dark:border-gray-700">
                
                {/* Header Section */}
                <div className="flex-shrink-0">
                  <h3
                    className="font-josefin font-bold text-lg text-emerald-700 dark:text-emerald-400 mb-1">
                    {clientname}
                  </h3>
                  <h4
                    className="font-titillium text-sm font-thin mb-2">
                    {nationality}
                  </h4>
                  <div className="mb-3">
                    {renderStars(star)}
                  </div>
                </div>

                {/* Review Section - Flexible height */}
                <div className="flex-1 flex flex-col justify-center min-h-0">
                  <div
                    className="font-josefin text-sm sm:text-sm font-medium py-2 px-2 overflow-y-auto max-h-32 sm:max-h-40 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <RiDoubleQuotesL className="inline-block mb-1 me-1 text-xl font-bold text-emerald-600 dark:text-emerald-400" />
                    <span className="leading-relaxed">
                      {displayText}
                    </span>
                    <RiDoubleQuotesR className="inline-block mb-1 ms-1 text-xl font-bold text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  {/* Read More/Less Button */}
                  {isLongReview && (
                    <button
                      onClick={() => toggleReview(id || index)}
                      className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-medium mt-2 transition-colors duration-200">
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* Footer Section */}
                <div className="flex-shrink-0 mt-3">
                  <p
                    className="font-titillium text-xs font-thin text-gray-600 dark:text-gray-400">
                    {date}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TestimonialSlider;
