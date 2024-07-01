import { createContext, useEffect, useState, useContext } from "react";
import { CreateContext2 } from "./ContextTwo";
import { CreateContext4 } from "./ContextFour";

const CreateContext5 = createContext();

const CreateProvider5 = ({ children }) => {
  const { setTrackAllBlog, GetAllBlog } = useContext(CreateContext2);
  const { setTrackPublicBlog } = useContext(CreateContext4);

  // all states here
  const [loading, setLoading] = useState(false);
  const [commentLoding, setCommentLoding] = useState(false);
  const [editcommentLoding, setEditcommentLoding] = useState(false);
  const [deletecommentLoding, setDeletecommentLoding] = useState(false);

  // like post
  // handle form here
  const likePost = async (postID) => {
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${postID}/likepost`,
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
      // console.log("like data", data.data);
      if (data.success === true) {
        console.log("post liked");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);

        await GetAllBlog();
        setLoading(false); // Hide loading spinner
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner

        console.log("post not liked");
        console.error("Error liking the post:", data.msg);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner

      console.error("Error liking the post:", error);
    }
  };

  // dislike post
  //  handle from here

  const dislikePost = async (postID) => {
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${postID}/dislikepost`,
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
      // console.log("Dislike data", data.data);
      if (data.success === true) {
        console.log("post disliked");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);

        await GetAllBlog();
        setLoading(false); // Hide loading spinner
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner

        console.log("post not disliked");
        console.error("Error liking the post:", data.msg);
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner

      console.error("Error dislikeing the post:", error);
    }
  };

  // comment post
  // handle from here

  const CommentPost = async (postID, comment) => {
    setCommentLoding(true); // Show loading spinner

    // console.log("this is comment body", commentBody);
    // console.log("this is id comment", postID);

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${postID}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );
      const data = await response.json();
      // console.log("comment data", data);
      if (data.success === true) {
        setCommentLoding(false); // Hide loading spinner

        console.log("comment posted");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
      } else if (data.success === false) {
        setCommentLoding(false); // Hide loading spinner

        console.log("post Comment failed");
        console.error("Error liking the post:", data.msg);
      }
    } catch (error) {
      setCommentLoding(false); // Hide loading spinner

      console.error("Error commenting the post:", error);
    }
  };

  // edit comment here

  const handleEdit = async (id, comment) => {
    setEditcommentLoding(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}/editcomment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );
      const data = await response.json();
      // console.log("Edit comment data", data);
      if (data.success === true) {
        setEditcommentLoding(false); // Hide loading spinner

        console.log("comment Updated");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
      } else if (data.success === false) {
        setEditcommentLoding(false); // Hide loading spinner

        console.log("update Comment failed");
        console.error("Error liking the post:", data.msg);
      }
    } catch (error) {
      setEditcommentLoding(false); // Hide loading spinner

      console.error("Error updaeting the comment:", error);
    }
  };

  // handle delete comment here

  const DeleteComment = async (commentId) => {
    setDeletecommentLoding(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${commentId}/deletecomment`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            commentId,
          }),
        }
      );
      const data = await response.json();
      // console.log("Delete comment data", data);
      if (data.success === true) {
        setDeletecommentLoding(false); // Hide loading spinner

        console.log("comment Deleted");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
      } else if (data.success === false) {
        setDeletecommentLoding(false); // Hide loading spinner

        console.log("delete Comment failed");
        console.error("Error liking the post:", data.msg);
      }
    } catch (error) {
      setDeletecommentLoding(false); // Hide loading spinner

      console.error("Error deleting the comment:", error);
    }
  };

  return (
    <CreateContext5.Provider
      value={{
        likePost,
        dislikePost,
        CommentPost,
        handleEdit,
        DeleteComment,
        loading,
        commentLoding,
        editcommentLoding,
        deletecommentLoding,
      }}
    >
      {children}
    </CreateContext5.Provider>
  );
};

export { CreateContext5, CreateProvider5 };
