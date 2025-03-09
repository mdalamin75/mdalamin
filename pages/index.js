"use client";
import React, { Children } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import portfolio from "../public/portfolio/portfolio.svg";
import Particles from "../components/Particles";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import review from "../public/testimonial/review.svg";
import TestimonialSlider from "../components/TestimonialSlider";
import ProjectItem from "../components/ProjectItem";
import Services from "../components/Services";
import Head from "next/head";

export default function Home({ initialData }) {
	const { data: homeData, loading, refetch } = useFetch("home", initialData);

	if (loading) {
		return null;
	}
	const allHomeData = homeData[0];

	// Handle CV Download
	// Client-side handler in your index.js
	const handleDownload = async () => {
		try {
			const pdfUrl = allHomeData.cvUrl;
			const apiUrl = `/api/download-cv?url=${encodeURIComponent(pdfUrl)}`;

			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'MD_AL_AMIN_CV.pdf';

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

		} catch (error) {
			console.error('Download error:', error);
			alert(`Failed to download CV: ${error.message}`);
		}
	};

	return (
		<>
			{!loading && (
				<>
				<Head>
					<title>MD. AL AMIN</title>
				</Head>
					<section id="hero" className="relative pt-32 md:pt-10 pb-20 md:pb-0">
						<Particles />
						<div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
						<div className="container mx-auto px-3 md:px-5">
							<div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center h-screen">
								<div
									data-aos="fade-right"
									data-aos-duration="1000"
									className="hero_text sm:order-last md:order-first">
									<h5 className="bg-slate-500 dark:bg-opacity-25 text-lg font-bold w-fit px-4 rounded-sm">
										Hello!
									</h5>
									<h1 className="font-josefin text-xl py-5">
										My Name is
										<span className="font-josefin text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 ml-2">
											MD. AL AMIN
										</span>
									</h1>
									<h2 className="font-josefin text-3xl">
										<span className="mr-2">I am a</span>
										{allHomeData.title && (
											<Typewriter
												words={allHomeData.title.map((title) => title + ".")}
												loop={false}
												cursor={true}
												cursorColor="blue"
												typeSpeed={50}
											/>
										)}
									</h2>
									<div className="pt-5 pb-10">
											<ReactMarkdown 
											className="markdown-description"
											components={{
												p: ({children}) => (
													<p className="font-titillium text-lg font-medium mb-1">
														{children}
													</p>
												)
											}}
											>
												{allHomeData.description}
											</ReactMarkdown>
									</div>
									<div className="flex flex-wrap flex-col-reverse sm:flex-row sm:flex-nowrap  gap-5">
										<button
											onClick={handleDownload}
											className="flex gap-3 px-5 py-3 button button--aylen bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600  text-white relative  focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden"
											data-text="Download CV"
										>
											<span className="align-middle">Download CV</span>
											<FiDownload className="text-xl font-extrabold animate-bounce delay-200 align-middle" />
										</button>
										<Link href="/about">
											<button className="button button--nina bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600 hover:to-blue-950  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden px-5 text-white" data-text="About Me">
												{/* About Me */}
												<span className="align-middle">A</span>
												<span className="align-middle">b</span>
												<span className="align-middle">o</span>
												<span className="align-middle">u</span>
												<span className="align-middle">t</span>
												<span className="align-middle ms-1">M</span>
												<span className="align-middle">e</span>
											</button>
										</Link>
									</div>
								</div>
								<div
									data-aos="zoom-in"
									data-aos-duration="1000"
									className="hero_image mx-auto order-first sm:order-first md:order-last">
									<Image
										src={allHomeData.image[0]}
										width={350}
										height={350}
										alt="mdalamin75"
										priority="true"
										className="w-80 shadow-xl shadow-sky-600 rounded-full mb-10 xl:ml-64"
									/>
								</div>
							</div>
						</div>
					</section>
					<section id="latest_projects" className="relative mt-20 md:mt-0 py-10 md:py-20">
						<div className="container mx-auto px-3 md:px-5">
							<div className="latest_head">
								<Image
									src={portfolio}
									width={150}
									height={150}
									priority="true"
									alt="portfolio"
									className="mx-auto z-10"
									data-aos="fade-up"
									data-aos-duration="1000"
								/>
								<h1
									className="font-josefin uppercase text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 drop-shadow-2xl">
									Latest Projects
								</h1>
								<p className="font-titillium text-center text-lg py-3">
									Here you will find my all New Projects.
								</p>
							</div>
							<div className="">
								<ProjectItem showFilter={false} limit={6} />
								
							</div>
							<div className="w-full flex justify-center">
								<Link
									href="/portfolio"
									data-aos="fade-right"
									data-aos-duration="1000"
									className="button button--nina bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600 hover:to-blue-950  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden ms-5 px-10 text-white" data-text="View More">
									{/* View More */}
									<span className="align-middle">V</span>
									<span className="align-middle">i</span>
									<span className="align-middle">e</span>
									<span className="align-middle">w</span>
									<span className="align-middle ms-1">M</span>
									<span className="align-middle">o</span>
									<span className="align-middle">r</span>
									<span className="align-middle">e</span>
								</Link>
							</div>
						</div>
						<div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
					</section>
					<section id="testimonial" className="relative py-10 md:py-20">
						<div className="container mx-auto px-3 md:px-5">
							<div className="testimonial_head">
								<Image
									src={review}
									width={150}
									height={150}
									priority="true"
									alt="testimonial"
									className="mx-auto z-10"
								/>
								<h1
									className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-slate-100 drop-shadow-2xl">
									Testimonial
								</h1>
								<p className="font-titillium text-lg text-center py-3">
									Here you will find all my Reviews. <br /> There is my web
									development journey review from my valuable clients.
								</p>
							</div>
							<div className="testimonial_slider py-10">
								<TestimonialSlider />
							</div>
						</div>
						<div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
					</section>
					<section id="service" className="relative py-10 md:py-20">
						<div className="container mx-auto px-3 md:px-5">
							<div className="service_head">
								<h1
									className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-slate-100 drop-shadow-2xl">
									Service
								</h1>
								<p className="font-titillium text-lg text-center py-3">
									Secure your seat, fasten your seatbelt, and join us on an interstellar journey to turn your <br /> web vision into a next level reality.
								</p>
							</div>
							<div className="services py-10">
								<Services />
							</div>
						</div>
						<div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_06"></div>
					</section>
				</>
			)}
		</>
	);
}
