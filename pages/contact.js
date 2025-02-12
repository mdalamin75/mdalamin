import React from "react";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import contact from "../public/ContactPage/contact-us-animate.svg";
import SocialList from "../components/SocialList";
export const metadata = {
  title: "Contact"
}
const Contact = () => {
  return (
    <>
      <section id="contact" className="bg_pattern2 py-20">
        <div className="container mx-auto px-3 md:px-5">
          <div className="absolute left-[18%] top-10 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
          <div className="contact_head">
            <h1
              className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-300 to-indigo-600 drop-shadow-2xl mt-5">
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
