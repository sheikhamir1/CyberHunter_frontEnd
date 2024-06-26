// all hooks
import React, { useContext } from "react";
import { CreateContext4 } from "../AllContext/ContextFour";

// libraries
import { useParams } from "react-router-dom";
import { format } from "date-fns";

// bootstrap components
import Card from "react-bootstrap/Card";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";

// other components
import Like_Comp from "./Like_Comment_Share/Like_Comp";

function SinglePublicBlog() {
  const { publicBlog } = useContext(CreateContext4);

  const { id } = useParams();

  const allPublicBlog = publicBlog.find((blog) => blog._id === id);
  // console.log("this is allPublicBlog:", allPublicBlog);

  if (!allPublicBlog) {
    return (
      <>
        <div>Blog not found</div>
      </>
    );
  }

  const isoCreatedAt = format(
    new Date(allPublicBlog.createdAt),
    "dd/MM/yyyy" + " " + "HH:mm:ss"
  );

  const isoUpdateAt = format(
    new Date(allPublicBlog.updatedAt),
    "dd/MM/yyyy" + " " + "HH:mm:ss"
  );

  return (
    <>
      <div className="AllBlogMainSetup">
        <Card key={allPublicBlog.id} style={{ width: "100%", margin: "20px" }}>
          <Card.Body>
            <Card.Title>
              <strong>Title : </strong>
              {allPublicBlog.title}
            </Card.Title>
            <strong>Content : </strong>
            <FaArrowTurnDown style={{ fontSize: "20px", paddingTop: "4px" }} />
            <div
              dangerouslySetInnerHTML={{ __html: allPublicBlog.content }}
              // className="AllBlogImageSetup"
              style={{
                maxWidth: "-webkit-fill-available",
                width: "500px",
              }}
            />
            <Card.Text
              style={{
                borderTop: "2px solid black",
                paddingTop: "15px",
              }}
            >
              <strong>Categories : </strong>
              <strong>{allPublicBlog.categories}</strong>
            </Card.Text>

            <Card.Title style={{ fontSize: "15px" }}>
              <strong>Tags : </strong>
              <IoPricetags style={{ fontSize: "20px", marginRight: "5px" }} />
              {allPublicBlog.tags.map((tag, index) => {
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
              <strong>{allPublicBlog.author.fullName}</strong>
            </Card.Title>
            <Card.Text>
              <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                This Post is :{" "}
              </strong>
              <strong style={{ fontSize: "12px", fontWeight: "bold" }}>
                {allPublicBlog.isPublic ? "Public" : "Privet"}
              </strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Like_Comp />
    </>
  );
}

export default SinglePublicBlog;
