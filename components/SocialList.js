import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const SocialList = () => {
  return (
    <>
      <div
        className="flex flex-wrap gap-x-5 gap-y-3 justify-center my-5">
        <Link
          href="https://www.facebook.com/mdalaminn75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <Image
            src="/social_icon/facebook.png"
            width={30}
            height={30}
            alt="mdalaminn75 mdalamin md_alamin75"
          />
        </Link>
        <Link
          href="https://www.instagram.com/md_alamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <Image
            src="/social_icon/instagram.png"
            width={30}
            height={30}
            alt="md_alamin75"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/mdalamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <Image
            src="/social_icon/linkedin.png"
            width={30}
            height={30}
            alt="mdalamin75"
          />
        </Link>
        <Link
          href="https://twitter.com/md_alamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <Image
            src="/social_icon/twitter.png"
            width={30}
            height={30}
            alt="md_alamin75"
          />
        </Link>
        <Link
          href="https://wa.me/8801774147147?text=I'm%20interested%20to%20work%20with%20you!"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <Image
            src="/social_icon/whatsapp.png"
            width={30}
            height={30}
            alt="mdalamin75"
          />
        </Link>
        <Link
          href="https://github.com/mdalamin75"
          target="_blank"
          className="animate-pulse duration-500 hover:scale-125 hover:animate-none">
          <FaGithub className="text-3xl" />
        </Link>
      </div>
    </>
  );
};

export default SocialList;
