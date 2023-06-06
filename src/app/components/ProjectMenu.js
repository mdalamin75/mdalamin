import React, { useEffect } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ProjectMenu = ({ filterItem, categoryItems }) => {
  return (
    <>
      <div data-aos="fade-right" data-aos-duration="1000"  className="bg-gradient-to-r from-sky-700 to-indigo-800 p-3 rounded-lg sticky top-0 z-50">
        <div className="flex flex-wrap gap-y-5 justify-around">
          {categoryItems.map((currentElement, index) => {
            return (
              <button
                key={index}
                onClick={() => filterItem(currentElement)}
                className={`${josefin.className} border-solid border-2 border-indigo-100 py-2 px-3 rounded-lg uppercase font-semibold duration-500 hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-600`}>
                {currentElement}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectMenu;
