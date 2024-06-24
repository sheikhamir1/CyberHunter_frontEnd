// all hooks
import React, { useEffect, useState } from "react";
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
import { FaUnlockAlt } from "react-icons/fa";

function UpdateProfile() {
  const {
    UpdateProfile,
    getProfileId,
    getProfileBody,
    show,
    errorShow,
    serverMsg,
    serverError,
  } = React.useContext(CreateContext3);

  //   console.log("this is getProfileBody", getProfileBody);
  //   console.log("this is getProfileId", getProfileId);

  //   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  //  start upload

  useEffect(() => {
    if (getProfileBody) {
      setValue("username", getProfileBody.username);
      setValue("bio", getProfileBody.bio);
      setValue("age", getProfileBody.age);
      setValue("city", getProfileBody.city);
      setValue("country", getProfileBody.country);
      setValue("profilePic", getProfileBody.profilePic);
    }
  }, [getProfileBody, setValue]);

  const onSubmit = async (data) => {
    const updateBody = {
      username: data.username,
      bio: data.bio,
      age: data.age,
      city: data.city,
      country: data.country,
      // profilePic: data.profilePic[0],
    };

    // console.log("this is body before send in context", body);
    UpdateProfile(updateBody);

    // UpdateProfile(body, picture);

    // console.log("on submite data include image", data);
    const formData = new FormData();
    formData.append("profilePic", data.profilePic[0]);

    const UploadImage = await fetch(
      "http://localhost:3000/api/user/user-profile-picture-update",
      {
        method: "PUT",
        headers: {
          //   "Content-Type": "image/jpeg",
          "Auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    const response = await UploadImage.json();
    console.log("image Updated");
    // console.log("this is image", response);
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
          to="/editaccount"
        >
          Edit Account <MdAccountCircle />
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
            name="profilePic"
            type="file"
            placeholder="Upload profile picture"
            {...register("profilePic")}
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
