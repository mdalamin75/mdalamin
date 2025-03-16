import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Image from "next/image";
import Spinner from "./Admin/Spiner";
import LoadingSpinner from "./LoadingSpinner";
import Head from "next/head";

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
    return <LoadingSpinner variant="ring" size="md" text="Loading projects" />;
  }

  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

  // Generate structured data for all projects for SEO
  const projectsSchema = displayedProjects.map(project => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description?.substring(0, 150) || "Portfolio project by MD. AL AMIN",
    "creator": {
      "@type": "Person",
      "name": "MD. AL AMIN",
      "url": "https://mdalamin.com"
    },
    "thumbnailUrl": project.images && project.images.length > 0 ? 
      (project.images[0].startsWith('http') ? project.images[0] : `https://mdalamin.com${project.images[0]}`) : 
      null,
    "url": `https://mdalamin.com/portfolio/${project.slug}`,
    "datePublished": project.createdAt || new Date().toISOString(),
    "dateModified": project.updatedAt || new Date().toISOString(),
    "genre": project.projectcategory ? project.projectcategory.join(", ") : "",
  }));

  return (
    <>
      {/* Add structured data for projects */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectsSchema)
          }}
        />
      </Head>

      {showFilter && (
        <div className="project_buttons flex justify-center gap-5 flex-wrap">
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
            <LoadingSpinner variant="ring" size="sm" />
          ) : displayedProjects.length === 0 ? (
            <h1 className="flex justify-center py-5">No Project Found</h1>
          ) : (
              displayedProjects.map((element) => {
                const { id, title, slug, images, projectcategory } = element;
                // Create SEO-friendly alt text
                const altText = `${title} - ${projectcategory ? projectcategory.join(', ') : 'Web Project'} by MD. AL AMIN | Professional Portfolio Project`;
                
                return (
                  <Link
                    href={`/portfolio/${slug}`}
                    key={id}
                    className="procard" 
                    data-aos="flip-left"
                    data-aos-duration="1000"
                  >
                    <div
                    key={id}
                    className="card bg-base-100 image-full w-full h-96 overflow-hidden shadow-xl card_hover hover:shadow-lg hover:shadow-purple-500 duration-500">
                    <figure>
                      {images[0] ? (
                        <Image
                          src={images[0]}
                          alt={altText}
                          width={700}
                          height={300}
                          className="w-full h-96 object-top overflow-hidden transition duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-[50vw] md:h-[30vw] lg:h-[20vw] min-h-60 border">
                          <Image
                            src="/no-image.jpg"
                            alt="No image available - Portfolio project placeholder"
                            width={700}
                            height={300}
                            className="w-full h-96 object-top overflow-hidden"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </figure>
                    <div className="card-body justify-end">
                      <h2 className="card-title text-xl font-josefin font-bold">
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
                );
              })
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectItem;
