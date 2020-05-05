import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner-border text-dark"
      style={{
        width: "3rem",
        height: "3rem",
        margin: "auto",
        display: "block",
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
