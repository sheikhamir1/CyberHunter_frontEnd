//  all hooks
import React, { useState, useContext } from "react";
import { CreateContext6 } from "../../AllContext/ContextSix";

// libraries
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Resue_Comp/LodingSpinner_Comp";
import { css } from "@emotion/react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// css
import "./NewPassword_Comp.css";

function NewPassword_Comp() {
  const { show, errorShow, serverMsg, serverError, UpdatePassword, loading } =
    useContext(CreateContext6);

  const { token } = useParams();
  // console.log("this is token id in newpass", token);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("this is password", data.password);
    // console.log("this is conform password", data.confirmPassword);
    UpdatePassword(data.password, data.confirmPassword, token);

    reset();
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
      <h1
        style={{
          color: "#333",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Enter new password
      </h1>{" "}
      <div className="resetPasswordSetup">
        <Form className="Setup" onSubmit={handleSubmit(onSubmit)}>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default NewPassword_Comp;
