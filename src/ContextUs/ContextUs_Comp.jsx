// all hooks
import React, { useContext } from "react";
import { CreateContext7 } from "../AllContext/ContextSeven";

// libraries
import LoadingSpinner from "../Resue_Comp/LodingSpinner_Comp";

// bootstrap components
import Alert from "react-bootstrap/Alert";

// css
import "./ContextUs.css";

// other components
import ProfileNavbar_Comp from "../Profile/ProfileNavbar_Comp";

import { useForm } from "react-hook-form";

function ContextUs_Comp() {
  const { PostFeedBack, show, errorShow, serverMsg, serverError, loading } =
    useContext(CreateContext7);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    const feecbackData = {
      name: data.name,
      email: data.email,
      message: data.message,
      subject: data.subject,
    };

    PostFeedBack(feecbackData);
    reset();
  };

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
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "50px",
          fontSize: "14px",
          color: "#444",
          fontFamily: "cursive",
          fontStyle: "italic",
          // textShadow: "1px 1px 1px black",
          letterSpacing: "2px",
          wordSpacing: "5px",
          lineHeight: "1.5",
          wordWrap: "break-word",
          textIndent: "10px",
        }}
      >
        if you have any queries or suggestions please contact us, if you find a
        bug please report, if you found any problem please report we will solve
        it as soon as possible !😊
      </h2>
      {loading && <LoadingSpinner loading={loading} />}
      <div className="set">
        <form className="custom-form1" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="text">Subject</label>
            <input
              id="subject"
              name="subject"
              {...register("subject", {
                required: "Subject is required",
                message: "Invalid Subject address",
              })}
              className={errors.Subject ? "input-error" : ""}
            />
            {errors.Subject && (
              <p className="error-message">{errors.Subject.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              {...register("message", { required: "Message is required" })}
              className={errors.message ? "input-error" : ""}
            />
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>

          <button className="setbtnContext" type="submit">
            Give Feedback
          </button>
        </form>
      </div>
    </>
  );
}

export default ContextUs_Comp;
