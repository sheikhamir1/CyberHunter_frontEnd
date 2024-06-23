// all hooks
import React, { useState, useContext } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// libraries
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Css
import "./LoginStyle.css";

function MyRegister() {
  const { setAgainFetchBlog } = useContext(CreateContext2);
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  // useing react hook form here
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   console.log("checking if token is there : ", localStorage.getItem("token"));

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const postResponse = await response.json();
      // console.log(postResponse);

      if (postResponse.success === true) {
        const JWT_token = postResponse.authToken;
        // console.log("this is auth token", JWT_token);

        localStorage.setItem("token", JWT_token);
        const serverMSG = postResponse.message;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          console.log("user registered");
          navigate("/login");
          setAgainFetchBlog((prev) => prev + 1);
        }, 3000);
        setServerMsg(serverMSG + " please login...");
        // console.log("this is server msg :", serverMSG);
      } else if (postResponse.success === false) {
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(postResponse.message);
      }
      reset();
    } catch (errors) {
      const error2 = postResponse.error[0].msg;
      console.log(error2);
    }
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
      <div className="LoginFormSetup">
        <Form className="Setup" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 Setup2" controlId="formBasicText">
            <Form.Label>FullName</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter FullName"
              {...register("fullName", {
                required: "fullName is required",
                minLength: {
                  value: 6,
                  message: "fullName must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "fullName must be at most 20 characters",
                },
              })}
            />
            {errors.fullName && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.fullName.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 Setup2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              {...register("email", {
                required: "email is required",
                minLength: {
                  value: 6,
                  message: "email must be at least 6 characters",
                },
              })}
            />
            {errors.email && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.email.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 Setup2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters",
                },
                maxLength: {
                  value: 25,
                  message: "password must be at most 25 characters",
                },
              })}
            />
            {errors.password && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.password.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 Setup2" controlId="formBasicPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="Password"
              placeholder="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: "confirmPassword is required",
                minLength: {
                  value: 8,
                  message: "confirmPassword must be at least 8 characters",
                },
                maxLength: {
                  value: 25,
                  message: "confirmPassword must be at most 25 characters",
                },
              })}
            />
            {errors.confirmPassword && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 Setup2" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Agree to terms and conditions"
              name="checkbox"
              {...register("checkbox", {
                required: "checkbox is required",
              })}
            />
            {errors.checkbox && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.checkbox.message}
              </span>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default MyRegister;
