import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import Link from "next/link";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Contact = () => {
  return (
    <>
      <section id="contact">
        <div className="container">
          <div className="absolute left-[18%] top-10 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
          <div className="contact_head py-16">
            <h1
              className={`${josefin.className} uppercase text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-gray-200 to-orange-600 drop-shadow-2xl`}>
              Contact
            </h1>
            <p className={`${titillium.className} text-center py-3`}>
              Here you will find my all contact information.
              <br />
              Contact me if you have any questions or would like to work
              together.
            </p>
          </div>
          <div className="absolute right-[18%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-800 to-sky-600 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-72 lg:-right-0 lg:h-48 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
          <div className="contact">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="form order-2 md:order-1">
                <ContactForm />
              </div>
              <div className="conatct_svg order-1 md:order-2 mb-10">
                <Image
                  src="/contactPage/contact-us-animate.svg"
                  width={450}
                  height={450}
                  alt="contact_us"
                />
                <h3 className={`${josefin.className} text-3xl font-bold`}>Find me on </h3>
                <hr  className="w-4/12 h-1 bg-blue-500"/>
                <div className="flex gap-x-5 my-5">
                  <Link
                    href="https://www.facebook.com/webmdalamin"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/facebook.png" width={30} height={30} alt="webmdalamin mdalamin md_alamin75" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/md_alamin75"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/instagram.png" width={30} height={30} alt="md_alamin75" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mdalamin75"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/linkedin.png" width={30} height={30} alt="mdalamin75" />
                  </Link>
                  <Link
                    href="https://twitter.com/md_alamin75"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/twitter.png" width={30} height={30} alt="md_alamin75" />
                  </Link>
                  <Link
                    href="https://wa.me/?text=I'm%20interested%20to%20work%20with%20you!"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/whatsapp.png" width={30} height={30} alt="mdalamin75" />
                  </Link>
                  <Link
                    href="https://github.com/mdalamin75"
                    target="_blank"
                    className="animate-pulse duration-500 hover:scale-125 hover:animate-none"
                    >
                    <Image src="/social_icon/github.png" width={30} height={30} alt="mdalamin75" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="demo2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto">
            <defs>
              <path
                id="gentle-wave"
                className="st0"
                d="M-160,35.6 c 30,0,58-6.6,88-6.6 s58,6.6,88,6.6s58-6.6,88-6.6s58,6.6,88,6.6V59h-352V35.6z"></path>
            </defs>
            <g class="parallax">
              <use
                style={{fill:"#c0a4fb",fillOpacity: 1,}}
                xlinkHref="#gentle-wave"
                x="48"
                y="0"></use>
              <use
                style={{fill:"#fff", fillOpacity: 1,}}
                xlinkHref="#gentle-wave"
                x="48"
                y="0"></use>
            </g>
          </svg>
        </div> */}
      </section>
    </>
  );
};

export default Contact;
