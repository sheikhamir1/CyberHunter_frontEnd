import { createContext, useEffect, useState } from "react";

const CreateContext3 = createContext();

const CreateProvider3 = ({ children }) => {
  // all states here
  const [profile, setProfile] = useState([]);
  const [getProfileId, setGetProfileId] = useState("");
  const [getProfileBody, setGetProfileBody] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get your profile");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/fetchprofile`,
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
        setLoading(false); // Hide loading spinner
        console.log("Empty profile");
      }
      if (data.success === true) {
        setLoading(false); // Hide loading spinner
        console.log("Profile fetched");
        setProfile(data.userProfile);
      } else if (data.success === false) {
        setLoading(false); // Hide loading spinner
        console.log("Profile fetched failed");
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner
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
        loading,
        setLoading,
      }}
    >
      {children}
    </CreateContext3.Provider>
  );
};

export { CreateProvider3, CreateContext3 };
