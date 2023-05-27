import React, { useEffect } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ProjectMenu = ({ filterItem, categoryItems}) => {
  return (
    <>
      <div className="flex flex-wrap gap-y-5 justify-around">
        {categoryItems.map((currentElement, index) => {
          return (
            <button
              key={index}
              onClick={() => filterItem(currentElement)}
              className={`${josefin.className} border-solid border-2 border-emerald-500 py-2 px-3 rounded-lg uppercase font-medium duration-500 hover:bg-emerald-600`}>
              {currentElement}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ProjectMenu;
