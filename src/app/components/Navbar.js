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
      <header className="bg-dark-bg duration-500 shadow shadow-sky-600 py-2 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-3 md:px-5">
          <nav className="justify-between md:items-center md:flex">
            <div className="flex items-center justify-between py-3 md:block">
              <Link href="/">
                {/* <h2 className={`${bungee.className} text-3xl md:text-4xl py-3`}>MD.AL-AMIN</h2> */}
                <Image src={mdalamin75} className="w-44 h-16"/>
              </Link>
              <button className="md:hidden" onClick={() => setOpen(!open)}>
                {open ? (<AiOutlineClose className="text-3xl text-white cursor-pointer" />) : (<AiOutlineMenu className="text-3xl text-white cursor-pointer" />)}
              </button>
            </div>
            <div className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${open ? 'p-12 md:p-0 block' : 'hidden'
              }`}>

              <ul className="h-screen md:h-auto items-center justify-center md:justify-end md:flex md:gap-x-10 ">
                {Menus.map((menu, index) => (
                  <li key={index} >
                    <Link
                      onClick={() => setOpen(!open)}
                      href={`${menu.src}`}
                      className="has-tooltip text-gray-300 text-lg flex items-center justify-center gap-x-2 cursor-pointer py-7 px-2 md:py-3 hover:bg-slate-600 rounded-md">
                      <span className="text-2xl">{menu.icon}</span>
                      <span className="duration-500 ease">{menu.title}</span>
                      {/* <span className={`${open && "hidden"} tooltip absolute left-16 bg-white text-dark-bg p-2 rounded-md shadow-xl`}>{menu.title}</span> */}
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
