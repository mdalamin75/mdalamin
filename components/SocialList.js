import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookSquare, FaRegEnvelope  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialList = () => {
  return (
    <>
      <div
        className="flex flex-wrap gap-x-5 gap-y-3 justify-center my-5">
        <Link
          href="https://www.facebook.com/mdalaminn75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaFacebookSquare className="text-3xl" />
        </Link>
        <Link
          href="https://www.instagram.com/md_alamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaInstagram className="text-3xl" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/mdalamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaLinkedinIn className="text-3xl" />
        </Link>
        <Link
          href="https://twitter.com/md_alamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaXTwitter className="text-3xl" />
        </Link>
        <Link
          href="https://wa.me/8801774147147?text=I'm%20interested%20to%20work%20with%20you!"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaWhatsapp className="text-3xl" />
        </Link>
        <Link
          href="https://github.com/mdalamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaGithub className="text-3xl" />
        </Link>
        <Link
          href="mailto:mdalamiin75@gmail.com"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaRegEnvelope  className="text-3xl" />
        </Link>
      </div>
    </>
  );
};

export default SocialList;
