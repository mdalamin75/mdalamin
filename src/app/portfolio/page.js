"use client";
import Image from "next/image";
import React, { createContext, useState } from "react";
import AllProjects from "../components/AllProjects";
import ProjectItem from "../components/ProjectItem";
import ProjectMenu from "../components/ProjectMenu";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import portfolio from "../../../public/portfolio/portfolio.svg";
import shadow from "../../../public/shadow_01.png";
import shadow2 from "../../../public/shadow_02.png";
import ProjectSearch from "../components/ProjectSearch";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// All Category
const allCategoryValue = [
  "all",
  ...new Set(AllProjects.map((curentElement) => curentElement.category)),
];

const Portfolio = () => {
  const [items, setItems] = useState(AllProjects);
  const [categoryItems, setCategoryItems] = useState(allCategoryValue);
  const [searchProject, setSearchProject] = useState('');

  const filterItem = (categoryItem) => {
    if (categoryItem === "all") {
      setItems(AllProjects);
      return;
    }
    const updatedItems = AllProjects.filter((curentElement) => {
      return curentElement.category === categoryItem;
    });
    setItems(updatedItems);
  };
  return (
    <>
      <section id="portfolio" className="relative">
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
        <div className="absolute inset-0 top-0 bg-top bg-no-repeat shadow_04"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="portfolio_head py-16">
            <Image src={portfolio} width={150} priority="true" alt="portfolio" className="mx-auto z-10" />
            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-orange-600 drop-shadow-2xl`}>
              My Projects
            </h1>
            <p className={`${titillium.className} text-center py-3`}>
              Here you will find my all Projects. This is my web development
              journey.
              <br /> I start my journey in 2020. I am a self Learner.
            </p>
          </div>
          <div className="portfolio_data">
            {/* Project Menu */}
            <div className="flex justify-between items-center mx-5">
              <ProjectSearch
                setSearchProject={setSearchProject}
              />
              <ProjectMenu
                filterItem={filterItem}
                categoryItems={categoryItems}
              />
            </div>
            {/* Project Item */}
            <ProjectItem items={items} searchProject={searchProject} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
