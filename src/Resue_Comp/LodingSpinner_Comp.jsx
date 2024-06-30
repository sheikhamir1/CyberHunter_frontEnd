// src/Resue_Comp/LoadingSpinner_Comp.jsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./spinner.css";

const LoadingSpinner = ({ loading, size = 30, color = "#5399d5" }) => {
  return (
    <div
      className="sweet-loading"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      <ClipLoader
        size={size}
        color={color}
        loading={loading}
        speedMultiplier={7}
      />
    </div>
  );
};

export default LoadingSpinner;
