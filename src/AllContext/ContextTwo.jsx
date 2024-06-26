import { createContext, useEffect, useState, useContext } from "react";
import { get } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateContext4 } from "./ContextFour";

const CreateContext2 = createContext();

const CreateProvider2 = ({ children }) => {
  const { setTrackPublicBlog } = useContext(CreateContext4);

  // all states here
  const [allBlog, setAllBlog] = useState([]);
  const [UpdateBlogId, setUpdateBlogId] = useState("");
  const [updateBlogBody, setUpdateBlogBody] = useState({});
  const [allPrivateBlog, setAllPrivateBlog] = useState([]);

  // tracking the states
  const [trackAllBlog, setTrackAllBlog] = useState(0);

  // *************************************************************************************************************************************************************************************************************************************************************************
  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  // using nagivation for redirecting
  const navigate = useNavigate();

  // *************************************************************************************************************************************************************************************************************************************************************************
  // Handle Get all blog
  // from here
  const GetAllBlog = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get all blog");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/fetchblogs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("all blog ", data);
      if (data.success === true) {
        console.log("All blog fetched");
        setAllBlog(data.data);
      } else if (data.success === false) {
        console.log("All blog fetch failed");
      }
    } catch (error) {
      console.log("there is no blog found", error);
    }
  };

  // ****************************************************************************************************************************
  // get Private blogs
  // from here

  const getPrivateBlog = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get all blog");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/blog/privetblog",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("all private blog fetched", data);
      if (data.success === true) {
        console.log("private blog fetched");
        setAllPrivateBlog(data.privetBlog);
      } else if (data.success === false) {
        console.log("private blog fetch failed");
      }
    } catch (error) {
      console.log("there is no blog found", error);
    }
  };

  useEffect(() => {
    getPrivateBlog();
  }, []);

  //******************************************************************************************************************************************************************************************************************************************************************
  // Handle Create blog
  // from here

  const CreateBlog = async (blogBody) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to create a blog");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/blog/createblog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(blogBody),
        }
      );
      const data = await response.json();
      // console.log("this is create blog", data);
      if (data.success === true) {
        console.log("blog created");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
        const serverMSG = data.msg;
        setShowAlert(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/allblog"); // Navigate to all blogs after creation
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        console.log("blog creation failed");
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError("something went wrong please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ******************************************************************************************************************************************************************************************************************************************************************
  // Handle Update blog
  // from here
  // imp getting id to perfome update
  const GetBlogId = (id, boldBody) => {
    setUpdateBlogId(id);
    setUpdateBlogBody(boldBody);
  };

  const handleUpdateBlog = async (blogBody) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to update a blog");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/updateblog/${UpdateBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(blogBody),
        }
      );
      const data = await response.json();
      // console.log("this is update blog", data);
      if (data.success === true) {
        console.log("blog updated");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
        const serverMSG = data.msg;
        setShowAlert(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/allblog");
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        console.log("blog updated failed");
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError("something went wrong please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ******************************************************************************************************************************************************************************************************************************************************************
  // Handle Delete blog
  // from here

  const DeleteBlog = async (Id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to delete a blog");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/deleteblog/${Id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("this is delete blog", data);
      if (data.success === true) {
        console.log("blog deleted");
        setTrackAllBlog((prev) => prev + 1);
        setTrackPublicBlog((prev) => prev + 1);
        const serverMSG = data.msg;
        setShowAlert(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/allblog");
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        console.log("blog deleted failed");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setup rendering

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      GetAllBlog();
      // console.log("fetching all blog when user is login");
    }
  }, []);

  useEffect(() => {
    GetAllBlog();
    getPrivateBlog();
  }, [trackAllBlog]);

  return (
    <CreateContext2.Provider
      value={{
        allBlog,
        setTrackAllBlog,
        CreateBlog,
        show,
        errorShow,
        serverMsg,
        setServerMsg,
        serverError,
        handleUpdateBlog,
        UpdateBlogId,
        updateBlogBody,
        GetBlogId,
        DeleteBlog,
        getPrivateBlog,
        allPrivateBlog,
        setShowAlert,
      }}
    >
      {children}
    </CreateContext2.Provider>
  );
};
// imp you should export both CreateProvider1 and CreateContext1 and when export is not defaule use {} this when import
// in main.js use createProvider1 and wrap you main.js
// in the applictaion when you want to use usecontext import {CreateContext1}
export { CreateProvider2, CreateContext2 };
