import React from "react";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

const Services = ({ initialData }) => {
    // Fetch Service data
    const {
        data: serviceData,
        loading,
        refetch,
    } = useFetch("service", initialData);

    if (loading) {
        return <LoadingSpinner variant="ring" size="lg" text="Loading services" />;
    }
    const servicePublishedData = serviceData
        ? serviceData.filter((ab) => ab.status === "publish")
        : [];
    return (
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

                    return (
                        <Link
                            href={btnurl || "mailto:mdalamiin75@gmail.com"}
                            key={id}
                            className={`card card-bordered border-purple-200 p-5 group ${columnClasses}`}
                            data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                            data-aos-duration="1000"
                        >
                            <div className="service_title">
                                <h3 className="font-josefin text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 mb-3">
                                    {title}
                                </h3>
                            </div>
                            <div className="service_description">
                                <ReactMarkdown
                                    className="markdown-description"
                                    components={{
                                        h4: ({ children }) => (
                                            <h4 key={id + "-h4"} className="text-lg font-bold mb-2 font-josefin">
                                                {children}
                                            </h4>
                                        ),
                                        p: ({ children }) => (
                                            <p key={id + "-p"} className="text-base mb-3 font-titillium">
                                                {children}
                                            </p>
                                        ),
                                        li: ({ children }) => (
                                            <li key={id + "-li"} className="flex items-center gap-2 font-titillium mb-3">
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
                                >
                                    <span>Secure your package now</span>
                                    <IoIosArrowRoundForward className="text-3xl text-blue-700 group-hover:text-purple-500 mt-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};

export default Services;
