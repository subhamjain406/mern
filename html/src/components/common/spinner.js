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
        left: "50%",
        top: "50%",
        position: "absolute",
        marginLeft: "-2em",
        marginTop: "-2em",
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
