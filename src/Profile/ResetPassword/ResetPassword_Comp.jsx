// all hooks
import React, { useState, useContext } from "react";
import { CreateContext6 } from "../../AllContext/ContextSix";

// bootstrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

// libraries
import LoadingSpinner from "../../Resue_Comp/LodingSpinner_Comp";

// other components
import ProfileNavbar_Comp from "../ProfileNavbar_Comp";

function ResetPassword_Comp() {
  const { ResetPassword, show, errorShow, serverMsg, serverError, loading } =
    useContext(CreateContext6);
  const [inputValue, setInputValue] = useState("");

  const HandleClick = () => {
    // console.log("this is input value:", inputValue);
    ResetPassword(inputValue);
    setInputValue("");
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

      {loading && <LoadingSpinner loading={loading} />}

      <div
        className="set"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div className="card text-center" style={{ width: "70%" }}>
          <div className="card-header h5 text-white bg-primary">
            Password Reset
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your Current email address and we'll send you an email with
              link to reset your password(check spam also)
            </p>
            <div data-mdb-input-init className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                placeholder="Enter Email"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <label className="form-label" htmlFor="typeEmail">
                Email input
              </label>
            </div>
            <Button
              style={{
                width: "25%",
              }}
              type="submit"
              data-mdb-ripple-init
              className="btn btn-primary"
              onClick={HandleClick}
            >
              Reset password
            </Button>
            <div className="d-flex justify-content-between mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword_Comp;
