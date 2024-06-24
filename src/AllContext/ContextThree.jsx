import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContext3 = createContext();

const CreateProvider3 = ({ children }) => {
  // all states here
  const [profile, setProfile] = useState([]);
  const [getProfileId, setGetProfileId] = useState("");
  const [getProfileBody, setGetProfileBody] = useState({});

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  //   all tracking states
  const [trackProfile, setTrackProfile] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchprofile();
  }, [trackProfile]);

  // ****************************************************************************************************************************************
  //  handle get all user profile
  // from here

  const fetchprofile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get your profile");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/fetchprofile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (data.userProfile.length === 0) {
        console.log("Empty profile");
        setTrackUpdateProfile((prev) => prev + 1);
      }
      setProfile(data.userProfile);
      // console.log("this is profile", profile);
    } catch (error) {
      console.error("Error fetching blog:", error);
      // setError(error);
    }
  };

  //   ****************************************************************************************************************************************
  //  handle create user profile
  // from here

  // const CreateProfile = async (body) => {
  //   // console.log("this is create profile data in context", body);
  //   // console.log("this is create profile picture in context", profilePicture);
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.warn("Please login to create a profile");
  //     return;
  //   }
  //   const response = await fetch(
  //     "http://localhost:3000/api/user/Createprofile",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Auth-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify(body),
  //     }
  //   );
  //   const data = await response.json();
  //   // console.log("this is create profile", data);

  //   if (data.success === true) {
  //     console.log("User Profile created ");
  //     setTrackProfile((prev) => prev + 1);
  //     const serverMSG = data.msg;
  //     setShowAlert(true);
  //     window.scrollTo(0, 0);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       navigate("/allblog");
  //     }, 3000);
  //     setServerMsg(serverMSG + " please Wait...");
  //   } else if (data.success === false) {
  //     const serverMSG = data.msg;
  //     setErrorShow(true);
  //     window.scrollTo(0, 0);
  //     setTimeout(() => {
  //       setErrorShow(false);
  //     }, 3000);
  //     setServerError(serverMSG);
  //   }
  // };

  //   ****************************************************************************************************************************************
  //  handle Update user profile
  // from here

  // getting profile id

  const GetId = (id, body) => {
    setGetProfileId(id);
    setGetProfileBody(body);
  };

  //   console.log("this is update profile id ", getProfileId);
  //   console.log("this is update profile body ", getProfileBody);

  const UpdateProfile = async (updateBody) => {
    // console.log("this is update profile data in context", updateBody);
    // console.log("this is update profile picture in context", picture);
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to Update a profile");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/user/userprofileupdate/${getProfileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updateBody),
      }
    );
    const data = await response.json();
    // console.log("this is update profile result", data);

    if (data.success === true) {
      console.log("User Profile updated ");
      setTrackProfile((prev) => prev + 1);
      const serverMSG = data.msg;
      setShowAlert(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/profile");
      }, 3000);
      setServerMsg(serverMSG + " please Wait...");
    } else if (data.success === false) {
      setErrorShow(true);
      setTimeout(() => {
        setErrorShow(false);
      }, 3000);
      setServerError("something went wrong, please try again");
    }
  };

  return (
    <CreateContext3.Provider
      value={{
        profile,
        GetId,
        UpdateProfile,
        setShowAlert,
        show,
        errorShow,
        serverMsg,
        serverError,
        getProfileId,
        getProfileBody,
        setTrackProfile,
        setServerMsg,
        setServerError,
        setErrorShow,
      }}
    >
      {children}
    </CreateContext3.Provider>
  );
};

export { CreateProvider3, CreateContext3 };
