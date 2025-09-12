import React from "react";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import Head from "next/head";

const Services = ({ initialData }) => {
    // Extract service data from the new initialData structure
    const serviceInitialData = initialData?.service || initialData;

    // Fetch Service data
    const {
        data: serviceData,
        loading,
        refetch,
    } = useFetch("service", serviceInitialData);

    // Avoid extra spinners; keep layout stable without overlays

    const servicePublishedData = serviceData
        ? serviceData.filter((ab) => ab.status === "publish")
        : [];

    // Generate JSON-LD for all services for SEO
    const servicesSchema = servicePublishedData.map((service, index) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.title,
        "provider": {
            "@type": "Person",
            "name": "MD. AL AMIN",
            "url": "https://mdalamin.com"
        },
        "description": service.description?.substring(0, 150) || "Professional web development service",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
        }
    }));

    // Show skeleton only when actually loading AND no data exists
    const shouldShowSkeleton = loading && !serviceData && !initialData;

    // If we have data (either from API or initial), show content regardless of loading state
    if (serviceData || initialData) {
        return (
            <>
                {/* Add structured data for all services */}
                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(servicesSchema)
                        }}
                    />
                </Head>

                <div className="grid gap-5 grid-cols-12">
                    {servicePublishedData
                        .slice() // Avoid mutating the original array
                        .reverse()
                        .map((element, index, array) => {
                            const { id, title, description, btnurl } = element;

                            // Check if it's the last item and if the total items are odd
                            const isLastItemOdd = index === array.length - 1 && array.length % 2 !== 0;

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

                            // Create service-specific keywords based on title and description
                            const serviceSpecificKeywords = [
                                title,
                                `${title} service`,
                                `MD. AL AMIN ${title}`,
                                `mdalamin75 ${title}`,
                                `hire for ${title}`,
                                `professional ${title}`,
                                `${title} development`,
                                `expert ${title}`,
                                `affordable ${title}`
                            ].join(", ");

                            return (
                                <div
                                    key={`service-${id}-${index}`}
                                    className={`card card-bordered border-purple-200 p-5 group ${columnClasses}`}
                                    data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                                    data-aos-duration="1000"
                                >
                                    {/* Add microdata for this specific service */}
                                    <div itemScope itemType="https://schema.org/Service">
                                        <meta itemProp="serviceType" content={title} />
                                        <meta itemProp="provider" content="MD. AL AMIN" />
                                        <meta itemProp="keywords" content={serviceSpecificKeywords} />

                                        <div className="service_title">
                                            <h3
                                                itemProp="name"
                                                className="font-josefin text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 mb-3"
                                            >
                                                {title}
                                            </h3>
                                        </div>
                                        <div className="service_description" itemProp="description">
                                            <ReactMarkdown
                                                className="markdown-description"
                                                components={{
                                                    h4: ({ children }) => (
                                                        <h4 key={`${id}-h4`} className="text-lg font-bold mb-2 font-josefin">
                                                            {children}
                                                        </h4>
                                                    ),
                                                    p: ({ children }) => (
                                                        <p key={`${id}-p`} className="text-base mb-3 font-titillium">
                                                            {children}
                                                        </p>
                                                    ),
                                                    li: ({ children }) => (
                                                        <li key={`${id}-li`} className="flex items-center gap-2 font-titillium mb-3">
                                                            <IoIosCheckmarkCircle className="text-purple-400 text-xl" />
                                                            {children}
                                                        </li>
                                                    ),
                                                }}
                                            >
                                                {description}
                                            </ReactMarkdown>
                                        </div>
                                        <div className="service_button flex justify-end mt-auto">
                                            <Link
                                                href={btnurl || "mailto:mdalamiin75@gmail.com"}
                                                className="font-josefin text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-700 mb-3 flex items-center gap-3 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300"
                                                itemProp="url"
                                            >
                                                <span>Secure your package now</span>
                                                <IoIosArrowRoundForward className="text-3xl text-blue-700 group-hover:text-purple-500 mt-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }

    // Show skeleton only when actually loading AND no data exists
    if (shouldShowSkeleton) {
        return (
            <div className="grid gap-5 grid-cols-12">
                {[...Array(6)].map((_, index) => {
                    // Match the exact column layout logic from the real content
                    let columnClasses = "col-span-12"; // Default for mobile

                    if (index === 5 && 6 % 2 !== 0) {
                        columnClasses += " md:col-span-12"; // Full width for last odd item
                    } else if (index % 4 === 0 || index % 4 === 3) {
                        columnClasses += " md:col-span-5"; // 5/12 width
                    } else {
                        columnClasses += " md:col-span-7"; // 7/12 width
                    }

                    return (
                        <div key={`service-skeleton-${index}`} className={`card card-bordered border-purple-200 p-5 animate-pulse ${columnClasses}`}>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-5/6"></div>
                            </div>
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 mt-4"></div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // Fallback: Show test content if no data and not loading
    if (!loading && !serviceData && !initialData) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No Services Data Available</h2>
                <p className="text-gray-600 mb-4">Please check your database connection and ensure services exist.</p>
                <button
                    onClick={() => refetch()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    return null; // Should not happen if loading and data checks are correct
};

export default Services;
