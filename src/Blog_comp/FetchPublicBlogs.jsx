// all hooks
import React, { useContext } from "react";
import { CreateContext4 } from "../AllContext/ContextFour";

// libraries
import { format } from "date-fns";
import { Link } from "react-router-dom";

// bootstrap components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";

function PublicBlogs() {
  const { publicBlog } = useContext(CreateContext4);

  console.log("this is public blog in publicBlogs", publicBlog);

  if (!publicBlog) return <h1 style={{ textAlign: "center" }}>loading</h1>;

  return (
    <>
      {/* <h1
        style={{
          textAlign: "center",
          backgroundColor: " #f3d7b475",
          margin: "0px",
        }}
      >
        All PublicBlogs
      </h1> */}

      <div className="AllBlogMainSetup">
        {publicBlog.map((blog) => {
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
                  to={`/singlePublicBlog/${blog._id}`}
                  style={{ margin: "5px", position: "static", left: "5px" }}
                >
                  <Button
                    variant="primary"
                    style={{
                      fontSize: "12px",
                      height: "24px",
                      width: "67px",
                      padding: "2px 2px 2px 2px",
                    }}
                  >
                    Read More
                  </Button>
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
                  // style={{ height: "auto", width: "-webkit-fill-available" }}
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
                        style={{ display: "inline-block", marginRight: "5px" }}
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

export default PublicBlogs;
