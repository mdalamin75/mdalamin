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
import SEO from "../components/SEO";

const ParticlesOptimized = dynamic(() => import("../components/ParticlesOptimized"), {
  ssr: false,
  loading: () => null
});

export default function Home({ initialData }) {
  // Extract data from the new initialData structure
  const homeData = initialData?.home;
  const portfolioData = initialData?.portfolio;
  const servicesData = initialData?.services;
  const testimonialsData = initialData?.testimonials;

  const { data: homeDataFromHook, loading } = useFetch("home", homeData);
  

  // Complete Page Skeleton Loader
  const PageSkeleton = () => (
    <>
      <SEO
        title="MD. AL AMIN - Professional Web Developer & Designer"
        description="Professional web developer specializing in modern web applications, responsive design, and digital solutions. Explore my portfolio and get in touch for your next project."
        keywords="web developer, frontend developer, react developer, nextjs developer, portfolio, web design, responsive design, MD AL AMIN"
        ogImage="/profile.jpg"
      />

      {/* Hero Section Skeleton */}
      <section id="hero" className="relative pt-32 md:pt-10 pb-10 md:pb-20">
        <ParticlesOptimized />
        <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center min-h-screen">
            {/* Hero Text Skeleton */}
            <div className="hero_text sm:order-last md:order-first">
              <div className="h-8 bg-gray-700/50 rounded-sm w-20 animate-pulse mb-4"></div>
              <div className="h-8 bg-gray-700/50 rounded-lg w-64 animate-pulse mb-5"></div>
              <div className="h-12 bg-gray-700/50 rounded-lg w-80 animate-pulse mb-5"></div>

              {/* Description Skeleton */}
              <div className="pt-5 pb-10 space-y-3">
                <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-700/50 rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Buttons Skeleton */}
              <div className="flex flex-wrap flex-col-reverse sm:flex-row sm:flex-nowrap gap-5">
                <div className="h-12 bg-gray-700/50 rounded-lg w-52 animate-pulse"></div>
                <div className="h-12 bg-gray-700/50 rounded-lg w-32 animate-pulse"></div>
              </div>
            </div>

            {/* Hero Image Skeleton */}
            <div className="hero_image mx-auto order-first sm:order-first md:order-last">
              <div className="w-80 h-80 bg-gray-700/50 rounded-full animate-pulse mb-10 xl:ml-64"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section id="services" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="services_head text-center mb-16">
            <div className="w-32 h-32 bg-gray-700/50 rounded-full mx-auto animate-pulse mb-4"></div>
            <div className="h-12 bg-gray-700/50 rounded-lg mx-auto w-48 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="w-16 h-16 bg-gray-700/50 rounded-xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-700/50 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section Skeleton */}
      <section id="portfolio" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="portfolio_head text-center mb-16">
            <div className="w-32 h-32 bg-gray-700/50 rounded-full mx-auto animate-pulse mb-4"></div>
            <div className="h-12 bg-gray-700/50 rounded-lg mx-auto w-48 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
                <div className="h-48 bg-gray-700/50 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section id="testimonials" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="testimonials_head text-center mb-16">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700/50 rounded-full mx-auto animate-pulse mb-4"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700/50 rounded-lg mx-auto w-56 animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700/50 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700/50 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700/50 rounded w-3/4 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-700/50 rounded-lg mx-auto w-32 animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-700/50 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="w-16 h-16 bg-gray-700/50 rounded-xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-700/50 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const allHomeData = Array.isArray(homeDataFromHook)
    ? (homeDataFromHook.find(h => h.status === 'publish') || homeDataFromHook[0])
    : homeDataFromHook || homeData;

  // Show skeleton while loading or if no data
  if (loading || !allHomeData) {
    return <PageSkeleton />;
  }

  const heroName = allHomeData?.title?.[0] || "";
  const heroSkills = Array.isArray(allHomeData?.title) && allHomeData.title.length > 1
    ? allHomeData.title
    : ["Web Developer", "Designer"];
  const heroImage = allHomeData?.image?.[0] || null;

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
          title={`${heroName || 'MD. AL AMIN'} - Portfolio`}
          description={`${allHomeData.description} Professional web developer specializing in React, Next.js, WordPress, and custom solutions.`}
          ogImage={heroImage || "/profile.jpg"}
        />
      )}

      <section id="hero" className="relative pt-32 md:pt-10 pb-10 md:pb-20">
        <ParticlesOptimized />
        <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_03"></div>
        <div className="container mx-auto px-3 md:px-5">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-between items-center min-h-screen">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="hero_text sm:order-last md:order-first animate-fadeInUp">
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
                    p: ({ children }) => (
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
                  className="flex gap-3 px-5 py-3 button button--aylen bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600  relative  focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden w-52"
                  data-text="Download CV"
                >
                  <span className="align-middle text-white">Download CV</span>
                  <FiDownload className="text-xl font-extrabold animate-bounce delay-200 text-white align-middle" />
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
              className="hero_image mx-auto order-first sm:order-first md:order-last animate-fadeInUp">
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

      <section id="portfolio" className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="text-center mb-16">
            <Image src="/portfolio/portfolio.svg" alt="Portfolio" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-josefin font-bold mb-4">My Recent Work</h2>
            <p className="max-w-2xl mx-auto">Explore my latest projects showcasing modern web development, responsive design, and innovative solutions.</p>
          </div>
          <ProjectItem showFilter={false} limit={6} initialData={portfolioData} />
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
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="testimonials_head text-center mb-16">
            <Image src="/testimonial/review.svg" alt="Reviews" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-josefin font-bold mb-4">Client Testimonials</h2>
            <p className="max-w-2xl mx-auto">What my clients say about working with me and the results we've achieved together.</p>
          </div>
          <TestimonialSlider initialData={testimonialsData} />
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-3 md:px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-josefin font-bold mb-4">Service</h2>
            <p className="max-w-2xl mx-auto">Secure your seat, fasten your seatbelt, and join us on an interstellar journey to turn your
              web vision into a next level reality.</p>
          </div>
          <Services initialData={servicesData} />
        </div>
      </section>
      
      {/* Custom CSS for smooth animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Fetch all necessary data in parallel
    const [homeResponse, portfolioResponse, servicesResponse, testimonialsResponse] = await Promise.all([
      fetch(`${base}/api/home`),
      fetch(`${base}/api/portfolio`),
      fetch(`${base}/api/service`),
      fetch(`${base}/api/testimonial`)
    ]);

    // Check if all responses are ok
    if (!homeResponse.ok) throw new Error('Failed to fetch home data');
    if (!portfolioResponse.ok) throw new Error('Failed to fetch portfolio data');
    if (!servicesResponse.ok) throw new Error('Failed to fetch services data');
    if (!testimonialsResponse.ok) throw new Error('Failed to fetch testimonials data');

    // Parse all responses
    const [homeData, portfolioData, servicesData, testimonialsData] = await Promise.all([
      homeResponse.json(),
      portfolioResponse.json(),
      servicesResponse.json(),
      testimonialsResponse.json()
    ]);

    // Combine all data into initialData
    const initialData = {
      home: homeData,
      portfolio: portfolioData,
      services: servicesData,
      testimonials: testimonialsData
    };

    return { props: { initialData } };
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    return { props: { initialData: null } };
  }
}