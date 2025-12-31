import React from "react";
import SideBar from "./SideBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({ children }) => {
  return (
    <>
      <SideBar />
      <main className="page-wrapper-two" style={{ padding: "0 20px" }}>
        {/* <Header /> */}
        {children}
        <Footer />
      </main>
    </>
  );
};

export default layout;
