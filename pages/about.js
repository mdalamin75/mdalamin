import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FcBriefcase } from "react-icons/fc";
import { SiFreelancer } from "react-icons/si";
import Programming from "../public/about/programming.svg";
import education from "../public/about/education.svg";
import skill from "../public/about/skill.svg";
import shadow from "../public/shadow_01.png";
import shadow2 from "../public/shadow_02.png";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

const About = ({ initialData }) => {
  // Fetch about data
  const { data: aboutData, loading, refetch } = useFetch("about", initialData);

  if (loading) {
    return null;
  }
  const allAboutData = aboutData[0]; // Access the first object in the array
  const educationData = aboutData[0]?.education || [];
  const skillImages = aboutData[0].skillimages || [];

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <section id="about" className="pb-10 md:pb-20 pt-32 min-h-screen snap-start bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="about_head">
            <Image src={Programming} width={150} height={150} alt="programming" priority="true" className="mx-auto z-10" />
            <h1
              className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold pb-10 -mt-5 z-30 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-green-600">
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
              className="font-titillium text-lg font-medium flex flex-col justify-around gap-y-5 pt-7">
              <p>
                <ReactMarkdown className="markdown-description"
                  components={{
                    p: ({ children }) => (
                      <p className="font-titillium text-lg font-medium mb-1">
                        {children}
                      </p>
                    )
                  }}
                >
                  {allAboutData.description}
                </ReactMarkdown>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="education" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <Image src={shadow} alt="shadow" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
            </picture>
            <picture>
              <Image src={shadow2} alt="shadow" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
            </picture>
          </div>
        </div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="education_head">
            <Image
              src={education}
              width={150}
              height={150}
              alt="education"
              data-aos="fade-up"
              data-aos-duration="1000"
              className="mx-auto z-10"
            />
            <h1
              className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-green-600 drop-shadow-2xl">
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
                    className="font-titillium content shadow-lg shadow-emerald-600"
                  >
                    <h2 className="font-bold text-lg">{new Date(edu.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h2>
                    <p className="font-medium text-lg">{edu.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No education data available</p>
            )}
          </div>
        </div>
      </section>
      <section id="skill" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="absolute inset-0 top-0 bg-top bg-no-repeat shadow_06"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="skill_head">
            <Image
              src={skill}
              width={150}
              height={150}
              alt="skill"
              data-aos="fade-up"
              data-aos-duration="1000"
              className="mx-auto z-10"
            />
            <h1
              className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400 drop-shadow-2xl">
              Skill & Experience
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-10">
            <div className="font-titillium skills font-bold flex flex-wrap justify-evenly items-center gap-5 py-10 px-3 md:px-5 lg:px-10">
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
                    alt="skill-${skill.label}"
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
                className="font-titillium text-xl font-bold mb-3 ">
                {/* Experience in the Freelancer.com */}
                {allAboutData.experiencetitle}
              </h2>
              <div
                data-aos="zoom-in"
                data-aos-duration="1000"
                className="font-titillium ">
                <ReactMarkdown className="markdown-description"
                  components={{
                    p: ({ children }) => (
                      <p className="font-titillium text-lg font-medium">
                        {children}
                      </p>
                    )
                  }}
                >
                  {allAboutData.experiencedescription}
                </ReactMarkdown>
              </div>
              <div className="flex items-center mt-5">
                <Link
                  href="/portfolio"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000">
                  <button className="flex gap-3 px-5 py-3 button button--aylen bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600  text-white relative  focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden">
                    <span>Portfolio</span>
                    <FcBriefcase className="text-xl font-extrabold" />
                  </button>
                </Link>
                <Link
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  href="https://www.freelancer.com/u/mdalamin75"
                  target="_blanck">
                  <button className="button button--nina bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600 hover:to-blue-950  relative focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden ms-5 px-5 text-white flex items-center gap-1" data-text="Hire Me">
                    <SiFreelancer className="text-2xl font-extrabold animate-pulse text-white" />
                    <span className="align-middle">H</span>
                    <span className="align-middle">i</span>
                    <span className="align-middle">r</span>
                    <span className="align-middle">e</span>
                    <span className="align-middle ms-1">M</span>
                    <span className="align-middle">e</span>
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
