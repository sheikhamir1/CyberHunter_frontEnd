// src/Resue_Comp/LoadingSpinner_Comp.jsx
import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "./spinner.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = ({
  loading,
  size = 50,
  color = "#123abc",
  customCss,
}) => {
  return (
    <div
      className="sweet-loading"
      css={[
        css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        `,
        customCss,
      ]}
    >
      <ClipLoader css={override} size={size} color={color} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
