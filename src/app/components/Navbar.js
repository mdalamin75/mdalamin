"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import mdalamin75 from "../../../public/mdalamin75.png";
import {
  FcMenu,
  FcBriefcase,
  FcAbout,
  FcHome,
  FcContacts,
} from "react-icons/fc";
import { MdReviews } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    {
      src: "/",
      title: "Home",
      icon: <FcHome />,
    },
    {
      src: "/about",
      title: "About",
      icon: <FcAbout />,
    },
    {
      src: "/portfolio",
      title: "Portfolio",
      icon: <FcBriefcase />,
    },
    {
      src: "/testimonial",
      title: "Testimonial",
      icon: <MdReviews />,
    },
    {
      src: "/contact",
      title: "Contact",
      icon: <FcContacts />,
    },
  ];
  return (
    <>
      <header className="bg-dark-bg duration-500 shadow shadow-sky-600 py-2 fixed top-0 left-0 w-screen z-50">
        <div className="container mx-auto px-3 md:px-5">
          <nav className="justify-between lg:items-center lg:flex">
            <div className="flex items-center justify-between py-3 lg:block">
              <Link href="/">
                <Image src={mdalamin75} alt="logo" priority="true" className="w-36 h-14 lg:w-44 lg:h-16"/>
              </Link>
              <button className="lg:hidden" onClick={() => setOpen(!open)}>
                {open ? (<AiOutlineClose className="text-3xl text-white cursor-pointer" />) : (<AiOutlineMenu className="text-3xl text-white cursor-pointer" />)}
              </button>
            </div>
            <div className={`flex-1 justify-self-center pb-3 lg:block lg:pb-0 lg:mt-0 ${open ? 'p-12 lg:p-0 block' : 'hidden'
              }`}>

              <ul className="h-screen lg:h-auto items-center justify-center lg:justify-end lg:flex lg:gap-x-10 ">
                {Menus.map((menu, index) => (
                  <li key={index} >
                    <Link
                      onClick={() => setOpen(!open)}
                      href={`${menu.src}`}
                      className="has-tooltip text-gray-300 text-lg flex items-center justify-center gap-x-2 cursor-pointer py-7 px-2 lg:py-3 hover:bg-slate-600 rounded-md">
                      <span className="text-2xl">{menu.icon}</span>
                      <span className="duration-500 ease">{menu.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
