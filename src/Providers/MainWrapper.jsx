"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

const MainWrapper = ({ children }) => {
  const pathname = usePathname();

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboardRoute && <Header />}
      {children}
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

export default MainWrapper;
