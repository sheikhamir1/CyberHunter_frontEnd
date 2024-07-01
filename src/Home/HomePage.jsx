import React from "react";
import PublicBlogs from "../Blog_comp/FetchPublicBlogs";
import FetchBlogsCategory_Route from "../Blog_comp/FetchBlogsCategory_Route";
import HomePageContent_Comp from "./HomePageContent_Comp";
// import Title from "./Title";

function MyHomePage() {
  return (
    <>
      {" "}
      <HomePageContent_Comp />
      <h5 style={{ textAlign: "center" }}>
        this site is under development feel free to use it, if found any bug or
        problem please report us
      </h5>
      <FetchBlogsCategory_Route />
      <PublicBlogs />
    </>
  );
}

export default MyHomePage;
