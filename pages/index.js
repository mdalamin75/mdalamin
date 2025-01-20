"use client";
import React from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import CountUpAnimation from "../components/CountUpAnimation";
import mdalamin from "../public/mdalamin.png";
import AllProjects from "../components/AllProjects";
import portfolio from "../public/portfolio/portfolio.svg";
import Particles from "../components/Particles";

const titillium = Titillium_Web({
	subsets: ["latin"],
	weight: ["400", "700"],
});
const josefin = Josefin_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export default function Home() {
	return (
		<>
			<section className="pb-10 pt-28 relative">
				<Particles />
				<div className="container mx-auto px-3 md:px-5">
					<div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center mb-20">
						<div
							data-aos="fade-right"
							data-aos-duration="1000"
							className="hero_text sm:order-last md:order-first">
							<h5 className="bg-white text-dark-bg text-lg font-bold w-fit px-2">
								Hello!
							</h5>
							<h1 className={`${josefin.className} font-serif text-xl py-5`}>
								My Name is
								<span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
									MD.AL-AMIN
								</span>
							</h1>
							<h2 className={`${josefin.className} font-serif text-3xl`}>
								I am a{"  "}
								<Typewriter
									words={[
										"Web Developer.",
										"Web Designer.",
										"Front-end Developer.",
										"Wordpress Developer.",
									]}
									loop={false}
									cursor={true}
									cursorColor="white"
									typeSpeed={50}
								/>
							</h2>
							<div className={`${titillium.className} font-serif pt-5 pb-10`}>
								<p className="pb-5 text-lg">
									Welcome to my portfolio! I am a professional experienced web
									developer specializing in Modern technologies.
								</p>
								<p className="pb-5 text-lg">
									On this website, you will find a selection of my most recent
									and notable projects, as well as information about my
									background and skills. Please feel free to explore and contact
									me if you have any questions or would like to work together.
								</p>
								<p className="text-lg">
									Thank you for visiting. I hope you enjoy your stay!
								</p>
							</div>
							<div className="flex items-center">
								<Link href="/MD.AL-AMIN_CV.pdf" download target="_blank">
									<button className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-2 rounded-md flex gap-x-3">
										<span>Download CV</span>
										<FiDownload className="text-xl font-extrabold animate-bounce delay-200" />
									</button>
								</Link>
								<Link href="/about">
									<button className="ms-5 bg-gradient-to-r from-cyan-600 to-blue-600 px-2 py-2 rounded-md">
										About Me
									</button>
								</Link>
							</div>
						</div>
						<div
							data-aos="zoom-in"
							data-aos-duration="1000"
							className="hero_image mx-auto order-first sm:order-first md:order-last">
							<Image
								src={mdalamin}
								// width={350}
								alt="mdalamin75"
								priority="true"
								className="w-80 shadow-xl shadow-sky-600 rounded-full mb-10 xl:ml-64"
							/>
						</div>
					</div>
				</div>
			</section>
			<CountUpAnimation />
			<section id="latest_projects" className="relative">
				<div className="container mx-auto px-3 md:px-5">
					<div className="latest_head pt-16">
						<Image
							src={portfolio}
							width={150}
							priority="true"
							alt="portfolio"
							className="mx-auto z-10"
							data-aos="fade-up"
							data-aos-duration="1000"
						/>
						<h1
							className={`${josefin.className} uppercase text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-orange-600 drop-shadow-2xl`}>
							Latest Projects
						</h1>
						<p className={`${titillium.className} text-center py-3`}>
							Here you will find my all New Projects.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 py-10">
						{AllProjects.slice(16)
							.reverse()
							.map((element) => {
								const {
									id,
									title,
									image,
									category,
									view,
									source,
									description,
								} = element;
								return (
									<div
										key={id}
										data-aos="zoom-in"
										data-aos-duration="1000"
										className="description flex flex-col md:flex-row gap-x-3 gap-y-3 items-center p-5 bg-dark2 m-3 rounded-xl shadow-md shadow-emerald-600 duration-500 hover:shadow-lg hover:shadow-orange-600">
										<div className="max-h-56 overflow-hidden tra duration-500 hover:scale-105">
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
													className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-1 rounded-lg text-base capitalize font-medium delay-300 hover:from-sky-600 hover:to-purple-500">
													View
												</Link>
												<Link
													href={source}
													target="_blank"
													className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-1 ms-5 rounded-lg text-base capitalize font-medium delay-300 hover:from-indigo-600 hover:to-purple-500">
													Source
												</Link>
											</div>
										</div>
									</div>
								);
							})}
						<div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
					</div>
					<div className="w-full flex justify-center pb-20 mt-5">
						<Link
							href="/portfolio"
							data-aos="fade-right"
							data-aos-duration="1000"
							className="bg-emerald-700 py-3 px-10 rounded-lg font-bold duration-500 hover:bg-emerald-800">
							View More
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
