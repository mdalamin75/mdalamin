"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Result = () => {
  return (
    <p className="text-slate-200 font-titillium py-2">
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
      <div class="py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto" 
              data-aos="zoom-in"
              data-aos-duration="1000">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
          <div class="text-white relative px-16 py-10 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-3xl">
            <div class="text-center pb-6">
              <h1 class="text-3xl font-josefin">Contact Us!</h1>

              <p class="text-gray-100 font-titillium">
                Let's make something new, different, and more meaningful or make
                things more visual or conceptual?
              </p>
            </div>

            <form ref={form}
              onSubmit={sendEmail}>
              <input
                class="mb-4 appearance-none border rounded bg-gray-300 bg-opacity-20 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-200"
                type="text"
                placeholder="Name"
                name="name"
              />

              <input
                class="bg-gray-300 bg-opacity-20 mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-200"
                type="email"
                placeholder="Email"
                name="email"
              />

              <input
                class="bg-gray-300 bg-opacity-20 mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-200"
                type="text"
                placeholder="Subject"
                name="_subject"
              />

              <textarea
                class="bg-gray-400 bg-opacity-25 mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-200"
                type="text"
                placeholder="Type your message here..."
                name="message"
                style={{ height: "121px" }}></textarea>

              <div class="flex justify-between">
                <input
                  class="shadow button button--nina bg-gradient-to-r from-purple-700 to-purple-500 hover:from-blue-600 hover:to-blue-800  relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden px-5 text-whitexfocus:shadow-outline"
                  data-text="Send"
                  type="submit"
                  value="Send ➤"
                />

                <input
                  class="shadow bg-purple-600 hover:bg-purple-900 text-white font-josefin border-2 rounded-lg font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                  type="reset"
                />
              </div>
            </form>
            <div>{result ? <Result /> : null}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
