// all hooks
import React, { useEffect, useContext } from "react";
import { CreateContext3 } from "../AllContext/ContextThree";

// libraries
import { useForm } from "react-hook-form";
import { useNavigate, Link, Outlet } from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Css

// icons
import { MdAccountCircle } from "react-icons/md";

function UpdateProfile() {
  const {
    setTrackProfile,
    setShowAlert,
    getProfileId,
    getProfileBody,
    show,
    errorShow,
    serverMsg,
    serverError,
    setErrorShow,
    setServerMsg,
    setServerError,
  } = React.useContext(CreateContext3);

  //   console.log("this is getProfileBody", getProfileBody);
  //   console.log("this is getProfileId", getProfileId);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (getProfileBody) {
      setValue("username", getProfileBody.username);
      setValue("bio", getProfileBody.bio);
      setValue("age", getProfileBody.age);
      setValue("city", getProfileBody.city);
      setValue("country", getProfileBody.country);
    }
  }, [getProfileBody, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("age", data.age);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("file", data.file[0]);

    // check the formData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const ProfileUpdateApi = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Please login to Update a profile");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/profileupdate/${getProfileId}`,
          {
            method: "PUT",
            headers: {
              "Auth-token": localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const response2 = await response.json();
        // console.log("this is update profile result", response2);

        if (response2.success === true) {
          console.log("User Profile updated ");
          setTrackProfile((prev) => prev + 1);
          const serverMSG = response2.msg;
          window.scrollTo(0, 0);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate("/profile");
          }, 3000);
          setServerMsg(serverMSG + " please Wait...");
        } else if (response2.success === false) {
          console.log("User Profile updated failed ");
          const serverMSG = response2.msg;
          setErrorShow(true);
          setTimeout(() => {
            setErrorShow(false);
          }, 3000);
          setServerError(serverMSG);
        }
      } catch (error) {
        console.error("Error Updating profile:", error);
      }
    };
    ProfileUpdateApi();
  };

  return (
    <>
      {show && (
        <Alert variant="success" style={{ textAlign: "center", margin: "0px" }}>
          {serverMsg}
        </Alert>
      )}
      {errorShow && (
        <Alert variant="danger" style={{ textAlign: "center", margin: "0px" }}>
          {serverError}
        </Alert>
      )}
      <div className="setupLinks">
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/profile"
        >
          View Profile <MdAccountCircle />
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/UpdateEmail_Comp"
        >
          Update Email <MdAccountCircle />
        </Link>
      </div>

      <Outlet />
      <h3 style={{ marginTop: "30px", textAlign: "center" }}>
        Update Profile Information
      </h3>

      <Form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "30px" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Update Profile Picture</Form.Label>

          <Form.Control
            name="file"
            type="file"
            placeholder="Upload profile picture"
            {...register("file")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your UserName"
            name="username"
            {...register("username", {
              required: "username is required",
              minLength: {
                value: 4,
                message: "username must be at least 4 characters",
              },
            })}
          />
          {errors.userName && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              {errors.userName.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Age"
            name="age"
            {...register("age", {
              required: "age is required",
              valueAsNumber: true,
              min: {
                value: 7,
                message: "age must be at least 7",
              },
            })}
          />
          {errors.age && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              {errors.age.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            placeholder="Enter your bio"
            name="bio"
            {...register("bio", {
              required: "bio is required",
              minLength: {
                value: 5,
                message: "bio must be at least 5 characters",
              },
            })}
          />
          {errors.bio && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              {errors.bio.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your City"
            name="city"
            {...register("city", {
              required: "city is required",
              minLength: {
                value: 3,
                message: "city must be at least 3 characters",
              },
            })}
          />
          {errors.city && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              {errors.city.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            name="country"
            {...register("country", {
              required: "country is required",
              minLength: {
                value: 3,
                message: "country must be at least 3 characters",
              },
            })}
          />
          {errors.country && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              {errors.country.message}
            </span>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      {/* <Outlet /> */}
    </>
  );
}

export default UpdateProfile;
