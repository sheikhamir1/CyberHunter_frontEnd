// all hooks
import React, { useState, useContext } from "react";
import { CreateContext4 } from "../AllContext/ContextFour";

// bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

// libraries
import { Link } from "react-router-dom";
import { format } from "date-fns";
import LoadingSpinner from "../Resue_Comp/LodingSpinner_Comp";
import { css } from "@emotion/react";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function Search_Comp() {
  const { searchResult, userSearch, loading } = useContext(CreateContext4);
  //   console.log("thsi is search result", searchResult);

  if (searchResult.length === 0)
    return (
      <h3 style={{ textAlign: "center", color: "red" }}>
        opps! No blog found ,try different search
      </h3>
    );

  const spinnerCustomCss = css`
    margin-top: 0; /* Removed margin-top to allow proper centering */
    border-color: blue;
  `;
  return (
    <>
      {userSearch !== "" && searchResult ? (
        <h1 style={{ textAlign: "center" }}>
          {" "}
          <strong>You Search For: </strong>
          {userSearch}
        </h1>
      ) : null}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <LoadingSpinner
            loading={loading}
            size={100}
            color="red"
            customCss={spinnerCustomCss}
          />
        </div>
      )}

      <div className="AllBlogMainSetup">
        {searchResult.map((blog) => {
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
                    // onClick={handleReadMore}
                  >
                    Read More
                  </Button>
                </Link>
                <Link as={Link} to={`/updateblog/`}>
                  <FaEdit
                    title="Click to Update this blog"
                    // onClick={() => HandleUpdate(blog._id, blog)}
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
                    // onClick={() => handleDelete(blog._id)}
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
                  style={{
                    height: "-webkit-fill-available",
                    width: "260px",
                  }}
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

export default Search_Comp;
