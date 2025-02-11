"use client";
import Image from "next/image";
import React from "react";
import ProjectItem from "../../components/ProjectItem";
import portfolio from "../../public/portfolio/portfolio.svg";
import shadow from "../../public/shadow_01.png";
import shadow2 from "../../public/shadow_02.png";

const Portfolio = () => {
  return (
    <>
      <section id="portfolio" className="relative bg_pattern py-20">
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <Image src={shadow} alt="shadow" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
            </picture>
            <picture>
              <Image src={shadow2} alt="shadow" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
            </picture>
          </div>
        </div>
        <div className="absolute inset-0 top-0 bg-top bg-no-repeat shadow_03"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="portfolio_head py-16">
            <Image src={portfolio} width={150} priority="true" alt="portfolio" className="mx-auto z-10" />
            <h1
              className={`font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-500 drop-shadow-2xl`}>
              My Projects
            </h1>
            <p className={`font-titillium text-center py-3 text-lg`}>
              Here you will find my all Projects. This is my web development
              journey.
              <br /> I start my journey in 2020. I am a self Learner.
            </p>
          </div>
          <div className="portfolio_data">
            {/* Project Item */}
            <ProjectItem  showFilter={true}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
