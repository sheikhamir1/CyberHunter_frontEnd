// all hooks
import React, { useContext } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";
import { CreateContext4 } from "../AllContext/ContextFour";

// libraries
import { format } from "date-fns";
import { Link } from "react-router-dom";

// bootstrap components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Css
import "./FetchAllBlog.css";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function PrivateBlogs() {
  const {
    GetBlogId,
    DeleteBlog,
    show,
    errorShow,
    serverMsg,
    serverError,
    setTrackAllBlog,
    allPrivateBlog,
  } = useContext(CreateContext2);

  const { setTrackPublicBlog } = useContext(CreateContext4);

  const handleDelete = (id) => {
    DeleteBlog(id);
    // setTrackPublicBlog((prev) => prev + 1);
  };

  if (allPrivateBlog.length === 0) {
    return (
      <>
        <Alert variant="info" style={{ textAlign: "center", margin: "0px" }}>
          opps! No blog found , please create new blog
        </Alert>
      </>
    );
  }

  const handleClick = () => {
    setTrackAllBlog((prev) => prev + 1);
    setTrackPublicBlog((prev) => prev + 1);
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
      {/* <Outlet /> */}

      <div className="AllBlogMainSetup">
        {allPrivateBlog.map((blog) => {
          const isoCreatedAt = format(
            new Date(blog.createdAt),
            "dd/MM/yyyy" + " " + "HH:mm:ss"
          );

          const isoUpdateAt = format(
            new Date(blog.updatedAt),
            "dd/MM/yyyy" + " " + "HH:mm:ss"
          );

          const isoPublicAt = format(
            new Date(blog.publicAt),
            "dd/MM/yyyy" + " " + "HH:mm:ss"
          );

          return (
            <Card key={blog._id} className="AllBlogCardSetup">
              <div className="SetUpdateAndDelete">
                <Link
                  as={Link}
                  to={`/singleblogpage/${blog._id}`}
                  style={{
                    margin: "5px",
                    position: "absolute",
                    left: "5px",
                  }}
                >
                  <Button
                    variant="primary"
                    style={{
                      fontSize: "12px",
                      height: "24px",
                      width: "67px",
                      padding: "2px 2px 2px 2px",
                    }}
                    onClick={handleClick}
                  >
                    Read More
                  </Button>
                </Link>
                <Link as={Link} to={`/updateblog/`}>
                  <FaEdit
                    title="Click to Update this blog"
                    onClick={() => GetBlogId(blog._id, blog)}
                    className="editIcon"
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      margin: "5px",
                      color: "#3b28a1",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                </Link>
                <Link>
                  <MdDeleteSweep
                    title="Click to Delete this blog"
                    onClick={() => handleDelete(blog._id)}
                    style={{
                      fontSize: "22px",
                      cursor: "pointer",
                      margin: "5px",
                      color: "#3b28a1",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                </Link>
              </div>
              <Card.Body style={{ fontSize: "12px" }}>
                <Card.Title style={{ fontSize: "12px" }}>
                  <strong>Title : </strong>
                  {blog.title}
                </Card.Title>
                <strong>Content : </strong>
                <FaArrowTurnDown
                  style={{ fontSize: "20px", paddingTop: "4px" }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  // className="AllBlogImageSetup"
                  style={{ height: "-webkit-fill-available", width: "260px" }}
                />
                <Card.Text
                  style={{
                    borderTop: "2px solid black",
                    paddingTop: "15px",
                  }}
                >
                  <strong>Categories : </strong>
                  <strong>{blog.categories}</strong>
                </Card.Text>

                <Card.Title style={{ fontSize: "12px" }}>
                  <strong>Tags : </strong>
                  <IoPricetags
                    style={{ fontSize: "12px", marginRight: "5px" }}
                  />
                  {blog.tags.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="tag"
                        style={{
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      >
                        <strong style={{ color: "brown", marginRight: "5px" }}>
                          {tag}
                          {","}
                        </strong>
                      </div>
                    );
                  })}
                </Card.Title>

                <Card.Text>
                  <strong>Created on : </strong>
                  <strong>{isoCreatedAt}</strong>
                </Card.Text>

                <Card.Text>
                  <strong>Update on : </strong>
                  <strong>{isoUpdateAt}</strong>
                </Card.Text>
                <Card.Title
                  className="AllBlogCardTitle"
                  style={{ fontSize: "12px" }}
                >
                  <strong>Posted by : </strong>
                  <strong>{blog.author.fullName}</strong>
                </Card.Title>

                <Card.Text>
                  <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                    This Post is :{" "}
                  </strong>
                  <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {blog.isPublic ? "Public" : "private"}
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default PrivateBlogs;
