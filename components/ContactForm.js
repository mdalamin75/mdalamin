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
    <p className="text-emerald-600 py-2">
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
    <>
    {/* <form
      ref={form}
      onSubmit={sendEmail}
      data-aos="fade-right"
      data-aos-duration="1000">
      <h2 className={`${josefin.className} text-3xl capitalize pb-2`}>
        Contact Us
      </h2>
      <p
        className={`${titillium.className} mb-7 text-slate-400 px-10`}>
        Let&apos;s make something new, different, and more meaningful or make
        things more visual or conceptual?
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
          className="uppercase text-center text-lg font-bold text-white w-1/2 flex gap-x-3 mx-auto items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg duration-300 shadow-md hover:shadow-orange-600">
          <span>Send</span>
          <FiSend className="text-xl delay-100 duration-500 animate-ping" />
        </button>
      </div>
      <div>{result ? <Result /> : null}</div>
      <br />
    </form> */}

    {/* // New design for contact form */}
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
            class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div class="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">

            <div class="text-center pb-6">
                <h1 class="text-3xl">Contact Us!</h1>

                <p class="text-gray-300">
                    Fill up the form below to send us a message.
                </p>
            </div>

            <form>

                <input
                        class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Name" name="name"/>

                <input
                        class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" placeholder="Email" name="email"/>

                <input
                        class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Subject" name="_subject"/>

                <textarea
                        class="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Type your message here..." name="message" style={{height: '121px'}}></textarea>

                <div class="flex justify-between">
                    <input
                        class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit" value="Send ➤"/>
                    <input
                        class="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="reset"/>
                </div>

            </form>
        </div>
    </div>
</div>
    </>
  );
};

export default ContactForm;
