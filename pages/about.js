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
import useFreelancerStats from "../hooks/useFreelancerStats";
import ReactMarkdown from "react-markdown";
import SEO from "../components/SEO";

const About = ({ initialData }) => {
  // Fetch about data with cache busting
  const { data: aboutData, loading, refetch } = useFetch("about", initialData);
  
  
  // Fetch real stats from testimonials and portfolio (set to true to enable real data)
  const { stats: freelancerStats, loading: statsLoading, error: statsError, isRealData, dataSource } = useFreelancerStats(true);
  
  // Add cache busting for skills
  const [skillsRefreshKey, setSkillsRefreshKey] = React.useState(0);
  
  // Countdown animation state - start with final values to prevent layout shift
  const [animatedStats, setAnimatedStats] = React.useState({
    years: 4,
    projects: 29,
    satisfaction: 100
  });

  // Get data safely (always call this after hooks)
  const allAboutData = aboutData?.[0]; // Access the first object in the array
  const educationData = allAboutData?.education || [];
  const skillImages = allAboutData?.skillimages || [];
  const certifications = allAboutData?.certifications || [];
  

  // Force refresh skills when component mounts (only once)
  React.useEffect(() => {
    setSkillsRefreshKey(prev => prev + 1);
  }, []); // Empty dependency array to run only once

  // Refresh AOS when data loads to prevent animation conflicts
  React.useEffect(() => {
    if (!loading && aboutData && aboutData.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.AOS) {
          window.AOS.refresh();
        }
      }, 100);
    }
  }, [loading, aboutData]);

  // Countdown animation effect - improved to prevent shaking
  React.useEffect(() => {
    const animateCountdown = () => {
      // Get actual project count from real stats (already calculated from portfolio + testimonials)
      const actualProjectCount = freelancerStats?.completedProjects || 50;
      
      const targets = {
        years: 4,
        projects: actualProjectCount,
        satisfaction: 100
      };

      // Start from 0 for animation effect
      setAnimatedStats({
        years: 0,
        projects: 0,
        satisfaction: 0
      });

      const duration = 1500; // Reduced duration for faster completion
      const steps = 30; // Reduced steps for smoother animation
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Use easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedStats({
          years: Math.floor(targets.years * easeOutQuart),
          projects: Math.floor(targets.projects * easeOutQuart),
          satisfaction: Math.floor(targets.satisfaction * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(targets);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    // Start animation when stats are loaded
    if (freelancerStats) {
      animateCountdown();
    }
  }, [freelancerStats]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <>
      <SEO
        title="About MD. AL AMIN - Skills, Experience & Education"
        description="Learn about MD. AL AMIN's web development journey, skills, and professional experience. Discover the technologies and expertise behind modern web solutions."
        keywords="MD. AL AMIN biography, web developer skills, programmer experience, freelance developer, mdalamin75 about, web development expertise"
        ogImage="/profile.jpg"
      />
      
      {/* About Me Section Skeleton */}
      <section id="about" className="pb-10 md:pb-20 pt-32 min-h-screen snap-start bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="about_head">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mt-4 w-64 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Profile Image Skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
            </div>
            {/* Content Skeleton */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-80 animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-64 animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
              {/* Stats Skeleton */}
              <div className="grid grid-cols-3 gap-4 py-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
              {/* Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-40 animate-pulse"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section Skeleton */}
      <section id="education" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="education_head">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mt-4 w-48 animate-pulse"></div>
          </div>
          <div className="timeline">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                <div className="timeline-content">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section id="skills" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="skills_head">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mt-4 w-64 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Skills Grid Skeleton */}
            <div className="skills-section w-full">
              <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                  <div key={i} className="skill-item">
                    <div className="bg-gray-300 dark:bg-gray-700 rounded-xl p-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg mx-auto mb-3"></div>
                      <div className="h-4 bg-gray-600 rounded w-16 mx-auto mb-2"></div>
                      <div className="h-2 bg-gray-600 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Category Sections Skeleton */}
              {['Frontend', 'Backend', 'Database', 'Tools'].map((category, i) => (
                <div key={i} className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Experience Section Skeleton */}
            <div className="experience-section w-full">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded-xl p-4 animate-pulse">
                      <div className="h-8 bg-gray-600 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-600 rounded w-20"></div>
                    </div>
                  ))}
                </div>
                {/* Buttons Skeleton */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-32 animate-pulse"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section Skeleton */}
      <section id="certifications" className="py-10 md:py-20 snap-start relative bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="certifications_head">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mt-4 w-56 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  // Conditional rendering after all hooks
  if (loading) {
    return <SkeletonLoader />;
  }

  // Better data validation
  if (!aboutData || !Array.isArray(aboutData) || aboutData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No About Data Available</h2>
        <p className="text-gray-600 mb-4">Please check your database connection and ensure about data exists.</p>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="About MD. AL AMIN - Skills, Experience & Education"
        description={`Learn about MD. AL AMIN's background, skills, and experience as a professional web developer. ${allAboutData?.description?.substring(0, 100)}...`}
        keywords="MD. AL AMIN biography, web developer skills, programmer experience, freelance developer, mdalamin75 about, web development expertise"
        ogImage={allAboutData?.image || "/profile.jpg"}
      />
      <section id="about" className="pb-10 md:pb-20 pt-32 min-h-screen snap-start bg_pattern2">
        <div className="container mx-auto px-3 md:px-5">
          <div className="about_head">
            <Image src={Programming} width={150} height={150} alt="programming" priority="true" className="mx-auto z-10" />
            <h1
              className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold pb-10 -mt-5 z-30 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-emerald-600 dark:from-gray-200 dark:to-green-600">
              About Me
            </h1>
            <div className="absolute right-[18%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-sky-800 to-sky-700 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-72 lg:-right-0 lg:h-48 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Profile Image Section */}
            <div className="relative mx-auto lg:mx-0" data-aos="zoom-in" data-aos-duration="1000">
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                
                <Image
                  src={allAboutData?.aboutimage?.[0] || "/alamin.jpg"}
                  width={400}
                  height={400}
                  alt="MD. AL AMIN - Professional Web Developer"
                  priority="true"
                  className="relative rounded-3xl shadow-2xl border-2 border-white/20 group-hover:border-emerald-400/50 transition-all duration-500"
                />
                
                {/* Professional badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Web Developer
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8" data-aos="fade-left" data-aos-duration="1000">
              {/* Professional greeting */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">MD. AL AMIN</span>
                  </h2>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    Professional Web Developer & Digital Solutions Expert
                  </p>
                </div>
                
                {/* Main content */}
                <div className="space-y-6">
                  <ReactMarkdown 
                    className="markdown-description"
                    components={{
                      p: ({ children }) => (
                        <p className="text-lg leading-relaxed mb-6 last:mb-0 text-gray-700 dark:text-gray-300">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-emerald-400 font-semibold">
                          {children}
                        </strong>
                      )
                    }}
                  >
                    {allAboutData?.description || `I'm a passionate web developer with 3+ years of experience creating modern, responsive websites and web applications. I specialize in frontend technologies like React.js, Next.js, and modern CSS frameworks, as well as backend development with PHP and database management.

My approach combines technical expertise with creative problem-solving to deliver exceptional digital experiences. I'm committed to staying current with the latest web technologies and best practices, ensuring every project I work on meets the highest standards of quality and performance.

Whether you need a simple website, a complex web application, or ongoing maintenance and support, I'm here to help bring your digital vision to life. Let's work together to create something amazing!`}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Professional stats with countdown animation */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  {statsLoading ? (
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse mb-2"></div>
                  ) : (
                    <div className="text-2xl font-bold text-emerald-400 transition-all duration-300 countdown-stat">
                      {animatedStats.years}+
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  {statsLoading ? (
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse mb-2"></div>
                  ) : (
                    <div className="text-2xl font-bold text-blue-400 transition-all duration-300 countdown-stat">
                      {animatedStats.projects}+
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Done</div>
                </div>
                <div className="text-center">
                  {statsLoading ? (
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse mb-2"></div>
                  ) : (
                    <div className="text-2xl font-bold text-purple-400 transition-all duration-300 countdown-stat">
                      {animatedStats.satisfaction}%
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/portfolio" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                >
                  <FcBriefcase className="mr-3 text-lg group-hover:scale-110 transition-transform" />
                  View My Portfolio
                </Link>
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                >
                  <SiFreelancer className="mr-3 text-lg group-hover:scale-110 transition-transform" />
                  Get In Touch
                </Link>
              </div>
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
              [...educationData].reverse().map((edu, index) => (
                <div key={`${edu.degree || edu.name}-${edu.date}-${index}`} className={`timeline_container transition-all duration-500 ${index % 2 === 0 ? 'right' : 'left'}`}>
                  <div
                    data-aos={!loading ? (index % 2 === 0 ? 'fade-left' : 'fade-right') : ''}
                    data-aos-duration="1000"
                    data-aos-delay={!loading ? index * 200 : 0}
                    className="font-titillium content shadow-lg shadow-emerald-600"
                  >
                    <h2 className="font-bold text-lg text-emerald-400">{new Date(edu.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h2>
                    <h3 className="font-bold text-xl mb-2">{edu.degree || edu.name}</h3>
                    {edu.institution && <p className="font-medium text-lg text-gray-300 mb-1">{edu.institution}</p>}
                    {edu.location && <p className="font-medium text-sm text-gray-400 mb-2">{edu.location}</p>}
                    {edu.gpa && <p className="font-medium text-sm text-blue-400">GPA: {edu.gpa}</p>}
                    {edu.coursework && (
                      <div className="mt-3">
                        <p className="font-semibold text-sm text-gray-300 mb-1">Relevant Coursework:</p>
                        <p className="text-sm text-gray-400">{edu.coursework}</p>
                      </div>
                    )}
                    {edu.achievements && (
                      <div className="mt-2">
                        <p className="font-semibold text-sm text-gray-300 mb-1">Achievements:</p>
                        <p className="text-sm text-gray-400">{edu.achievements}</p>
                      </div>
                    )}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="skills-section w-full">
              {/* Skills Grid - Show all skills */}
              <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8" data-aos="fade-up" data-aos-duration="1000">
                {skillImages.map((skill, index) => (
                  <div key={index} className="skill-item group">
                    <div className="flex flex-col items-center bg-transparent backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-blue-500/50">
                      <div className="w-12 h-12 mb-3 flex items-center justify-center">
                        <Image
                          src={skill.src}
                          width={48}
                          height={48}
                          alt={`${skill.label} skill`}
                          className="rounded-lg object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium text-center group-hover:text-white transition-colors">{skill.label}</span>
                      {skill.level && (
                        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              skill.level === 'Expert' ? 'bg-green-500 w-full' :
                              skill.level === 'Advanced' ? 'bg-blue-500 w-4/5' :
                              skill.level === 'Intermediate' ? 'bg-yellow-500 w-3/5' : 'bg-orange-500 w-2/5'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills Categories - Organized by category */}
              <div className="skills-categories space-y-6">
                {/* Frontend Skills */}
                {skillImages.filter(skill => skill.category === 'frontend').length > 0 && (
                  <div data-aos="fade-right" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-blue-400">Frontend Development</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'frontend').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backend Skills */}
                {skillImages.filter(skill => skill.category === 'backend').length > 0 && (
                  <div data-aos="fade-left" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-green-400">Backend Development</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'backend').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Database Skills */}
                {skillImages.filter(skill => skill.category === 'database').length > 0 && (
                  <div data-aos="fade-right" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-orange-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-orange-400">Database & Storage</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'database').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & DevOps */}
                {skillImages.filter(skill => skill.category === 'tools' || skill.category === 'devops').length > 0 && (
                  <div data-aos="fade-left" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-purple-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-purple-400">Tools & DevOps</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'tools' || skill.category === 'devops').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Development */}
                {skillImages.filter(skill => skill.category === 'mobile').length > 0 && (
                  <div data-aos="fade-right" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-cyan-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-cyan-400">Mobile Development</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'mobile').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI & Machine Learning */}
                {skillImages.filter(skill => skill.category === 'ai').length > 0 && (
                  <div data-aos="fade-left" data-aos-duration="1000" className="category-section">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-pink-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-bold text-pink-400">AI & Machine Learning</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-pink-500/50 to-transparent ml-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillImages.filter(skill => skill.category === 'ai').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30">
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="experience mt-10 lg:mt-0">
              <div className="bg-transparent backdrop-blur-sm rounded-2xl p-6 border border-gray-500/50">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                  <h2
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    className="font-titillium text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {allAboutData?.experiencetitle || "Professional Experience"}
                  </h2>
                </div>
                
                <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  className="font-titillium mb-6">
                  <ReactMarkdown className="markdown-description"
                    components={{
                      p: ({ children }) => (
                        <p className="font-titillium text-base font-medium leading-relaxed mb-4">
                          {children}
                        </p>
                      )
                    }}
                  >
                    {allAboutData?.experiencedescription || "No experience description available"}
                  </ReactMarkdown>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-4 mb-6" data-aos="fade-up" data-aos-duration="1000">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-500/30">
                    {statsLoading ? (
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse"></div>
                    ) : (
                      <div className="text-2xl font-bold text-blue-400">
                        {freelancerStats?.completedProjects || 50}+
                      </div>
                    )}
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl border border-green-500/30">
                    {statsLoading ? (
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-16 mx-auto animate-pulse"></div>
                    ) : (
                      <div className="text-2xl font-bold text-green-400">
                        {freelancerStats?.clientSatisfaction || '100%'}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                  </div>
                </div>

                {/* Additional Stats Row */}
                {freelancerStats && (
                  <div className="grid grid-cols-2 gap-4 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                    <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/30">
                      <div className="text-2xl font-bold text-purple-400">
                        {freelancerStats?.averageRating ? `${freelancerStats.averageRating}/5` : '5.0/5'}
                      </div>
                      <div className="text-sm text-gray-400">Average Rating</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border border-orange-500/30">
                      <div className="text-2xl font-bold text-orange-400">
                        {freelancerStats?.totalReviews || 30}
                      </div>
                      <div className="text-sm text-gray-400">Client Reviews</div>
                    </div>
                  </div>
                )}

                {/* Extra Stats Row - Show additional metrics */}
                {freelancerStats && (
                  <div className="grid grid-cols-2 gap-4 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="text-center p-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl border border-cyan-500/30">
                      <div className="text-2xl font-bold text-cyan-400">
                        {freelancerStats?.uniqueClients || 25}
                      </div>
                      <div className="text-sm text-gray-400">Unique Clients</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl border border-yellow-500/30">
                      <div className="text-2xl font-bold text-yellow-400">
                        {freelancerStats?.fiveStarPercentage || '100%'}
                      </div>
                      <div className="text-sm text-gray-400">5-Star Reviews</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/portfolio"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                    className="flex-1">
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                      <span>View Portfolio</span>
                      <FcBriefcase className="text-xl" />
                    </button>
                  </Link>
                  <Link
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                    href="https://www.freelancer.com/u/mdalamin75"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1">
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      <SiFreelancer className="text-xl" />
                      <span>Hire Me</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section id="certifications" className="py-10 md:py-20 snap-start relative bg_pattern2">
          <div className="container mx-auto px-3 md:px-5">
            <div className="certification_head">
              <h1
                className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold pb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-2xl">
                Certifications & Achievements
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay={index * 100}
                  className="certification-card bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border border-gray-700"
                >
                  <h3 className="font-bold text-lg text-purple-400 mb-2">{cert.name}</h3>
                  <p className="font-medium text-gray-300 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mb-2">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded transition-colors duration-300"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;

export async function getServerSideProps({ req }) {
  try {
    // Determine the correct base URL for API calls
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const base = process.env.NODE_ENV === 'production' 
      ? `${protocol}://${host}`
      : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

    console.log('About page - Base URL:', base);

    // Fetch about data
    const response = await fetch(`${base}/api/about`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'About-Page-SSR'
      }
    });
    
    if (!response.ok) throw new Error(`Failed to fetch about data: ${response.status}`);
    
    const data = await response.json();
    const initialData = data?.data || data;

    console.log('About page - Data fetched successfully:', {
      hasData: !!initialData,
      dataKeys: initialData ? Object.keys(initialData) : []
    });

    return { props: { initialData } };
  } catch (error) {
    console.error('About page - Error fetching data:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url
    });
    return { props: { initialData: null } };
  }
}
