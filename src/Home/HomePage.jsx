import React from "react";
import PublicBlogs from "../Blog_comp/FetchPublicBlogs";
// import Title from "./Title";

function MyHomePage() {
  return (
    <>
      {" "}
      <h5 style={{ textAlign: "center" }}>
        this site is under development feel free to use it, if found any bug or
        problem please contact us
      </h5>
      <PublicBlogs />
    </>
  );
}

export default MyHomePage;
