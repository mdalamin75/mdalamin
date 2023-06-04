"use client";
import React from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import CountUpAnimation from "./components/CountUpAnimation";

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
      <section className="pb-10 pt-14">
        <div className="container">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center mb-20">
            <div className="hero_text sm:order-last md:order-first">
              <h5 className="bg-white text-dark-bg text-lg font-bold w-fit px-2">
                Hello!
              </h5>
              <h1 className={`${josefin.className} font-serif text-xl py-5`}>
                My Name is{" "}
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                  {" "}
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
                <p className="pb-5">
                  Welcome to my portfolio! I am a professional experienced web
                  developer specializing in Modern technologies.
                </p>
                <p className="pb-5">
                  On this website, you will find a selection of my most recent
                  and notable projects, as well as information about my
                  background and skills. Please feel free to explore and contact
                  me if you have any questions or would like to work together.
                </p>
                <p>Thank you for visiting. I hope you enjoy your stay!</p>
              </div>
              <div className="flex items-center">
                <Link href="/MD.AL-AMIN CV.pdf" download target="_blank">
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
            <div className="hero_image mx-auto order-first sm:order-first md:order-last">
              <Image
                src="/mdalamin.png"
                width={350}
                height={350}
                alt="mdalamin75"
                className="shadow-xl shadow-sky-600 rounded-full mb-10"
              />
            </div>
          </div>
        </div>
        <CountUpAnimation />
      </section>
    </>
  );
}
