import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AosAnimation from "./components/AosAnimation";
import CursorAnimation from "./components/CursorAnimation";
import TawkMessenger from "./components/TawkMessenger";

export const metadata = {
  title: {
    default: "MD.AL-AMIN",
    template: "%s - MD.AL-AMIN"
  },
  description: "MD.AL-AMIN portfolio website",
  twitter: {
    card: "summary_large_image"
  },
  verification: {
    google: "ukw3LwFvjHV9lmixrpwMYH6gmX3psZHdtCVUZGAHyP4"
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth snap-mandatory">
      <body className={`bg-dark-bg text-white`} suppressHydrationWarning={true}>
        <TawkMessenger />
        <AosAnimation />
        <CursorAnimation />
        <Navbar />
        <main className="snap-mandatory mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
