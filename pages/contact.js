import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import contact from "../public/ContactPage/contact-us-animate.svg";
import SocialList from "../components/SocialList";
import SEO from "../components/SEO";

export const metadata = {
  title: "Contact"
}

const Contact = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const initialLoadComplete = useRef(false);

  useEffect(() => {
    if (!initialLoadComplete.current) {
      initialLoadComplete.current = true;
      const timer = setTimeout(() => {
        setPageLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <SEO 
        title="Contact MD. AL AMIN - Hire a Professional Web Developer"
        description="Get in touch with MD. AL AMIN for your web development needs. Hire an expert developer for your next project or discuss a collaboration opportunity."
        keywords="contact MD. AL AMIN, hire web developer, freelance developer contact, web development services, mdalamin75 contact, professional developer for hire"
        ogImage="/ContactPage/contact-us-animate.svg"
      />

      {/* Structured data for Contact page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact MD. AL AMIN",
            "description": "Get in touch with MD. AL AMIN for web development services",
            "url": "https://mdalamin.com/contact",
            "mainEntity": {
              "@type": "Person",
              "name": "MD. AL AMIN",
              "email": "mdalamiin75@gmail.com",
              "url": "https://mdalamin.com",
              "jobTitle": "Full Stack Web Developer"
            }
          })
        }}
      />
      
      <section id="contact" className="bg_pattern2 pt-32 pb-20">
        <div className="container mx-auto px-3 md:px-5">
          <div className="absolute left-[18%] top-10 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
          <div className="contact_head">
            <h1 className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-300 to-indigo-600 drop-shadow-2xl mt-5">
              Contact
            </h1>
            <p className="font-titillium text-center py-3">
              Here you will find my all contact information.
              <br />
              Contact me if you have any questions or would like to work
              together.
            </p>
          </div>
          <div className="absolute right-[18%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-800 to-sky-600 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-72 lg:-right-0 lg:h-48 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
          <div className="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="form order-2 md:order-1 text-center mx-auto">
                <ContactForm />
              </div>
              <div className="conatct_svg order-1 md:order-2 mx-auto pb-10">
                <Image
                  src={contact}
                  width={350}
                  height={350}
                  alt="contact_us"
                  priority={true}
                />
                <h3
                  className="font-josefin text-3xl font-bold text-center"
                  data-aos="zoom-in"
                  data-aos-duration="1000">
                  Find me on
                </h3>
                <hr
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  className="w-5/12 border-blue-500 border-t-2 mx-auto"
                />
                <div data-aos="fade-left" data-aos-duration="1000">
                  <SocialList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;