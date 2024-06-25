import { createContext, useEffect, useState } from "react";

const CreateContext4 = createContext();

const CreateProvider4 = ({ children }) => {
  //  all state here
  const [publicBlog, setPublicBlog] = useState([]);

  //   track the states
  const [trackPublicBlog, setTrackPublicBlog] = useState(0);

  //  handle public blog
  // from here
  useEffect(() => {
    PublicBlog();
  }, []);

  useEffect(() => {
    PublicBlog();
  }, [trackPublicBlog]);

  const PublicBlog = async () => {
    const response = await fetch("http://localhost:3000/api/blog/publicblog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log("all Public blog fetched in contextfour", data);
    if (data.success === true) {
      console.log("public blog fetched");
      setPublicBlog(data.data);
    } else if (data.success === false) {
      console.log("public blog fetch failed");
    }
  };

  return (
    <CreateContext4.Provider
      value={{
        publicBlog,
        setTrackPublicBlog,
      }}
    >
      {children}
    </CreateContext4.Provider>
  );
};

export { CreateContext4, CreateProvider4 };
