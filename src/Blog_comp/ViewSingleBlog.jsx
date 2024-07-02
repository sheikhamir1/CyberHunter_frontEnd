// all hooks
import React, { useContext, useEffect, useState } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";

// libraries
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

// bootstrap components
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

// other components
import Like_Comp from "./Like_Comment_Share/Like_Comp";

function SingleBlogPage() {
  const {
    allBlog,
    GetBlogId,
    DeleteBlog,
    show,
    errorShow,
    serverMsg,
    serverError,
    setTrackAllBlog,
  } = useContext(CreateContext2);

  const { id } = useParams();

  // console.log("this is allBlog:", allBlog);
  const DetailBlog = allBlog.find((blog) => blog._id === id);
  // console.log("this is DetailBlog:", DetailBlog);

  if (!DetailBlog) {
    return (
      <>
        <div>Blog not found</div>
      </>
    );
  }

  const handleDelete = (id) => {
    DeleteBlog(id);
  };

  const isoCreatedAt = format(
    new Date(DetailBlog.createdAt),
    "dd/MM/yyyy" + " " + "HH:mm:ss"
  );

  const isoUpdateAt = format(
    new Date(DetailBlog.updatedAt),
    "dd/MM/yyyy" + " " + "HH:mm:ss"
  );

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

      <div className="AllBlogMainSetup">
        <Card key={DetailBlog.id} style={{ width: "100%", margin: "20px" }}>
          <div className="SetUpdateAndDelete">
            {localStorage.getItem("token") ? (
              <>
                <Link as={Link} to={`/updateblog/`}>
                  <FaEdit
                    title="Click to Update this blog"
                    onClick={() => GetBlogId(DetailBlog._id, DetailBlog)}
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
                    onClick={() => handleDelete(DetailBlog._id)}
                    style={{
                      fontSize: "22px",
                      cursor: "pointer",
                      margin: "5px",
                      color: "#3b28a1",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                </Link>{" "}
              </>
            ) : null}
          </div>
          <Card.Body>
            <Card.Title>
              <strong>Title : </strong>
              {DetailBlog.title}
            </Card.Title>
            <strong>Content : </strong>
            <FaArrowTurnDown style={{ fontSize: "20px", paddingTop: "4px" }} />
            <div
              dangerouslySetInnerHTML={{ __html: DetailBlog.content }}
              // className="AllBlogImageSetup"
              style={{
                maxWidth: "-webkit-fill-available",
                // width: "500px",
              }}
            />
            <Card.Text
              style={{
                borderTop: "2px solid black",
                paddingTop: "15px",
              }}
            >
              <strong>Categories : </strong>
              <strong>{DetailBlog.categories}</strong>
            </Card.Text>
            <Card.Title style={{ fontSize: "15px" }}>
              <strong>Tags : </strong>
              <IoPricetags style={{ fontSize: "20px", marginRight: "5px" }} />
              {DetailBlog.tags.map((tag, index) => {
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
            <Card.Title style={{ fontSize: "15px" }}>
              <strong>Posted by : </strong>
              <strong>{DetailBlog.author.fullName}</strong>
            </Card.Title>

            <Card.Text>
              <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                This Post is :{" "}
              </strong>
              <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                {DetailBlog.isPublic ? "Public" : "Privet"}
              </strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Like_Comp />
    </>
  );
}

export default SingleBlogPage;
