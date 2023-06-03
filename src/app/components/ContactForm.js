"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend } from "react-icons/fi";
import { Titillium_Web, Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Result = () => {
  return (
    <p className="text-emerald-600">
      Thank you! Your message has been sent successfully. I will contact you
      soon.
    </p>
  );
};
const ContactForm = () => {
  const form = useRef();
  const [result, setResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_boqznr6",
        "template_xc3tr4b",
        form.current,
        "Z-VhunFYAgs4avIIh"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setResult(true);
  };
  //  Hide Result
  setTimeout(() => {
    setResult(false);
  }, 5000);
  return (
    <form ref={form} onSubmit={sendEmail}>
      <h2 className={`${josefin.className} text-3xl capitalize pb-2`}>
        Contact Us
      </h2>
      <p className={`${titillium.className} w-10/12 md:w-9/12 mb-7 text-slate-400`}>
        Let&apos;s make something new, different, and more meaningful or make things
        more visual or conceptual?
      </p>
      <div className="grid">
        <div className="mb-5">
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your Name"
            className={`${titillium.className} w-9/12 p-3 rounded outline-none bg-slate-700/[0.7]`}
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your E-mail"
            className={`${titillium.className} w-9/12 p-3 rounded outline-none bg-slate-700/[0.7]`}
          />
        </div>
        <div className="mb-5">
          <textarea
            rows="10"
            cols="30"
            name="message"
            required
            placeholder="Message"
            className={`${titillium.className} w-9/12 p-3 rounded outline-none bg-slate-700/[0.7]`}></textarea>
        </div>
        <button
          type="submit"
          className="uppercase text-center text-lg font-bold text-white w-1/2 flex gap-x-3 items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg duration-300 shadow-md hover:shadow-orange-600">
          <span>Send</span>
          <FiSend className="text-xl delay-100 duration-500 animate-ping" />
        </button>
      </div>
      <div>{result ? <Result /> : null}</div>
      <br />
    </form>
  );
};

export default ContactForm;
