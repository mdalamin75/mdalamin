import React from "react";
import Link from "next/link";
import SocialList from "./SocialList";

const Footer = () => {
  return (
    <footer className="footer-wrapper w-full relative mt-16">
      {/* Animated SVG Wave Top Divider */}
      <div className="wave-divider overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path 
            className="fill-purple-600/20"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate 
              attributeName="d" 
              dur="15s" 
              repeatCount="indefinite"
              values="
                M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,165.3C96,171,192,181,288,192C384,203,480,213,576,202.7C672,192,768,160,864,165.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-16 md:h-20 -mt-12 md:-mt-16">
          <path 
            className="fill-purple-600/30"
            d="M0,64L48,80C96,96,192,128,288,154.7C384,181,480,203,576,181.3C672,160,768,96,864,85.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate 
              attributeName="d" 
              dur="20s" 
              repeatCount="indefinite"
              values="
                M0,64L48,80C96,96,192,128,288,154.7C384,181,480,203,576,181.3C672,160,768,96,864,85.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,106.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,64L48,80C96,96,192,128,288,154.7C384,181,480,203,576,181.3C672,160,768,96,864,85.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-12 md:h-16 -mt-8 md:-mt-12">
          <path 
            className="fill-purple-600/50"
            d="M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,122.7C672,149,768,203,864,208C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate 
              attributeName="d" 
              dur="10s" 
              repeatCount="indefinite"
              values="
                M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,122.7C672,149,768,203,864,208C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,90.7C96,85,192,75,288,90.7C384,107,480,149,576,160C672,171,768,149,864,138.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,122.7C672,149,768,203,864,208C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>

      <div className="main_footer px-4 z-30 pt-12 bg-transparent backdrop-blur-md border-t border-purple-500/10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 md:w-40 h-32 md:h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 opacity-10"></div>
        <div className="absolute top-40 right-5 md:right-20 w-40 md:w-60 h-40 md:h-60 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 opacity-10"></div>
        <div className="absolute bottom-10 left-1/4 w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-purple-300 to-purple-600 opacity-10"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid gap-4 md:gap-6">
            <div className="mb-4">
              <h2 className="font-josefin text-center text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-700 to-purple-300 mb-4 md:mb-6">Connect With Me</h2>
              <div className="flex flex-wrap justify-center">
                <SocialList />
              </div>
            </div>
            <div className="menu mb-6 md:mb-8">
              <nav>
                <ul className="flex flex-wrap gap-x-4 md:gap-x-8 justify-center font-bold text-sm md:text-base">
                  <li className="my-1">
                    <Link href="/" className="text-base-content hover:text-purple-600 transition-colors">Home</Link>
                  </li>
                  <li className="my-1">
                    <Link href="/about" className="text-base-content hover:text-purple-600 transition-colors">About</Link>
                  </li>
                  <li className="my-1">
                    <Link href="/portfolio" className="text-base-content hover:text-purple-600 transition-colors">Portfolio</Link>
                  </li>
                  <li className="my-1">
                    <Link href="/service" className="text-base-content hover:text-purple-600 transition-colors">Services</Link>
                  </li>
                  <li className="my-1">
                    <Link href="/contact" className="text-base-content hover:text-purple-600 transition-colors">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <p className="font-titillium text-center py-4 md:py-6 border-t border-purple-200 mt-4 text-sm md:text-base text-base-content">
            Copyright &copy; <span> {new Date().getFullYear()} </span>
            <Link href="https://www.freelancer.com/u/mdalamin75" target="_blank" className="text-primary font-bold">MD. AL AMIN</Link>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
