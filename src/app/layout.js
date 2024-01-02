import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AosAnimation from "./components/AosAnimation";
import CursorAnimation from "./components/CursorAnimation";
import TawkMessenger from "./components/TawkMessenger";

export const metadata = {
  title: "MD.AL-AMIN",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth snap-mandatory">
      <body className={`bg-dark-bg text-white`} suppressHydrationWarning={true}>
        <TawkMessenger />
        <AosAnimation />
        <CursorAnimation />
        <div className="xl:container xl:mx-auto">
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="snap-mandatory">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
