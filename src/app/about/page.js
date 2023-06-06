import Image from "next/image";
import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { FcBriefcase } from "react-icons/fc";
import { SiFreelancer } from "react-icons/si";
import Programming from "../../../public/about/programming-animate.svg";
import education from "../../../public/about/education.svg";
import skill from "../../../public/about/skill.svg";
import amin from "../../../public/about/amin.png";
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const About = () => {
  return (
    <>
      <section id="about" className="py-10 snap-start">
        <div className="container">
          <div className="about_head">
            <Image src={Programming} width={150} alt="programming" priority="true" className="mx-auto z-10" />
            <h1
              className={`${josefin.className} uppercase text-center text-5xl font-extrabold pb-10 -mt-5 z-30 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-600`}>
              About Me
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full items-center">
            <div className="mx-auto about_image ">
              <Image
                src={amin}
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
              className={`${titillium.className} flex flex-col justify-around gap-y-5 pt-7`}>
              <p>
                Hi there! <br />
                My name is MD.AL-AMIN and I am a web developer with 2+ years
                profession of experience. I specialize in creating dynamic and
                user-friendly websites using HTML, CSS, JavaScript, and
                React.js, Next.js, Bootstrap, Tailwind.
              </p>
              <p>
                I have a passion for web development and am constantly seeking
                new ways to improve my skills and stay up-to-date with the
                latest trends and techniques.
              </p>
              <p>
                In my free time, you can find me tinkering with new technologies
                or collaborating with other developers on open-source projects.
                I am always eager to learn and grow as a developer and excited
                to see where my career takes me next.
              </p>
              <p>
                Thank you for visiting my website. I hope you find my portfolio
                and experience to be of interest. If you have any questions or
                would like to work together, please don&apos;t hesitate to reach
                out.
              </p>
              <p>
                Best regards <br /> MD.AL-AMIN
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="education" className="py-5 snap-start">
        <div className="container">
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
              className={`${josefin.className} uppercase text-center text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-green-600 drop-shadow-2xl`}>
              Education
            </h1>
          </div>
          <div className="timeline">
            <div className="timeline_container after:animate-bounce left">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2>2019 - 2023</h2>
                <p>Diploma Engineering in Computer Technology</p>
              </div>
            </div>
            <div className="timeline_container after:animate-bounce right">
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2>2019</h2>
                <p>HSC Exam in Science Group</p>
              </div>
            </div>
            <div className="timeline_container after:animate-bounce left">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2>2017</h2>
                <p>SSC Exam in Science Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="skill" className="py-10 snap-start">
        <div className="container mx-auto">
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
              className={`${josefin.className} uppercase text-center text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-600 drop-shadow-2xl`}>
              Skill & Experience
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
            <div className={`${titillium.className} skills font-bold`}>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/html-5.png"
                  width={40}
                  height={50}
                  alt="html-5"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "95%" }}>
                    {" "}
                    HTML 95%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/css-3.png"
                  width={40}
                  height={50}
                  alt="css"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "90%" }}>
                    {" "}
                    CSS 90%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/sass.png"
                  width={40}
                  height={50}
                  alt="sass"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "95%" }}>
                    {" "}
                    SASS 95%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/bootstrap.png"
                  width={40}
                  height={50}
                  alt="bootstrap"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "95%" }}>
                    {" "}
                    Bootstrap 95%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/tailwind.png"
                  width={40}
                  height={50}
                  alt="tailwind"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "90%" }}>
                    {" "}
                    Tailwind 90%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/js.png"
                  width={40}
                  height={50}
                  alt="javascript"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "60%" }}>
                    {" "}
                    JavaScript 60%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/jquery.png"
                  width={40}
                  height={50}
                  alt="jquery"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "70%" }}>
                    {" "}
                    jQuery 70%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/react.png"
                  width={40}
                  height={50}
                  alt="react"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "70%" }}>
                    {" "}
                    React 70%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/nextjs.png"
                  width={40}
                  height={50}
                  alt="next js"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "70%" }}>
                    {" "}
                    Next Js 70%
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex justify-center items-center gap-x-5 mb-5">
                <Image
                  src="/wordpress.png"
                  width={40}
                  height={50}
                  alt="wordpress"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-dark2 text-center p-1 leading-none rounded-full"
                    style={{ width: "80%" }}>
                    {" "}
                    WordPress Customization 80%
                  </div>
                </div>
              </div>
            </div>
            <div className="experience mt-10 md:mt-0">
              <h2
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} text-xl font-bold mb-3`}>
                Experience in the Freelancer.com
              </h2>
              <h3
                data-aos="zoom-in"
                data-aos-duration="1000"
                className={titillium.className}>
                I am working as a professional web developer for the last few
                years at freelancer.com. As a dedicated web developer, I strive
                to bring your vision to life with innovative designs and
                flawless functionality with Mobile Responsive. With a strong
                focus on user experience and a passion for creating impactful
                online experiences, I am confident in delivering exceptional
                results. Let&apos;s collaborate and bring your ideas to the
                digital world!
              </h3>
              <div className="flex items-center mt-5">
                <Link
                  href="/portfolio"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000">
                  <button className="bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-2 rounded-md flex gap-x-3">
                    <span>Portfolio</span>
                    <FcBriefcase className="text-xl font-extrabold" />
                  </button>
                </Link>
                <Link
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  href="https://www.freelancer.com/u/mdalamin75"
                  target="_blanck">
                  <button className="ms-5 bg-gradient-to-r from-cyan-600 to-blue-600 px-2 py-2 rounded-md flex gap-x-3">
                    <SiFreelancer className="text-2xl font-extrabold animate-pulse text-dark2" />
                    <span>Hire Me</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
