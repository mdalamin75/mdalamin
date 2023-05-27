"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
  FcMenu,
  FcBriefcase,
  FcAbout,
  FcHome,
  FcContacts,
} from "react-icons/fc";
import { MdReviews } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

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
      <header
        className={`${
          open ? "w-48" : "w-20"
        } min-h-screen max-h-full bg-dark-bg duration-500 p-5 pt-10 border-r-2 border-r-slate-100 fixed top-0 z-50`}>
        <div className="menuBtn flex items-center gap-x-8 relative">
          <div
            className={`flex gap-x-4 items-center duration-300 ${
              !open && "scale-0"
            }`}>
            {/* <Image
              src="/mdalamin75.png"
              width={30}
              height={30}
              className="rounded-full"
            /> */}
            <h1 className="text-white text-md duration-500 ease">MD.AL-AMIN</h1>
          </div>
          <AiOutlineMenu
            className={`text-2xl text-white cursor-pointer absolute right-1`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <nav>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <li key={index} className="mb-5 relative">
                <Link
                  href={`${menu.src}`}
                  className="has-tooltip text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer py-3 px-2 hover:bg-slate-600 rounded-md">
                  <span className="text-2xl">{menu.icon}</span>
                  <span className={`${!open && "hidden"} duration-500 ease`}>{menu.title}</span>
                  <span className={`${open && "hidden"} tooltip absolute left-16 bg-white text-dark-bg p-2 rounded-md shadow-xl`}>{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
