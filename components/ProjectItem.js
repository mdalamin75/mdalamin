import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Image from "next/image";

const ProjectItem = ({ initialData, showFilter = true, limit = null }) => {
  const {
    data: portfolioData,
    loading,
    refetch,
  } = useFetch("portfolio", initialData);

  const publishedData = portfolioData
    ? portfolioData.filter((ab) => ab.status === "publish")
    : [];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // filter projects based on selectedCategory
    if (selectedCategory === "All") {
      setFilteredProjects(
        portfolioData
          ? portfolioData.filter((pro) => pro.status === "publish")
          : []
      );
    } else {
      setFilteredProjects(
        portfolioData
          ? portfolioData.filter(
            (pro) =>
              pro.status === "publish" &&
              pro.projectcategory[0] === selectedCategory
          )
          : []
      );
    }
  }, [selectedCategory, portfolioData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

  return (
    <>
      {showFilter && (
        <div className="project_buttons flex justify-center gap-x-5">
          <button
            className={`${selectedCategory === "All"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("All")}>
            All
          </button>
          <button
            className={`${selectedCategory === "Frontend Development"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("Frontend Development")}>
            Frontend
          </button>
          <button
            className={`${selectedCategory === "Full Stack Development"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("Full Stack Development")}>
            Full Stack
          </button>
          <button
            className={`${selectedCategory === "WordPress Website"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("WordPress Website")}>
            WordPress
          </button>
          <button
            className={`${selectedCategory === "E-commerce Website"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("E-commerce Website")}>
            E-commerce
          </button>
          <button
            className={`${selectedCategory === "Shopify Store"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("Shopify Store")}>
            Shopify
          </button>
          <button
            className={`${selectedCategory === "Email"
              ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
              : "bg-slate-100 text-purple-600"
              } font-bold font-josefin py-2 px-6 rounded-3xl`}
            onClick={() => setSelectedCategory("Email")}>
            Email
          </button>
        </div>
      )}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : displayedProjects.length === 0 ? (
            <h1 className="flex justify-center">No Project Found</h1>
          ) : (
            displayedProjects.map((element) => {
              const { id, title, slug, images } = element;
              return (
                <Link
                  href={`/portfolio/${slug}`}
                  key={element._ID}
                  className="procard" data-aos="flip-left">
                  <div
                    key={id}
                    className="card bg-base-100 image-full w-full h-96 overflow-hidden shadow-xl card_hover hover:shadow-lg hover:shadow-purple-500 duration-500">
                    <figure>
                      <Image
                        width={700}
                        height={300}
                        src={images[0]}
                        alt={title}
                        className="w-full h-96 object-top overflow-hidden"
                      />
                    </figure>
                    <div className="card-body justify-end">
                      <h2 className="card-title font-bold font-josefin text-stone-100">
                        {title}
                      </h2>
                      <div className="card-actions">
                        <Link
                          href={`/portfolio/${slug}`}
                          className="button w-36 button--nina bg-gradient-to-r from-purple-950 to-purple-600  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden me-3 px-5"
                          data-text="View">
                          <span className="align-middle">V</span>
                          <span className="align-middle">i</span>
                          <span className="align-middle">e</span>
                          <span className="align-middle">w</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectItem;
