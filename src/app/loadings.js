import React from "react";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#ecf0f3",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <div
        className="spinner-border"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
