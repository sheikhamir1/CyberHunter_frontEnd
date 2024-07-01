// all hooks
import { useContext } from "react";
import { CreateContext1 } from "../AllContext/ContextOne";
import { CreateContext3 } from "../AllContext/ContextThree";
import { CreateContext4 } from "../AllContext/ContextFour";

// libraries
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// Css
import "./Navbar.css";

// icons
import { FaSignInAlt } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

// other components
import Search_Comp from "./Search_Comp";

function MyNavbar() {
  const { isLoggedIn, logout } = useContext(CreateContext1);
  const { setTrackProfile } = useContext(CreateContext3);
  const { Search } = useContext(CreateContext4);

  const navigate = useNavigate();
  const HandleClick = () => {
    logout();
    console.log("user logout");
    setTrackProfile((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    if (localStorage.getItem("token")) {
      Search(data.search);
      navigate("/Search_Comp");
      reset();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-link" as={Link} to="/">
              CyberHunter
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="nav-link">Home</Nav.Link>
              <Nav.Link className="nav-link">About</Nav.Link>
              {isLoggedIn ? (
                <NavDropdown
                  title={
                    <>
                      Profile <CgProfile />
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  {/* <CgProfile /> */}
                  <NavDropdown.Item as={Link} to="/createblog">
                    Create New Blog
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/allblog">
                    View Your Blogs
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to="/createprofile">
                    Create New Profile
                  </NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/profile">
                    view Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>testing</NavDropdown.Item>
                </NavDropdown>
              ) : null}
              <Nav.Link className="nav-link" as={Link} to="/ContextUs_Comp">
                Context Us
              </Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
              {isLoggedIn ? (
                <>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={HandleClick}
                    style={{
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                    as={Link}
                    to="/"
                  >
                    Logout
                    <FiArrowUpCircle style={{ marginLeft: "5px" }} />
                  </Button>

                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="search"
                    {...register("search", {
                      required: "search is required",
                    })}
                  />
                  <Button variant="outline-success" type="submit">
                    <FaSearch />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                    as={Link}
                    to="/login"
                  >
                    Login
                    <FaSignInAlt style={{ marginLeft: "5px" }} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                    as={Link}
                    to="/register"
                  >
                    Register
                    <FiArrowUpCircle style={{ marginLeft: "5px" }} />
                  </Button>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="search"
                    {...register("search", {
                      required: "search is required",
                    })}
                  />
                  <Button variant="outline-success" type="submit">
                    <FaSearch />
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
