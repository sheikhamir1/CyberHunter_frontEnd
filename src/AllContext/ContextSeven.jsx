import { createContext, useEffect, useState } from "react";

const CreateContext7 = createContext();

const CreateProvider7 = ({ children }) => {
  // all states here
  const [loading, setLoading] = useState(false);

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const PostFeedBack = async (feedback) => {
    setLoading(true); // Show loading spinner

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to post feedback");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            feedback,
          }),
        }
      );
      const data = await response.json();
      //   console.log("result feedback", data);
      if (data.success === true) {
        setLoading(false); // Hide loading spinner
        console.log("Feedback posted");
        const serverMSG = data.msg;
        window.scrollTo(0, 0);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else {
        setLoading(false); // Hide loading spinner
        console.log("Feedback not posted");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner

      console.log(error);
    }
  };

  return (
    <CreateContext7.Provider
      value={{ PostFeedBack, show, errorShow, serverMsg, serverError, loading }}
    >
      {children}
    </CreateContext7.Provider>
  );
};

export { CreateContext7, CreateProvider7 };
