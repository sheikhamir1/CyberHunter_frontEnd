// React Hooks
import React from "react";
import { CreateProvider1 } from "./AllContext/ContextOne";
import { CreateProvider2 } from "./AllContext/ContextTwo";
import { CreateProvider3 } from "./AllContext/ContextThree";
import { CreateProvider4 } from ".//AllContext/ContextFour";
import { CreateProvider5 } from "./AllContext/ContextFive";
import { CreateProvider6 } from "./AllContext/ContextSix";

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// user components
import MyLogin from "./User_Comp/Login_Comp";
import MyRegister from "./User_Comp/Register_Comp";

// blog components
import CreateBlog from "./Blog_comp/CreateBlog";
import AllBlog from "./Blog_comp/FetchAllBlog";
import UpdateBlog from "./Blog_comp/UpdateBlog";
import SingleBlogPage from "./Blog_comp/ViewSingleBlog";
import SinglePublicBlog from "./Blog_comp/ViewPublicSingleBlog";

// profile components
import Profile from "./Profile/FetchProfile_Comp";
import CreateProfile from "./Profile/CreateProfile_Comp";
import UpdateEmail_Comp from "./Profile/UpdateEmail_Comp/UpdateEmail_Comp";
import UpdateProfile from "./Profile/UpdateProfile_Comp";
import ResetPassword_Comp from "./Profile/ResetPassword/ResetPassword_Comp";
import NewPassword_Comp from "./Profile/ResetPassword/NewPassword_Comp";

//other components
import MyNavbar from "./Navbar/Navbar";
import MyHomePage from "./Home/HomePage";
import Search_Comp from "./Navbar/Search_Comp";

function App() {
  return (
    <>
      <BrowserRouter>
        <CreateProvider3>
          <CreateProvider4>
            <CreateProvider1>
              <CreateProvider2>
                <CreateProvider5>
                  <CreateProvider6>
                    <MyNavbar />
                    <Routes>
                      <Route path="/" element={<MyHomePage />} />
                      <Route path="/login" element={<MyLogin />} />
                      <Route path="/register" element={<MyRegister />} />
                      <Route path="/createblog/:id" element={<CreateBlog />} />
                      <Route path="/createblog" element={<CreateBlog />} />
                      <Route path="/allblog/" element={<AllBlog />} />
                      <Route
                        path="/SingleBlogPage/:id"
                        element={<SingleBlogPage />}
                      />
                      <Route
                        path="/SinglePublicBlog/:id"
                        element={<SinglePublicBlog />}
                      />
                      <Route path="/updateblog" element={<UpdateBlog />} />
                      <Route
                        path="/updateprofile"
                        element={<UpdateProfile />}
                      />
                      <Route
                        path="/CreateProfile"
                        element={<CreateProfile />}
                      ></Route>
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/UpdateEmail_Comp"
                        element={<UpdateEmail_Comp />}
                      />
                      <Route path="/Search_Comp" element={<Search_Comp />} />
                      <Route
                        path="/ResetPassword_Comp"
                        element={<ResetPassword_Comp />}
                      />
                      <Route
                        path="/NewPassword_Comp"
                        element={<NewPassword_Comp />}
                      />
                    </Routes>
                  </CreateProvider6>
                </CreateProvider5>
              </CreateProvider2>
            </CreateProvider1>
          </CreateProvider4>
        </CreateProvider3>
      </BrowserRouter>
    </>
  );
}

export default App;
