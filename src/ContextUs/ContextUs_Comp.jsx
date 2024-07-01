import React from "react";
import "./ContextUs.css";
import ProfileNavbar_Comp from "../Profile/ProfileNavbar_Comp";

import { useForm } from "react-hook-form";

function ContextUs_Comp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // reset();
  };
  return (
    <>
      <ProfileNavbar_Comp />
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
          textShadow: "1px 1px 1px black",
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
      <div className="set">
        <form className="custom-form1" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={errors.message ? "input-error" : ""}
            />
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>

          <button className="setbtnContext" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ContextUs_Comp;
