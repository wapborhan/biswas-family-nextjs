"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const LogIn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google");
  };

  return (
    <div className="rn-section-gap" style={{ marginTop: "50px" }}>
      <center>
        <h2 className="text-black">স্বাগতম</h2>
        <p>অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন।</p>

        <button
          type="button"
          className="login-with-google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <div className="img"></div>
          {loading ? "লোড হচ্ছে..." : "গুগল দিয়ে সাইন ইন করুন"}
        </button>

        <p className="description" style={{ marginTop: "40px" }}>
          চালিয়ে যেতে ক্লিক করে, আপনি আমাদের{" "}
          <Link style={{ color: "#878e99" }} href="#">
            পরিষেবার শর্তাবলী
          </Link>{" "}
          এবং{" "}
          <Link style={{ color: "#878e99" }} href="#">
            গোপনীয়তা
          </Link>{" "}
          নীতিতে সম্মত হচ্ছেন।
        </p>
      </center>
    </div>
  );
};

export default LogIn;
