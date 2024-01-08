import React, { useEffect } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ProjectMenu = ({ filterItem, categoryItems }) => {
  return (
    <>
      <div data-aos="fade-right" data-aos-duration="1000">
        <select onChange={(e) => filterItem(e.target.value)} className="bg-gradient-to-r from-sky-700 to-indigo-800 uppercase p-3 rounded-lg sticky top-0 z-40">
          {categoryItems.map((currentElement, index) => {
            return (
              <option
                key={index}
                className={`${josefin.className} bg-sky-700 uppercase text-sm mb-4`}>
                {currentElement}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default ProjectMenu;