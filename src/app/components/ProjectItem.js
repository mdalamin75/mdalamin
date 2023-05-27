import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ProjectItem = ({ items }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 py-10">
          {items
            .slice(0)
            .reverse()
            .map((element) => {
              const { id, title, image, category, view, source, description } =
                element;
              return (
                <motion.div
                  key={id}
                  layout
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="description flex flex-col md:flex-row gap-x-3 gap-y-3 items-center p-5 bg-dark2 m-3 rounded-xl shadow-md shadow-emerald-600 duration-500 hover:shadow-lg hover:shadow-orange-600">
                  <div className="max-h-56 overflow-hidden">
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt={category}
                      className="w-96"
                    />
                  </div>
                  <div className="details">
                    <h2
                      className={`${josefin.className} uppercase font-bold text-lg text-emerald-500 mb-3`}>
                      {title}
                    </h2>
                    <p className={`${titillium.className} text-sm mb-3 `}>
                      {description}
                    </p>
                    <div className="flex items-center py-3">
                      <Link
                        href={view}
                        target="_blank"
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-1 rounded-lg text-base capitalize font-medium delay-300 hover:hover:from-emerald-600 hover:to-amber-500">
                        View
                      </Link>
                      <Link
                        href={source}
                        target="_blank"
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-1 ms-5 rounded-lg text-base capitalize font-medium delay-300 hover:hover:from-orange-600 hover:to-amber-500">
                        Source
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectItem;
