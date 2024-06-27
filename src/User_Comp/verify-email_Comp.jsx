import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

// libraries
import { useNavigate, Link, useParams } from "react-router-dom";

// icons
import { TiTick } from "react-icons/ti";

function Verify_email() {
  const { token } = useParams();

  useEffect(() => {
    fetchMsg();
  }, []);
  const fetchMsg = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/verify-email/${token}`
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="congratulation-area text-center mt-5">
        <div className="container">
          <div className="congratulation-wrapper">
            <div className="congratulation-contents center-text">
              <div className="congratulation-contents-icon">
                <img
                  src="https://i.gifer.com/origin/16/162b41786d99b9d7e7b03549c4e19ae2_w200.gif"
                  alt=""
                />
              </div>
              <TiTick
                style={{
                  color: "green",
                  fontSize: "100px",
                  margin: "20px",
                  padding: "20px",
                  borderRadius: "50%",
                  border: "2px solid green",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              />

              <h4 className="congratulation-contents-title">
                {" "}
                Congratulations!{" "}
              </h4>
              <p className="congratulation-contents-para">
                {" "}
                Your account is now verified, you can login.{" "}
              </p>
              <div className="btn-wrapper mt-4">
                <Link to={"/login"}>
                  {" "}
                  <Button className="btn btn-primary" variant="primary">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verify_email;
