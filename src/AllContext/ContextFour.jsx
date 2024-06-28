import { createContext, useEffect, useState, useContext } from "react";
import { CreateContext3 } from "./ContextThree";
import { useNavigate } from "react-router-dom";

const CreateContext4 = createContext();

const CreateProvider4 = ({ children }) => {
  const { fetchprofile } = useContext(CreateContext3);
  //  all state here
  const [publicBlog, setPublicBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogCount, setTotalBlogCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    PublicBlog(currentPage);
  }, [currentPage]);
  const limit = 10;

  const [searchResult, setSearchResult] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  //   track the states
  const [trackPublicBlog, setTrackPublicBlog] = useState(0);
  const [trackUpdateEmail, setTrackUpdateEmail] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    PublicBlog();
  }, []);

  useEffect(() => {
    PublicBlog();
  }, [trackPublicBlog]);

  useEffect(() => {
    fetchprofile();
  }, [trackUpdateEmail]);

  //  handle public blog
  // from here
  const PublicBlog = async (page) => {
    const response = await fetch(
      `http://localhost:3000/api/blog/publicblog?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("all Public blog fetched in contextfour", data);
    if (data.success === true) {
      console.log("public blog fetched");
      setPublicBlog(data.data);
      setCurrentPage(data.page);
      setPageCount(data.pages);
      setTotalBlogCount(data.total);
    } else if (data.success === false) {
      console.log("public blog fetch failed");
    }
  };

  // update email handle here

  const updateEmail = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/user/update`, {
        method: "PUT", // or 'PUT' if that is what your backend expects
        headers: {
          "Content-Type": "application/json",
          "Auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
        }),
      });
      const userEmailData = await response.json();
      console.log("userEmailData", userEmailData);
      if (userEmailData.success === true) {
        console.log("Email updated");
        setTrackUpdateEmail((prev) => prev + 1);
        const serverMSG = userEmailData.msg;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/profile");
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (userEmailData.success === false) {
        console.log("Email update failed");
        const serverMSG = userEmailData.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // search handle here

  const Search = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Fetch blog again");
      return;
    }
    setUserSearch(data);

    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/search?query=${data}`,
        {
          method: "GET", // or 'PUT' if that is what your backend expects
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const searchData = await response.json();
      // console.log("searchData", searchData);
      if (searchData.success === true) {
        console.log("Fetch Search result");
        setSearchResult(searchData.data);
        navigate("/Search_Comp");
      } else if (searchData.success === false) {
        console.log("search blog fetch failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <CreateContext4.Provider
      value={{
        publicBlog,
        setTrackPublicBlog,
        updateEmail,
        show,
        errorShow,
        serverMsg,
        serverError,
        Search,
        searchResult,
        userSearch,
        setCurrentPage,
        pageCount,
      }}
    >
      {children}
    </CreateContext4.Provider>
  );
};

export { CreateContext4, CreateProvider4 };
