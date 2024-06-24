// all hooks
import React, { useEffect, useState, useContext } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";
import { CreateContext3 } from "../AllContext/ContextThree";

// libraries
import { useForm } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Css

// icons
import { MdAccountCircle } from "react-icons/md";

function CreateProfile() {
  const {
    show,
    errorShow,
    serverMsg,
    serverError,
    setTrackProfile,
    setServerMsg,
    setServerError,
    setErrorShow,
    setShowAlert,
  } = React.useContext(CreateContext3);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //  start upload
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("age", data.age);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("file", data.file[0]);

    const CreateProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Please login to create a profile");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/Createprofile",
          {
            method: "POST",
            headers: {
              "Auth-token": localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const responseData = await response.json();
        if (responseData.success === true) {
          console.log("User Profile created ");
          setTrackProfile((prev) => prev + 1);
          const serverMSG = responseData.msg;
          setShowAlert(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            setShowAlert(false);
            navigate("/profile");
          }, 3000);
          setServerMsg(serverMSG + " please Wait...");
        } else {
          const serverMSG = responseData.msg;
          setErrorShow(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            setErrorShow(false);
          }, 3000);
          setServerError(serverMSG);
        }
      } catch (error) {
        console.error("Error creating profile:", error);
        // Handle fetch errors, show generic error message to user
      }
    };
    CreateProfile();
    reset();
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
      <h3 style={{ marginTop: "30px", textAlign: "center" }}>Create Profile</h3>

      <Form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "30px" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>

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

export default CreateProfile;
