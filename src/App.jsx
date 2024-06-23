// React Hooks
import React from "react";
import { CreateProvider1 } from "./AllContext/ContextOne";
import { CreateProvider2 } from "./AllContext/ContextTwo";
import { CreateProvider3 } from "./AllContext/ContextThree";
// import { CreateProvider4 } from "./UsingContext/ContextFour";
// import { CreateProvider5 } from "./UsingContext/ContextFive";

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// user components
import MyLogin from "./User_Comp/Login_Comp";
import MyRegister from "./User_Comp/Register_Comp";

// blog components
// import CreateBlog from "./BlogPage/CreateBlog";
// import AllBlog from "./BlogPage/AllBlog";
// import UpdateBlog from "./BlogPage/UpdateBlog";
// import SingleBlogPage from "./BlogPage/SingleBlogPage";
// import SinglePublicBlog from "./BlogPage/SinglePublicBlog";

// profile components
// import Profile from "./BlogPage/Profile";
// import EditProfile from "./BlogPage/EditProfile";
// import EditAccount from "./BlogPage/EditAccount";
// import UpdateProfile from "./BlogPage/UpdateProfile";

//other components
import MyNavbar from "./Navbar/Navbar";
import MyHomePage from "./Home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <CreateProvider4> */}
        <CreateProvider1>
          <CreateProvider2>
            {/* <CreateProvider3> */}
            {/* <CreateProvider5> */}
            <MyNavbar />
            <Routes>
              <Route path="/" element={<MyHomePage />} />
              <Route path="/login" element={<MyLogin />} />
              <Route path="/register" element={<MyRegister />} />
              {/* <Route path="/createblog/:id" element={<CreateBlog />} />
              <Route path="/createblog" element={<CreateBlog />} />
              <Route path="/allblog/" element={<AllBlog />} />
              <Route path="/singleblogpage/:id" element={<SingleBlogPage />} />
              <Route
                path="/singlepublicblog/:id"
                element={<SinglePublicBlog />}
              />
              <Route path="/updateblog" element={<UpdateBlog />} />
              <Route path="/updateprofile" element={<UpdateProfile />} />
              <Route path="/editprofile" element={<EditProfile />}></Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/editaccount" element={<EditAccount />} />
              <Route path="/resetpass" element={<ResetPass />} /> */}
            </Routes>
            {/* </CreateProvider5> */}
            {/* </CreateProvider3> */}
          </CreateProvider2>
        </CreateProvider1>
        {/* </CreateProvider4> */}
      </BrowserRouter>
    </>
  );
}

export default App;
