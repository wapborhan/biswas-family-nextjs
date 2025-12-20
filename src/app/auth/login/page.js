"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LogIn = () => {
  return (
    <div className="rn-section-gap" style={{ marginTop: "50px" }}>
      <center>
        <button
          type="button"
          className="login-with-google-btn"
          onClick={() => signIn("google")}
        >
          <div className="img"></div>
          Sign in with Google
        </button>
      </center>
    </div>
  );
};

export default LogIn;
