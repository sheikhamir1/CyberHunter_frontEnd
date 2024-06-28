// all hooks
import { createContext, useState, useContext, useEffect } from "react";
import { CreateContext1 } from "./ContextOne";

// libraries
import { useNavigate } from "react-router-dom";

// create context

const CreateContext6 = createContext();

const CreateProvider6 = ({ children }) => {
  const { setIsLoggedIn } = useContext(CreateContext1);
  // all states here
  const [loading, setLoading] = useState(false);
  const [AllblogCategory, setAllBlogCategory] = useState([]);

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  // handle reset password

  const ResetPassword = async (email) => {
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to reset password");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      //   console.log("reset password", data);
      if (data.success === true) {
        setLoading(false); // Hide loading spinner
        console.log("token sent to mail");
        const serverMSG = data.msg;
        setShowAlert(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner
        console.log("failed to send token");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner
      console.log("there is error in reset password token sending", error);
    }
  };

  // handle update password
  const UpdatePassword = async (password, confirmPassword, tokenid) => {
    setLoading(true); // Show loading spinner

    // console.log("this is token id", tokenid);
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get update password");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/reset-password/${tokenid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );
      const data = await response.json();
      // console.log("update password", data);
      if (data.success === true) {
        setLoading(false); // Hide loading spinner
        console.log("password updated");
        const serverMSG = data.msg;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/login");
        }, 3000);
        setServerMsg(serverMSG);
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner
        console.log("failed to update password");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner
      console.log("there is error in update password", error);
    }
  };

  // *****************************************************************************************************************
  // fetch all blogs by categorys

  useEffect(() => {
    // BlogsCategory();
  }, []);

  const BlogsCategory = async (category) => {
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get all blogs");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/blogsbycategory/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("blogs by category", data);
      if (data.success === true) {
        setLoading(false); // Hide loading spinner
        setAllBlogCategory(data.data);
        console.log("blogs category fetched");
        const serverMSG = data.msg;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setServerMsg(serverMSG);
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner
        console.log("failed to fetch all blogs");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner
      console.log("there is error in fetch all blogs by category", error);
    }
  };

  return (
    <CreateContext6.Provider
      value={{
        ResetPassword,
        show,
        errorShow,
        serverMsg,
        serverError,
        UpdatePassword,
        loading,
        BlogsCategory,
        AllblogCategory,
      }}
    >
      {children}
    </CreateContext6.Provider>
  );
};
export { CreateProvider6, CreateContext6 };
