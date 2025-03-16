"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isDesktop, setIsDesktop] = useState(false);
  const Menus = [
    {
      src: "/",
      title: "Home",
    },
    {
      src: "/about",
      title: "About",
    },
    {
      src: "/portfolio",
      title: "Portfolio",
    },
    {
      src: "/service",
      title: "Services",
    },
    {
      src: "/contact",
      title: "Contact",
    },
  ];

  // Check if we're on desktop - only runs on client side
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme Handler
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    setTheme(e.target.checked ? "night" : "light");
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.9 }
  };

  return (
    <>
      <header className="bg-white/10 border border-white/20 backdrop-blur-md duration-500 shadow shadow-sky-600 py-2 fixed top-0 left-0 w-screen z-50">
        <div className="container mx-auto px-3 md:px-5">
          <nav className="justify-between lg:items-center lg:flex">
            <div className="flex items-center justify-between p-3 lg:block">
              <Link href="/">
                <h1>
                  <div className="text-rotate text-2xl uppercase font-bold">
                    <span>m</span>
                    <span>d</span>
                    <span>.</span>
                    <span className="ml-1">a</span>
                    <span>l</span>
                    <span className="ml-1">a</span>
                    <span>m</span>
                    <span>i</span>
                    <span>n</span>
                  </div>
                </h1>
              </Link>
              <motion.button 
                className="lg:hidden"
                onClick={() => setOpen(!open)}
                variants={buttonVariants}
                initial="initial"
                whileTap="tap"
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineClose className="text-3xl text-base-content cursor-pointer" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineMenu className="text-3xl text-base-content cursor-pointer" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <AnimatePresence>
              {(open || isDesktop) && (
                <motion.div
                  className={`flex-1 justify-self-center pb-3 lg:block lg:pb-0 lg:mt-0 ${
                    open
                      ? "p-12 lg:p-0 block bg-base-100/80 lg:bg-base-100/0 w-screen text-base-content"
                      : "hidden lg:block"
                  }`}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  <ul className="h-screen lg:h-auto flex items-center justify-start flex-col gap-x-12 lg:flex-row lg:justify-end lg:gap-x-10">
                    {Menus.map((menu, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                      >
                        <Link
                          onClick={() => setOpen(!open)}
                          href={`${menu.src}`}
                          className="has-tooltip text-2xl lg:text-lg font-titillium font-bold flex items-center justify-center cursor-pointer py-7 px-2 lg:py-3"
                        >
                          <span className="duration-500 ease">{menu.title}</span>
                        </Link>
                      </motion.li>
                    ))}
                    <motion.div variants={itemVariants}>
                      <label className="swap swap-rotate align-middle justify-items-center">
                        <input
                          type="checkbox"
                          onChange={handleTheme}
                          checked={theme === "light" ? false : true}
                        />
                        <svg
                          className="swap-on h-8 w-8 fill-current text-base-content"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                          className="swap-off h-8 w-8 fill-current text-base-content"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                    </motion.div>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
