// all hooks
import React, { useContext, useEffect, useState } from "react";
import { CreateContext3 } from "../../AllContext/ContextThree";
import { CreateContext4 } from "../../AllContext/ContextFour";

// libraries
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Resue_Comp/LodingSpinner_Comp";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// other components
import ProfileNavbar_Comp from "../ProfileNavbar_Comp";

function UpdateEmail_Comp() {
  const { setTrackProfile, setLoading, loading } = useContext(CreateContext3);
  const { updateEmail, show, errorShow, serverMsg, serverError } =
    useContext(CreateContext4);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    updateEmail(data);
    // setTrackProfile((prev) => prev + 1);
  };

  // handle fetch email

  useEffect(() => {
    const GetUserEmail = async () => {
      setLoading(true); // Show loading spinner

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/fetchemail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Auth-token": localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        // console.log("This is email", data);
        setValue("email", data.LoginDetails.email);
        setValue("fullName", data.LoginDetails.fullName);

        if (data.success === true) {
          setLoading(false); // Hide loading spinner

          console.log("user email fetched");
        } else if (data.success === false) {
          setLoading(false); // Hide loading spinner

          console.log("user email fetch failed");
        }
      } catch (error) {
        setLoading(false); // Hide loading spinner

        console.error("Error fetching blog:", error);
      }
    };

    GetUserEmail();
  }, [setValue]);

  return (
    <>
      <ProfileNavbar_Comp />
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
      {loading && <LoadingSpinner loading={loading} />}

      <h3 style={{ margin: "30px" }}>Edit Your Email</h3>

      <div className="SetUpFFormEditAC" style={{ margin: "30px" }}>
        <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              {...register("email", {
                required: "email is required",
                validate: (value) => {
                  if (!value) {
                    return "email is required";
                  }
                },
              })}
            />
            {errors.email && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.email.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>FullName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your FullName"
              name="fullName"
              {...register("fullName", {
                required: "fullName is required",
                minLength: {
                  value: 6,
                  message: "fullName must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "fullName must be less than 20 characters",
                },
                validate: (value) => {
                  if (!value) {
                    return "fullName is required";
                  }
                },
              })}
            />
            {errors.fullName && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.fullName.message}
              </span>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateEmail_Comp;
