import { Montserrat, Poppins, Hind_Siliguri } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/styles.min.css";
import "@/assets/css/custom.css";
import { siteMetadata } from "./metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${hindSiliguri.variable} antialiased template-color-1 spybody white-version`}
      >
        <Header />
        {children} <Footer />
      </body>
    </html>
  );
}
