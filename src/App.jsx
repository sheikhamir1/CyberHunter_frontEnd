// React Hooks
import React from "react";
import { CreateProvider1 } from "./UsingContext/ContextOne";
import { CreateProvider2 } from "./UsingContext/ContextTwo";
import { CreateProvider3 } from "./UsingContext/ContextThree";
import { CreateProvider4 } from "./UsingContext/ContextFour";
import { CreateProvider5 } from "./UsingContext/ContextFive";

// other hooks

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// all components

// user components
import MyLogin from "./User/LoginUser/MyLogin";
import MyRegister from "./User/RegisterUser/MyRegister";

// blog components
import CreateBlog from "./BlogPage/CreateBlog";
import AllBlog from "./BlogPage/AllBlog";
import UpdateBlog from "./BlogPage/UpdateBlog";

// profile components
import Profile from "./BlogPage/Profile";
import EditProfile from "./BlogPage/EditProfile";
import EditAccount from "./BlogPage/EditAccount";

//other components
import MyNavbar from "./HomePage/Nav/MyNavbar";
import MyHomePage from "./HomePage/LandingPage/MyHomePage";
import UpdateProfile from "./BlogPage/UpdateProfile";
import SingleBlogPage from "./BlogPage/SingleBlogPage";
import SinglePublicBlog from "./BlogPage/SinglePublicBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <CreateProvider4>
          <CreateProvider1>
            <CreateProvider2>
              <CreateProvider3>
                <CreateProvider5>
                  <MyNavbar />
                  <Routes>
                    <Route path="/" element={<MyHomePage />} />
                    <Route path="/login" element={<MyLogin />} />
                    <Route path="/register" element={<MyRegister />} />
                    <Route path="/createblog/:id" element={<CreateBlog />} />
                    <Route path="/createblog" element={<CreateBlog />} />
                    <Route path="/allblog/" element={<AllBlog />} />
                    <Route
                      path="/singleblogpage/:id"
                      element={<SingleBlogPage />}
                    />
                    <Route
                      path="/singlepublicblog/:id"
                      element={<SinglePublicBlog />}
                    />
                    <Route path="/updateblog" element={<UpdateBlog />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route
                      path="/editprofile"
                      element={<EditProfile />}
                    ></Route>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/editaccount" element={<EditAccount />} />
                    <Route path="/resetpass" element={<ResetPass />} />
                  </Routes>
                </CreateProvider5>
              </CreateProvider3>
            </CreateProvider2>
          </CreateProvider1>
        </CreateProvider4>
      </BrowserRouter>
    </>
  );
}

export default App;
