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
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("All")}>
                            All
                        </button>
                        <button
                            className={`${selectedCategory === "Frontend Development"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("Frontend Development")}>
                            Frontend
                        </button>
                        <button
                            className={`${selectedCategory === "Full Stack Development"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("Full Stack Development")}>
                            Full Stack
                        </button>
                        <button
                            className={`${selectedCategory === "WordPress Website"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("WordPress Website")}>
                            WordPress
                        </button>
                        <button
                            className={`${selectedCategory === "E-commerce Website"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("E-commerce Website")}>
                            E-commerce
                        </button>
                        <button
                            className={`${selectedCategory === "Shopify Store"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("Shopify Store")}>
                            Shopify
                        </button>
                        <button
                            className={`${selectedCategory === "Email"
                                ? "bg-gradient-to-r from-purple-800 to-purple-500 text-white"
                                : "bg-slate-100 text-purple-600"
                                } font-bold font-josefin py-2 px-6 rounded-3xl`}
                            onClick={() => handleCategoryChange("Email")}>
                            Email
                        </button>
                    </div>
                )}

                <AnimatePresence>
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
                        {displayedProjects.length === 0 ? (
                            <div className="col-span-2 text-center py-20">
                                <h1 className="text-2xl font-bold mb-4">No Projects Found</h1>
                                <p className="text-gray-600 mb-4">
                                    {portfolioData && portfolioData.length > 0
                                        ? "No projects match the selected category or status filter."
                                        : "No portfolio projects have been added yet."
                                    }
                                </p>
                                {portfolioData && portfolioData.length > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Total projects in database: {portfolioData.length} |
                                        Published: {portfolioData.filter(p => p.status === 'publish').length} |
                                        Draft: {portfolioData.filter(p => p.status === 'draft').length}
                                    </p>
                                )}
                                <button
                                    onClick={() => refetch()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                                >
                                    Refresh Data
                                </button>
                            </div>
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
                                                {images && images.length > 0 && images[0] ? (
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
    }

    // Show skeleton only when actually loading AND no data exists
    if (loading && !portfolioData && !initialData) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="card bg-base-100 image-full w-full h-96 overflow-hidden shadow-xl animate-pulse">
                        <div className="w-full h-96 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="card-body justify-end">
                            <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
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
                <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Portfolio</h2>
                <p className="text-gray-600 mb-4">
                    {error.message || 'Failed to load portfolio data. Please check your connection and try again.'}
                </p>
                <button
                    onClick={() => refetch()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    // Fallback: Show test content if no data and not loading
    if (!loading && !portfolioData && !initialData) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No Portfolio Data Available</h2>
                <p className="text-gray-600 mb-4">Please check your database connection and ensure portfolio items exist.</p>
                <div className="space-y-2 text-sm text-gray-500">
                    <p>• Check if MongoDB is running</p>
                    <p>• Verify MONGODB_URI environment variable</p>
                    <p>• Ensure portfolio items exist in database</p>
                    <p>• Check browser console for errors</p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    return null; // Should not happen if loading and data checks are correct
});

// Add display name for the memoized component
ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;
