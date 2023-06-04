import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
// import CursorAnimation from "./components/CursorAnimation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MD.AL-AMIN",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
    return (
      <html lang="en" className="scroll-smooth snap-mandatory">
        <body className={`inter.className bg-dark-bg text-white`}>
          {/* <CursorAnimation /> */}
          <div className="container mx-auto">
            <Navbar />
            <main className="snap-mandatory">{children}</main>
            {/* <Footer /> */}
          </div>
        </body>
      </html>
    );
}
