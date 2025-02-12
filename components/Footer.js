import React from "react";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import SocialList from "./SocialList";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Footer = () => {
  return (
    <>
      <footer className="mt-auto relative">
      <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_02"></div>
        {/* <div className="demo2 z-0">
          <div className="bg-base-100 text-base-100">
            <svg
              className="w-full h-32"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto">
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160,35.6 c 30,0,58-6.6,88-6.6 s58,6.6,88,6.6s58-6.6,88-6.6s58,6.6,88,6.6V59h-352V35.6z"></path>
              </defs>
              <g className="parallax">
                <use style={{ fill: "#009688" }} xlinkHref="#gentle-wave" x="48" y="0"></use>
                <use fill="currentColor" xlinkHref="#gentle-wave" x="48" y="0"></use>
              </g>
            </svg>
          </div>
        </div> */}
        <div className="main_footer px-4 z-30 pt-12 ">
          <div className="container mx-auto">
            <div className="grid">
              <div className="flex flex-wrap justify-center">
                <SocialList />
              </div>
              <div className="menu">
                <nav>
                  <ul className="flex flex-wrap gap-x-5 justify-center font-bold">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/portfolio">Portfolio</Link>
                    </li>
                    {/* <li>
                      <Link href="/testimonial">Testimonial</Link>
                    </li> */}
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <p
              className={`${titillium.className} text-center mt-auto py-4`}>
              Copyright &copy; <span> {new Date().getFullYear()} </span>{" "}
              MD. AL AMIN. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
