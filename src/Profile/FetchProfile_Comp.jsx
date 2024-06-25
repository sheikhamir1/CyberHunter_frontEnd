// all hooks
import React, { useEffect, useState } from "react";
import { CreateContext3 } from "../AllContext/ContextThree";

// libraries
import { format } from "date-fns";
import { Link, Outlet } from "react-router-dom";

// bootstrap components
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

// Css
import "./Profile.css";

// icons
import { FiAtSign } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";

function Profile() {
  const { profile, emptyProfile, GetId, setTrackProfile } =
    React.useContext(CreateContext3);
  const [email, setEmail] = useState([]);

  useEffect(() => {
    const GetUserEmail = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/getemail",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 404) {
          console.log("email not found");
        }

        const data = await response.json();
        console.log("Email fetched");
        setEmail(data.LoginDetails.email);

        // console.log("This is email", data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        // setError(error);
      }
    };

    // GetUserEmail();
  }, []);

  if (profile.length === 0) {
    return (
      <>
        <Alert variant="info" style={{ textAlign: "center", margin: "0px" }}>
          opps! No profile found , please create new Profile
        </Alert>
      </>
    );
  }

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "18px",
          color: "red",
        }}
      >
        {emptyProfile}
      </h3>
      {profile.map((profile) => {
        const isoCreatedAt = format(
          new Date(profile.createdAt),
          "dd/MM/yyyy" + " " + "HH:mm:ss"
        );
        const isoUpdatedAt = format(
          new Date(profile.updatedAt),
          "dd/MM/yyyy" + " " + "HH:mm:ss"
        );

        return (
          <div className="SetupUserProfile" key={profile._id}>
            <Card className="CardInProfile">
              <Link
                as={Link}
                to={"/updateprofile"}
                style={{
                  textDecoration: "none",
                  padding: "0px",
                  fontSize: "6px",
                }}
                title="Click on the pen icon to edit your profile"
              >
                <FiEdit3
                  style={{ fontSize: "14px", marginLeft: "5px" }}
                  onClick={() => GetId(profile._id, profile)}
                />
              </Link>
              <Container style={{ marginBottom: "50px" }}>
                <Row className="justify-content-center">
                  {/* <Row className="justify-content-md-center"> */}
                  <div
                    style={{
                      marginTop: "20px",
                      height: "300px",
                      width: "fit-content",
                      maxWidth: "-webkit-fill-available",
                    }}
                  >
                    <Image
                      src={profile.url}
                      // roundedCircle
                      style={{
                        height: "-webkit-fill-available",
                        borderRadius: "10px",
                      }}
                    />

                    <h5 style={{ textAlign: "center", margin: "0px" }}>
                      <strong style={{ fontSize: "15px", fontStyle: "italic" }}>
                        <FiAtSign
                          style={{ fontSize: "14px", fontStyle: "italic" }}
                        />
                        {profile.username}
                        <FiEdit3
                          style={{ fontSize: "14px", fontStyle: "italic" }}
                        />
                      </strong>
                    </h5>
                  </div>
                </Row>
              </Container>
              <Card.Body>
                <Card.Text>
                  <strong>UserName : </strong>{" "}
                  <strong>{profile.username}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>Email : </strong> <strong>{email}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>FullName : </strong>{" "}
                  <strong>{profile.author.fullName}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>Age : </strong> <strong>{profile.age}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>Bio : </strong> <strong>{profile.bio}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>City : </strong> <strong>{profile.city}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>country : </strong> <strong>{profile.country}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>CreatedAt : </strong> <strong>{isoCreatedAt}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>UpdatedAt : </strong> <strong>{isoUpdatedAt}</strong>
                </Card.Text>
                <Outlet />
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
