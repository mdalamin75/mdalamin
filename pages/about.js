import Image from "next/image";
import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { FcBriefcase } from "react-icons/fc";
import { SiFreelancer } from "react-icons/si";
import Programming from "../public/about/programming-animate.svg";
import education from "../public/about/education.svg";
import skill from "../public/about/skill.svg";
import amin from "../public/about/amin.png";
import shadow from "../public/shadow_01.png";
import shadow2 from "../public/shadow_02.png";
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata ={
  title: "About"
}
const About = () => {
  return (
    <>
      <section id="about" className="py-10 pt-32 snap-start bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="about_head">
            <Image src={Programming} width={150} alt="programming" priority="true" className="mx-auto z-10" />
            <h1
              className={`${josefin.className} uppercase text-center text-3xl md:text-5xl font-extrabold pb-10 -mt-5 z-30 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-600`}>
              About Me
            </h1>
            <div className="absolute right-[18%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-sky-800 to-sky-700 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-72 lg:-right-0 lg:h-48 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
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
                My name is MD.AL-AMIN and I am a web developer with 3+ years
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
            <div className="timeline_container after:animate-bounce right">
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2 className="text-white">August 2023 - December 2023</h2>
                <p className="text-white">Industrial Training in Web Design and Development at
                  <Link href="https://www.itlabsolutions.com/" target="_blanck" className="text-emerald-600">  IT Lab Solutions Ltd.</Link>
                </p>
              </div>
            </div>
            <div className="timeline_container after:animate-bounce left">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2 className="text-white">2019 - 2023</h2>
                <p className="text-white">Diploma Engineering in Computer Technology</p>
              </div>
            </div>
            <div className="timeline_container after:animate-bounce right">
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2 className="text-white">2019</h2>
                <p className="text-white">HSC Exam in Science Group</p>
              </div>
            </div>
            <div className="timeline_container after:animate-bounce left">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className={`${titillium.className} content shadow-lg shadow-emerald-600`}>
                <h2 className="text-white">2017</h2>
                <p className="text-white">SSC Exam in Science Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="skill" className="py-10 snap-start relative bg_pattern2">
        <div className="absolute inset-0 top-0 bg-top bg-no-repeat shadow_04"></div>
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
            <div className={`${titillium.className} skills font-bold flex flex-wrap justify-around items-center gap-x-10 lg:gap-x-16 gap-y-10 py-10 px-3 md:px-5 lg:px-10`}>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/html-5.png"
                  width={40}
                  height={50}
                  alt="html-5"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">HTML</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/css-3.png"
                  width={40}
                  height={50}
                  alt="css"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">CSS</span>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/sass.png"
                  width={40}
                  height={50}
                  alt="sass"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">SASS</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/bootstrap.png"
                  width={40}
                  height={50}
                  alt="bootstrap"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">Bootstrap</span>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/tailwind.png"
                  width={40}
                  height={50}
                  alt="tailwind"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">Tailwind</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/js.png"
                  width={40}
                  height={50}
                  alt="javascript"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">JavaScript</span>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/jquery.png"
                  width={40}
                  height={50}
                  alt="jquery"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">jQuery</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/react.png"
                  width={40}
                  height={50}
                  alt="react"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">React JS</span>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/nextjs.png"
                  width={40}
                  height={50}
                  alt="next js"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="mt-3 text-white">Next Js</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/php.png"
                  width={40}
                  height={50}
                  alt="php"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">PHP</span>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/mysql.png"
                  width={40}
                  height={50}
                  alt="mysql"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-white">MySQL</span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/wordpress.png"
                  width={40}
                  height={50}
                  alt="wordpress"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-center text-white"> WordPress </span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/shopify.png"
                  width={40}
                  height={50}
                  alt="shopify"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-center text-white"> Shopify </span>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex flex-col justify-center items-center gap-x-5 gap-y-3 mb-5">
                <Image
                  src="/skills/git.png"
                  width={40}
                  height={50}
                  alt="git"
                  className="bg-white p-1 rounded-full shadow-lg shadow-sky-600 animate-pulse"
                />
                <span className="text-center text-white"> Git </span>
              </div>
            </div>
            <div className="experience mt-10 md:mt-0">
              <h2
                data-aos="fade-left"
                data-aos-duration="1000"
                className={`${titillium.className} text-xl font-bold mb-3 text-white`}>
                Experience in the Freelancer.com
              </h2>
              <h3
                data-aos="zoom-in"
                data-aos-duration="1000"
                className={`${titillium.className} text-white`}>
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
