import Image from "next/image";
import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { FcBriefcase } from "react-icons/fc";
import { SiFreelancer } from "react-icons/si";
import Programming from "../public/about/programming-animate.svg";
import education from "../public/about/education.svg";
import skill from "../public/about/skill.svg";
import shadow from "../public/shadow_01.png";
import shadow2 from "../public/shadow_02.png";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "About"
}
const About = ({ initialData }) => {
  // Fetch about data
  const { data: aboutData, loading, refetch } = useFetch("about", initialData);

  if (loading) {
    return <div>Loading...</div>;
  }
  const allAboutData = aboutData[0]; // Access the first object in the array
  const educationData = aboutData[0]?.education || [];
  const skillImages = aboutData[0].skillimages || [];

  return (
    <>
      <section id="about" className="py-10 pt-32 snap-start bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="about_head">
            <Image src={Programming} width={150} alt="programming" priority="true" className="mx-auto z-10" />
            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold pb-10 -mt-5 z-30 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-green-600`}>
              About Me
            </h1>
            <div className="absolute right-[18%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-sky-800 to-sky-700 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-72 lg:-right-0 lg:h-48 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full items-center">
            <div className="mx-auto about_image ">
              <Image
                src={allAboutData.aboutimage[0]}
                width={300}
                height={300}
                alt="mdalamin"
                priority="true"
                data-aos="zoom-in"
                data-aos-duration="1000"
                className="rounded-3xl shadow-2xl shadow-emerald-600"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className={`${titillium.className} text-lg font-medium flex flex-col justify-around gap-y-5 pt-7`}>
              <p>
                <ReactMarkdown className="markdown-description">
                  {allAboutData.description}
                </ReactMarkdown>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="education" className="py-10 snap-start relative bg_pattern2">
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <Image src={shadow} alt="" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
            </picture>
            <picture>
              <Image src={shadow2} alt="" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
            </picture>
          </div>
        </div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="education_head">
            <Image
              src={education}
              width={150}
              alt="education"
              data-aos="fade-up"
              data-aos-duration="1000"
              className="mx-auto z-10"
            />
            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-green-600 drop-shadow-2xl`}>
              Education
            </h1>
          </div>
          <div className="timeline">
            {Array.isArray(educationData) && educationData.length > 0 ? (
              educationData.reverse().map((edu, index) => (
                <div key={index} className={`timeline_container after:animate-bounce ${index % 2 === 0 ? 'right' : 'left'}`}>
                  <div
                    data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                    data-aos-duration="1000"
                    className={`${titillium.className} content shadow-lg shadow-emerald-600`}
                  >
                    <h2 className="font-bold">{new Date(edu.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h2>
                    <p className="font-medium">{edu.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No education data available</p>
            )}
          </div>
        </div>
      </section>
      <section id="skill" className="py-10 snap-start relative bg_pattern2">
        <div className="absolute inset-0 top-0 bg-top bg-no-repeat shadow_06"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="skill_head">
            <Image
              src={skill}
              width={150}
              alt="skill"
              data-aos="fade-up"
              data-aos-duration="1000"
              className="mx-auto z-10"
            />
            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-600 drop-shadow-2xl`}>
              Skill & Experience
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-10">
            <div className={`${titillium.className} skills font-bold flex flex-wrap justify-between items-center gap-5 py-10 px-3 md:px-5 lg:px-10`}>
              {skillImages.map((skill, index) => (
                <div
                  key={index}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-duration="1000"
                  className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5"
                >
                  <Image
                    src={skill.src} 
                    width={40} 
                    height={50}
                    alt={`skill-${skill.label}`} 
                    className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                  />
                  <span className="">{skill.label}</span> 
                </div>
              ))}
            </div>
            <div className="experience mt-10 md:mt-0">
              <h2
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} text-xl font-bold mb-3 `}>
                {/* Experience in the Freelancer.com */}
                {allAboutData.experiencetitle}
              </h2>
              <h3
                data-aos="zoom-in"
                data-aos-duration="1000"
                className={`${titillium.className} `}>
                <ReactMarkdown className="markdown-description">
                  {allAboutData.experiencedescription}
                </ReactMarkdown>
              </h3>
              <div className="flex items-center mt-5">
                <Link
                  href="/portfolio"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000">
                  <button className="flex gap-3 px-6 py-3 rounded-lg border transition-all border-[--p] text-[--p] shadow-[0_0_10px_var(--p)] hover:shadow-[0_0_20px_var(--p)]">
                    <span>Portfolio</span>
                    <FcBriefcase className="text-xl font-extrabold" />
                  </button>
                </Link>
                <Link
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  href="https://www.freelancer.com/u/mdalamin75"
                  target="_blanck">
                  <button className="flex gap-3 px-6 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-md border border-[--bc] text-[--bc] hover:bg-opacity-30 transition-all ms-5">
                    <SiFreelancer className="text-2xl font-extrabold animate-pulse text-dark2" />
                    <span>Hire Me</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default About;
