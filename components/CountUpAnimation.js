"use client";
import React, { useState, useEffect } from "react";
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
  const [stats, setStats] = useState({
    projects: 25,
    clients: 15,
    experience: 3
  });

  // Fetch actual data if available
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Try to fetch portfolio data
        const portfolioResponse = await fetch('/api/portfolio');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setStats(prev => ({ ...prev, projects: portfolioData.length || 25 }));
        }

        // Try to fetch testimonial data
        const testimonialResponse = await fetch('/api/testimonial');
        if (testimonialResponse.ok) {
          const testimonialData = await testimonialResponse.json();
          setStats(prev => ({ ...prev, clients: testimonialData.length || 15 }));
        }
      } catch (error) {
        // Use default values if API calls fail
        console.log('Using default stats values');
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container mx-auto px-3 md:px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3">
            <div data-aos="fade-right" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600 bg-white/10 border border-white/20 backdrop-blur-md relative">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={stats.clients} duration={5} delay={1} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Happy Clients</h3>
              <div className="absolute top-0 inset-x-0 bg-left-top bg-no-repeat rounded-lg shadow_06"></div>
            </div>
            <div data-aos="flip-up" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600  bg-white/10 border border-white/20 backdrop-blur-md">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={stats.projects} duration={5} delay={1} /> +
              </h2>
              <h3 className={`${titillium.className} text-lg font-medium`} >Projects</h3>
              <div className="absolute top-0 inset-x-0 bg-left-top bg-no-repeat rounded-lg shadow_06"></div>
            </div>
            <div data-aos="fade-left" data-aos-duration="1000" className="text-center px-5 py-10 rounded-lg shadow-md shadow-sky-600  bg-white/10 border border-white/20 backdrop-blur-md">
              <h2 className={`${josefin.className} text-2xl font-medium`}>
                <CountUp start={0} end={stats.experience} duration={6} delay={1} /> +
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
