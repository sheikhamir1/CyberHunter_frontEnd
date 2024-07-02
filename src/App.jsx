// React Hooks
import React from "react";
import { CreateProvider1 } from "./AllContext/ContextOne";
import { CreateProvider2 } from "./AllContext/ContextTwo";
import { CreateProvider3 } from "./AllContext/ContextThree";
import { CreateProvider4 } from ".//AllContext/ContextFour";
import { CreateProvider5 } from "./AllContext/ContextFive";
import { CreateProvider6 } from "./AllContext/ContextSix";
import { CreateProvider7 } from "./AllContext/ContextSeven";

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// user components here
import MyLogin from "./User_Comp/Login_Comp";
import MyRegister from "./User_Comp/Register_Comp";
import ResetPassword_Comp from "./Profile/ResetPassword/ResetPassword_Comp";
import NewPassword_Comp from "./Profile/ResetPassword/NewPassword_Comp";
import ResendToken_Comp from "./User_Comp/ResendToken_Comp";
import Verify_email from "./User_Comp/Verify_email";

// blog components
import CreateBlog from "./Blog_comp/CreateBlog";
import AllBlog from "./Blog_comp/FetchAllBlog";
import UpdateBlog from "./Blog_comp/UpdateBlog";
import SingleBlogPage from "./Blog_comp/ViewSingleBlog";
import SinglePublicBlog from "./Blog_comp/ViewPublicSingleBlog";
import BlogsCategory from "./Blog_comp/ShowAllBlogsCategory_Comp";
// profile components
import Profile from "./Profile/FetchProfile_Comp";
import CreateProfile from "./Profile/CreateProfile_Comp";
import UpdateEmail_Comp from "./Profile/UpdateEmail_Comp/UpdateEmail_Comp";
import UpdateProfile from "./Profile/UpdateProfile_Comp";

//other components
import MyNavbar from "./Navbar/Navbar";
import MyHomePage from "./Home/HomePage";
import Search_Comp from "./Navbar/Search_Comp";
import ContextUs_Comp from "./ContextUs/ContextUs_Comp";

function App() {
  return (
    <>
      <BrowserRouter>
        <CreateProvider3>
          <CreateProvider1>
            <CreateProvider4>
              <CreateProvider2>
                <CreateProvider5>
                  <CreateProvider6>
                    <CreateProvider7>
                      <MyNavbar />
                      <Routes>
                        <Route path="/" element={<MyHomePage />} />
                        <Route path="/login" element={<MyLogin />} />
                        <Route path="/register" element={<MyRegister />} />
                        <Route
                          path="/createblog/:id"
                          element={<CreateBlog />}
                        />
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
                          path="/NewPassword_Comp/:token"
                          element={<NewPassword_Comp />}
                        />
                        <Route
                          path="/resend-token"
                          element={<ResendToken_Comp />}
                        />
                        <Route
                          path="/verify_email/:token"
                          element={<Verify_email />}
                        />
                        <Route
                          path="blogsCategory/:category"
                          element={<BlogsCategory />}
                        />
                        <Route
                          path="/ContextUs_Comp"
                          element={<ContextUs_Comp />}
                        />
                      </Routes>
                    </CreateProvider7>
                  </CreateProvider6>
                </CreateProvider5>
              </CreateProvider2>
            </CreateProvider4>
          </CreateProvider1>
        </CreateProvider3>
      </BrowserRouter>
    </>
  );
}

export default App;
