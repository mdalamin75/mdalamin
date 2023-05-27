"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import AnimatedCursor from "react-animated-cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MD.AL-AMIN",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth snap-mandatory">
      <body className={`inter.className bg-dark-bg text-white`}>
        <AnimatedCursor
          innerSize={8}
          outerSize={50}
          color="255, 255, 255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={2}
          outerStyle={{
            backgroundColor: "transparent",
            border: '2px solid orange',
            mixBlendMode: "difference",
          }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
            "svg",
          ]}
        />
        <div className="container mx-auto">
          <Navbar />
          <main className="snap-mandatory">
            {children}
          </main>
            {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
