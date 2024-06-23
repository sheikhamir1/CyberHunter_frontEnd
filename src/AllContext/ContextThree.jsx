import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContext3 = createContext();

const CreateProvider3 = ({ children }) => {
  // all states here
  const [profile, setProfile] = useState([]);
  const [profilePicture, setProfilePicture] = useState([]);
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
    GetUserProfile();
    GEtImage();
  }, [trackProfile]);

  //   ****************************************************************************************************************************************
  //  handle get all user profile
  // from here

  const GetUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get your profile");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/getuserprofile",
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
        //   setEmptyProfile("your profile Empty please update your profile");
        setTrackUpdateProfile((prev) => prev + 1);
      }

      // console.log("this is data", data.userProfile);
      setProfile(data.userProfile);

      // console.log("this is profile detail", profile);

      // const data = await response.json();
      // setProfile(data.userProfile);
      // window.scrollTo(0, document.body.scrollHeight);

      // console.log("this is detail", data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      // setError(error);
    }
  };

  //   ****************************************************************************************************************************************
  //  handle get all user profile picture
  // from here

  const GEtImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get image");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/getuserprofileimage",
        {
          method: "GET",
          headers: {
            // "Content-Type": "image/jpeg",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 404) {
        console.log("image not found");
      }

      const data = await response.blob();
      const ImageUrl = URL.createObjectURL(data);
      setProfilePicture(ImageUrl);
      console.log("fetched image");

      // console.log("Image URL:", data);
      // console.log("Image URL:", ImageUrl);
    } catch (error) {
      setError(error);
      console.error("Error fetching blog:", error);
    }
  };

  //   ****************************************************************************************************************************************
  //  handle create user profile
  // from here

  const CreateProfile = async (body) => {
    // console.log("this is create profile data in context", body);
    // console.log("this is create profile picture in context", profilePicture);
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to create a profile");
      return;
    }
    const response = await fetch("http://localhost:3000/api/user/userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // console.log("this is create profile", data);

    if (data.success === true) {
      console.log("User Profile created ");
      setTrackProfile((prev) => prev + 1);
      const serverMSG = data.msg;
      setShowAlert(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/allblog");
      }, 3000);
      setServerMsg(serverMSG + " please Wait...");
    } else if (data.success === false) {
      const serverMSG = data.msg;
      setErrorShow(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setErrorShow(false);
      }, 3000);
      setServerError(serverMSG);
    }
  };

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
        profilePicture,
        GetId,
        UpdateProfile,
        CreateProfile,
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
