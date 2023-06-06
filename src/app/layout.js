import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AosAnimation from "./components/AosAnimation";
import CursorAnimation from "./components/CursorAnimation";

export const metadata = {
  title: "MD.AL-AMIN",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth snap-mandatory">
      <body className={`bg-dark-bg text-white`} suppressHydrationWarning={true}>
        <AosAnimation />
        <CursorAnimation />
        <div className="container mx-auto">
          <Navbar />
          <main className="snap-mandatory">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
