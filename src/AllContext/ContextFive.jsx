import { createContext, useEffect, useState, useContext } from "react";
import { CreateContext2 } from "./ContextTwo";
import { CreateContext4 } from "./ContextFour";

const CreateContext5 = createContext();

const CreateProvider5 = ({ children }) => {
  const { setTrackAllBlog } = useContext(CreateContext2);
  const { setTrackPublicBlog } = useContext(CreateContext4);

  // tracking the states

  // like post
  // handle form here
  const likePost = async (postID) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/blog/${postID}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postID: postID,
        }),
      }
    );
    const data = await response.json();
    console.log("like data", data.data);
    if (data.success === true) {
      setTrackAllBlog((prev) => prev + 1);
      setTrackPublicBlog((prev) => prev + 1);
    } else {
      setTrackAllBlog((prev) => prev + 1);
      setTrackPublicBlog((prev) => prev + 1);
      console.error("Error liking the post:", data.msg);
    }
  };

  // dislike post
  //  handle from here

  const dislikePost = async (postID) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/blog/${postID}/dislike`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          postID: postID,
        }),
      }
    );
    const data = await response.json();
    console.log("Dislike data", data.data);
    if (data.success === true) {
      setTrackAllBlog((prev) => prev + 1);
      setTrackPublicBlog((prev) => prev + 1);
    } else {
      console.error("Error liking the post:", data.msg);
      setTrackAllBlog((prev) => prev + 1);
      setTrackPublicBlog((prev) => prev + 1);
    }
  };

  // comment post
  // handle from here

  const CommentPost = async (postID, content) => {
    // console.log("this is comment body", commentBody);
    // console.log("this is id comment", postID);

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/blog/${postID}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          content,
        }),
      }
    );
    const data = await response.json();
    // console.log("comment data", data);
    // if (data.success === true) {
    //   // setTrackAllBlog((prev) => prev + 1);
    //   // setTrackPublicBlog((prev) => prev + 1);
    // } else {
    //   console.error("Error liking the post:", data.msg);
    //   setTrackAllBlog((prev) => prev + 1);
    //   setTrackPublicBlog((prev) => prev + 1);
    // }
  };

  // edit comment here

  const handleEdit = async (id, content) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/blog/${id}/edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        content,
      }),
    });
    const data = await response.json();
    console.log("Edit comment data", data);
    // if (data.success === true) {
    //   // setTrackAllBlog((prev) => prev + 1);
    //   // setTrackPublicBlog((prev) => prev + 1);
    // } else {
    //   console.error("Error liking the post:", data.msg);
    //   setTrackAllBlog((prev) => prev + 1);
    //   setTrackPublicBlog((prev) => prev + 1);
    // }
  };

  return (
    <CreateContext5.Provider value={{ likePost, dislikePost, CommentPost }}>
      {children}
    </CreateContext5.Provider>
  );
};

export { CreateContext5, CreateProvider5 };
