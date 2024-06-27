import { createContext, useState } from "react";

const CreateContext6 = createContext();

const CreateProvider6 = ({ children }) => {
  // all states here

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  // handle reset password

  const ResetPassword = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Please login to get all blog");
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
        console.log("token sent to mail");
        const serverMSG = data.msg;
        setShowAlert(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        console.log("failed to send token");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      console.log("there is error in reset password token sending", error);
    }
  };

  return (
    <CreateContext6.Provider
      value={{ ResetPassword, show, errorShow, serverMsg, serverError }}
    >
      {children}
    </CreateContext6.Provider>
  );
};
export { CreateProvider6, CreateContext6 };
