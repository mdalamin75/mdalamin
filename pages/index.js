import React from "react";
import dynamic from "next/dynamic";
import { Typewriter } from "react-simple-typewriter";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import Services from "../components/Services";
import TestimonialSlider from "../components/TestimonialSlider";
import ProjectItem from "../components/ProjectItem";
import portfolio from "../public/portfolio/portfolio.svg";
import review from "../public/testimonial/review.svg";
import SEO from "../components/SEO";

const ParticlesOptimized = dynamic(() => import("../components/ParticlesOptimized"), {
    ssr: false,
    loading: () => null
});

export default function Home({ initialData }) {
  const { data: homeData, loading } = useFetch("home", initialData);

  if (loading) return null;
  const allHomeData = homeData?.[0];

  const handleDownload = async () => {
    try {
      const pdfUrl = allHomeData.cvUrl;
      const apiUrl = `/api/download-cv?url=${encodeURIComponent(pdfUrl)}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
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
      {allHomeData && (
        <SEO
          title={`${allHomeData.name} - ${allHomeData.title}`}
          description={`${allHomeData.description} Professional web developer specializing in React, Next.js, WordPress, and custom solutions.`}
          ogImage={allHomeData.image || "/profile.jpg"}
        />
      )}

      <section id="hero" className="relative pt-32 md:pt-10 pb-10 md:pb-20">
        <ParticlesOptimized />
        <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center min-h-screen">
            <div data-aos="fade-right" data-aos-duration="1000" className="text-white order-2 md:order-1 mt-10 md:mt-0 z-10">
              <h4 className="text-lg font-josefin font-medium">Hello, I'm</h4>
              {allHomeData && (
                <h1 className="text-4xl md:text-6xl font-josefin font-bold bg-gradient-to-r from-color3 to-blue-400 bg-clip-text text-transparent">
                  {allHomeData.name}
                </h1>
              )}
              <h2 className="text-2xl md:text-3xl font-josefin font-medium text-white mt-2 mb-4">
                <Typewriter
                  words={allHomeData?.skills || ['Web Developer', 'Designer']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
              {allHomeData && (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{allHomeData.description}</ReactMarkdown>
                </div>
              )}
              <div className="flex items-center gap-4 mt-6">
                {allHomeData?.cvUrl && (
                  <button onClick={handleDownload} className="bg-gradient-to-r from-color3 to-blue-400 text-white px-6 py-3 rounded-lg font-josefin font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-color3/25 transition-all duration-300">
                    <FiDownload />
                    Download CV
                  </button>
                )}
                <Link href="/contact" className="border border-color3 text-color3 px-6 py-3 rounded-lg font-josefin font-medium hover:bg-color3 hover:text-white transition-all duration-300">
                  Hire Me
                </Link>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="1000" className="flex justify-center order-1 md:order-2 z-10">
              {allHomeData?.image && (
                <div className="relative">
                  <Image src={allHomeData.image} alt={allHomeData.name} width={400} height={400} className="rounded-full shadow-2xl shadow-color3/20" priority />
                  <div className="absolute -inset-4 bg-gradient-to-r from-color3/20 to-blue-400/20 rounded-full blur-xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Services />

      <section id="portfolio" className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="text-center mb-16">
            <Image src={portfolio} alt="Portfolio" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-josefin font-bold text-white mb-4">My Recent Work</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Explore my latest projects showcasing modern web development, responsive design, and innovative solutions.</p>
          </div>
          <ProjectItem />
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="text-center mb-16">
            <Image src={review} alt="Reviews" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-josefin font-bold text-white mb-4">Client Testimonials</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">What my clients say about working with me and the results we've achieved together.</p>
          </div>
          <TestimonialSlider />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${base}/api/home`);
    if (!response.ok) throw new Error('Failed to fetch home data');
    const initialData = await response.json();
    return { props: { initialData } };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { props: { initialData: null } };
  }
}