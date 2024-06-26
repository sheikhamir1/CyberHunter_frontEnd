import { createContext, useEffect, useState } from "react";

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
      // console.log("this is profile", data);
      if (data.userProfile.length === 0) {
        console.log("Empty profile");
      }
      if (data.success === true) {
        console.log("Profile fetched");
        setProfile(data.userProfile);
      } else if (data.success === false) {
        console.log("Profile fetched failed");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  //   ****************************************************************************************************************************************

  const GetId = (id, body) => {
    setGetProfileId(id);
    setGetProfileBody(body);
  };
  // console.log("this is update profile id ", getProfileId);
  // console.log("this is update profile body ", getProfileBody);

  return (
    <CreateContext3.Provider
      value={{
        profile,
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
        GetId,
        fetchprofile,
      }}
    >
      {children}
    </CreateContext3.Provider>
  );
};

export { CreateProvider3, CreateContext3 };
