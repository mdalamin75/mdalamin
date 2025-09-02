import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import Image from "next/image";
import Spinner from "./Admin/Spiner";
import Head from "next/head";

const ProjectItem = React.memo(({ initialData, showFilter = true, limit }) => {
  // Extract portfolio data from the new initialData structure
  const portfolioInitialData = initialData?.portfolio || initialData;

  const {
    data: portfolioData,
    loading,
    error,
    refetch,
  } = useFetch("portfolio", portfolioInitialData);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Memoize expensive calculations
  const publishedData = useMemo(() => {
    return portfolioData
      ? portfolioData.filter((ab) => ab.status === "publish")
      : [];
  }, [portfolioData]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return portfolioData
        ? portfolioData.filter((pro) => pro.status === "publish")
        : [];
    } else {
      return portfolioData
        ? portfolioData.filter(
          (pro) =>
            pro.status === "publish" &&
            Array.isArray(pro.projectcategory) &&
            pro.projectcategory.includes(selectedCategory)
        )
        : [];
    }
  }, [selectedCategory, portfolioData]);

  const displayedProjects = useMemo(() => {
    return limit ? filteredProjects.slice(0, limit) : filteredProjects;
  }, [filteredProjects, limit]);

  // Memoize callback functions
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    // filter projects based on selectedCategory
    // This useEffect is now redundant as filtering is memoized
  }, [selectedCategory, portfolioData]);

  // Avoid extra spinners; show skeleton-free layout and render when data arrives

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

  // If we have data (either from API or initial), show content regardless of loading state
  if (portfolioData || initialData) {
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
                : "bg-gradient-to-r from-gray-800 to-gray-500 text-white"
                } px-5 py-2 rounded-lg font-josefin font-bold transition-all duration-300 hover:scale-105`}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
            {Array.from(new Set(publishedData.flatMap(pro => pro.projectcategory || []))).map((category) => (
              <button
                key={category}
                className={`${selectedCategory === category
                  ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                  : "bg-gradient-to-r from-gray-800 to-gray-500 text-white"
                  } px-5 py-2 rounded-lg font-josefin font-bold transition-all duration-300 hover:scale-105`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-5 grid-cols-12">
          {displayedProjects.map((element, index) => {
            const { id, title, description, images, slug, projectcategory, tags, livepreview } = element;

            // Check if it's the last item and if the total items are odd
            const isLastItemOdd = index === displayedProjects.length - 1 && displayedProjects.length % 2 !== 0;

            // Create CSS classes for different column spans
            let columnClasses = "col-span-12"; // Default for mobile

            // Only apply these classes on md screens and up
            if (isLastItemOdd) {
              columnClasses += " md:col-span-12"; // Full width for last odd item
            } else if (index % 4 === 0 || index % 4 === 3) {
              columnClasses += " md:col-span-5"; // 5/12 width
            } else {
              columnClasses += " md:col-span-7"; // 7/12 width
            }

            // Create project-specific keywords based on title and description
            const projectSpecificKeywords = [
              title,
              `${title} project`,
              `MD. AL AMIN ${title}`,
              `mdalamin75 ${title}`,
              `portfolio ${title}`,
              `web development ${title}`,
              `${title} website`,
              `professional ${title}`,
              `${title} design`
            ].join(", ");

            return (
              <div
                key={id}
                className={`card card-bordered border-purple-200 p-5 group ${columnClasses}`}
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                data-aos-duration="1000"
              >
                {/* Add microdata for this specific project */}
                <div itemScope itemType="https://schema.org/CreativeWork">
                  <meta itemProp="name" content={title} />
                  <meta itemProp="creator" content="MD. AL AMIN" />
                  <meta itemProp="keywords" content={projectSpecificKeywords} />

                  <div className="project_image">
                    <figure className="card image-full">
                      <Image
                        src={images && images.length > 0 ? images[0] : "/projects/01/psd-to-html.png"}
                        width={400}
                        height={300}
                        alt={title}
                        className="w-full h-48 object-cover"
                        priority={index < 2}
                      />
                      <div className="card-body">
                        <div className="project_overlay">
                          <div className="project_overlay_content">
                            <div className="project_overlay_buttons">
                              <Link
                                href={`/portfolio/${slug}`}
                                className="btn btn-primary btn-sm"
                              >
                                View Details
                              </Link>
                              {livepreview && (
                                <a
                                  href={livepreview}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-secondary btn-sm"
                                >
                                  Live Preview
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>

                  <div className="project_content mt-4">
                    <h3
                      itemProp="name"
                      className="font-josefin text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 mb-2"
                    >
                      {title}
                    </h3>
                    <p
                      itemProp="description"
                      className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2"
                    >
                      {description?.substring(0, 100)}...
                    </p>
                    <div className="project_tags flex flex-wrap gap-2 mb-3">
                      {projectcategory?.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="project_actions flex justify-between items-center">
                      <Link
                        href={`/portfolio/${slug}`}
                        className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="grid gap-5 grid-cols-12">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-span-12 md:col-span-6 animate-pulse">
            <div className="card card-bordered border-purple-200 p-5">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Error Loading Portfolio</h2>
        <p className="text-gray-600 mb-4">Something went wrong while loading the portfolio.</p>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show fallback content
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">No Portfolio Data Available</h2>
      <p className="text-gray-600 mb-4">Please check your database connection and ensure portfolio data exists.</p>
      <button
        onClick={() => refetch()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Retry Loading
      </button>
    </div>
  );
});

// Add display name for the memoized component
ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;