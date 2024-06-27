// all hooks
import React, { useContext, useState } from "react";

// libraries
import { useNavigate } from "react-router-dom";

// bootstrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ResendToken_Comp() {
  const [email, setEmail] = useState("");

  // all alerts
  const [show, setShowAlert] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const HandleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/resend-verification-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      //   console.log("resend token result", data);
      if (data.success === true) {
        console.log("token sent to email");
        const serverMSG = data.msg;
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/login");
        }, 3000);
        setServerMsg(serverMSG + " please Wait...");
      } else if (data.success === false) {
        console.log("resend token failed");
        const serverMSG = data.msg;
        setErrorShow(true);
        setTimeout(() => {
          setErrorShow(false);
        }, 3000);
        setServerError(serverMSG);
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
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
            Resend varification token
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your registered email address and we'll re-send you an
              varification token in email. and once you varify your email you
              can login (check spam also)
            </p>
            <div data-mdb-input-init className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="form-label" htmlFor="typeEmail">
                Email input
              </label>
            </div>
            <Button
              style={{
                width: "180px",
              }}
              type="submit"
              data-mdb-ripple-init
              className="btn btn-primary"
              onClick={HandleClick}
            >
              Get varification token
            </Button>
            <div className="d-flex justify-content-between mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResendToken_Comp;
