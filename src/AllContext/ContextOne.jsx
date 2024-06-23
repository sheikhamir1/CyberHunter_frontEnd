// react hooks
import { createContext, useEffect, useState } from "react";

const CreateContext1 = createContext();

const CreateProvider1 = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  // Logout Functionality and login functionality with toggle

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const Login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <CreateContext1.Provider
      value={{
        isLoggedIn,
        logout,
        Login,
        show,
        setShow,
      }}
    >
      {children}
    </CreateContext1.Provider>
  );
};

// imp you should export both CreateProvider1 and CreateContext1 and when export is not defaule use {} this when import
// in main.js use createProvider1 and wrap you main.js
// in the applictaion when you want to use usecontext import {CreateContext1}

export { CreateContext1, CreateProvider1 };
