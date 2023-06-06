"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import CursorAnimation from "./components/CursorAnimation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const metadata = {
  title: "MD.AL-AMIN",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <html lang="en" className="scroll-smooth snap-mandatory">
      <body className={`inter.className bg-dark-bg text-white`} suppressHydrationWarning={true} >
        <CursorAnimation />
        <div className="container mx-auto">
          <Navbar />
          <main className="snap-mandatory">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
