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

// other components
import ProfileNavbar_Comp from "./ProfileNavbar_Comp";

function Profile() {
  const { profile, emptyProfile, GetId } = React.useContext(CreateContext3);
  const [email, setEmail] = useState([]);
  const [noProfile, setNoProfile] = useState(false);

  useEffect(() => {
    const GetUserEmail = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/fetchemail",
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
        // console.log("This is email", data);
        if (data.success === true) {
          console.log("Email fetched");
          setEmail(data.LoginDetails.email);
        } else if (data.success === false) {
          console.log("Email fetch failed");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    GetUserEmail();
  }, []);

  useEffect(() => {
    if (profile.length === 0) {
      setNoProfile("opps! No profile found , please create new Profile");
    }
  }, [profile]);

  return (
    <>
      <ProfileNavbar_Comp />

      <h3
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "18px",
          color: "red",
        }}
      >
        {noProfile}
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
