// all hooks
import React, { useState, useContext } from "react";
import { CreateContext1 } from "../AllContext/ContextOne";
import { CreateContext2 } from "../AllContext/ContextTwo";
import { CreateContext3 } from "../AllContext/ContextThree";

// libraries
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Resue_Comp/LodingSpinner_Comp";
import { css } from "@emotion/react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Css
import "./LoginStyle.css";

function UserLogin() {
  const { Login } = useContext(CreateContext1);
  const { setTrackAllBlog } = useContext(CreateContext2);
  const { setTrackProfile } = useContext(CreateContext3);
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Show loading spinner

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const postResponse = await response.json();
      // console.log(postResponse);
      if (postResponse.success === true) {
        setLoading(false); // Hide loading spinner
        console.log("user logged in");
        setTrackAllBlog((prev) => prev + 1);
        setTrackProfile((prev) => prev + 1);
        const JWT_token = postResponse.authToken;
        // console.log("this is auth token", JWT_token);
        localStorage.setItem("token", JWT_token);
        const serverMSG = postResponse.message;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          Login();
          navigate("/allblog");
        }, 3000);
        setServerMsg(serverMSG);
      } else if (postResponse.success === false) {
        setLoading(false); // Hide loading spinner
        const serverMSG = postResponse.message;
        console.log("user login failed");
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
      reset();
    } catch (errors) {
      setLoading(false); // Hide loading spinner

      console.log(errors);
    }
  };

  const spinnerCustomCss = css`
    margin-top: 0; /* Removed margin-top to allow proper centering */
    border-color: blue;
  `;

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
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <LoadingSpinner
            loading={loading}
            size={100}
            color="red"
            customCss={spinnerCustomCss}
          />
        </div>
      )}
      <div className="LoginFormSetup">
        <Form className="Setup" onSubmit={handleSubmit(onSubmit)}>
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

export default UserLogin;
