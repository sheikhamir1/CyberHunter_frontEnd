// all hooks
import React, { useContext, useEffect, useState } from "react";
import { CreateContext4 } from "../AllContext/ContextFour";
import { CreateContext5 } from "../AllContext/ContextFive";

// libraries
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

// bootstrap components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardTitle from "react-bootstrap/esm/CardTitle";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

function SinglePublicBlog() {
  const { publicBlog } = useContext(CreateContext4);
  const { likePost, dislikePost, CommentPost } = useContext(CreateContext5);

  // console.log("this is publicBlog:", publicBlog);
  const { id } = useParams();

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [color, setColor] = useState("blue");

  // track comments
  const [trackComments, setTrackComments] = useState(0);
  const navigate = useNavigate();

  const allPublicBlog = publicBlog.find((blog) => blog._id === id);

  // console.log("this is allPublicBlog:", allPublicBlog);

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Please login to Fetch blog again");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/blog/${id}/Getcomments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("comment data", data);
      if (data.success === true) {
        setComments(data.data);
      } else {
        console.error("Error fetching comments:", data.msg);
      }
    };

    // fetchComments();
  }, [trackComments]);

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

  // const isoPublicAt = format(
  //   new Date(allPublicBlog.publicAt),
  //   "dd/MM/yyyy" + " " + "HH:mm:ss"
  // );

  const handleLike = (id) => {
    // console.log("this is id:", id);
    if (localStorage.getItem("token")) {
      likePost(id);
      setColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
    } else {
      navigate("/login");
    }
  };

  const handleDislike = (id) => {
    // console.log("this is id:", id);
    if (localStorage.getItem("token")) {
      dislikePost(id);
    } else {
      navigate("/login");
    }
  };

  const handleComment = (id) => {
    if (localStorage.getItem("token")) {
      setShowComment(!showComment);
      setTrackComments((prev) => prev + 1);
    } else {
      navigate("/login");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(CommentData);
    // CommentPost(DetailBlog._id, CommentData.commentBody);
    CommentPost(allPublicBlog._id, data.text);
    reset();
    setTrackComments((prev) => prev + 1);
  };

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
                // height: "auto",
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
            <Card.Title className="AllBlogCardTitle">
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
            {/* <Card.Title className="AllBlogCardTitle">
              <strong>publicAt : </strong>
              <strong>{isoPublicAt}</strong>
            </Card.Title> */}
          </Card.Body>
          <div
            className="setiup"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div
              className="showLike_Dislike_Share"
              style={{
                fontWeight: "bold",
                margin: "10px",
              }}
            >
              <FcLike style={{ fontSize: "20px" }} />{" "}
              <strong>{allPublicBlog.likeCount}</strong>
            </div>
          </div>
          <div
            className="likeAndUnlike"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div className="likeSetup" style={{ margin: "5px" }}>
              <SlLike
                style={{
                  fontSize: "30px",
                  padding: "4px",
                  cursor: "pointer",
                  color: color,
                }}
                onClick={() => handleLike(allPublicBlog._id)}
              />
              Like
            </div>
            <div className="dislikeSetup" style={{ margin: "5px" }}>
              <SlDislike
                style={{
                  fontSize: "30px",
                  padding: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleDislike(allPublicBlog._id)}
              />
              Dislike
            </div>

            <div className="commentSetup" style={{ margin: "5px" }}>
              <FaRegComment
                style={{
                  fontSize: "30px",
                  padding: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleComment(allPublicBlog._id)}
              />{" "}
              Comment
            </div>
            <div className="shareSetup" style={{ margin: "5px" }}>
              <FaRegShareSquare
                style={{
                  fontSize: "30px",
                  padding: "4px",
                  cursor: "pointer",
                }}
              />
              Share
            </div>
          </div>

          {showComment ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                style={{
                  margin: "10px",
                  padding: "10px",
                  // border: "1px solid #37a6d1",
                  borderRadius: "10px",
                }}
              >
                {/* <Form.Label>Example textarea</Form.Label> */}
                <Form.Control
                  as="textarea"
                  // type="text"
                  rows={3}
                  name="text"
                  {...register("text")}
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </Form.Group>
              <CardTitle style={{ fontSize: "20px", margin: "10px" }}>
                Comments
              </CardTitle>
              {comments.map((comment) => {
                const createdAt = format(
                  new Date(comment.createdAt),
                  "dd/MM/yyyy" + " " + "HH:mm:ss"
                );
                const updatedAt = format(
                  new Date(comment.updatedAt),
                  "dd/MM/yyyy" + " " + "HH:mm:ss"
                );

                return (
                  <div style={{ margin: "10px" }} key={comment._id}>
                    <Card
                      style={{
                        margin: "10px",
                        border: "1px solid #37a6d1",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <Card.Title style={{ fontSize: "16px" }}>
                        @{comment.userId.fullName}
                      </Card.Title>
                      <Card.Text>{comment.content}</Card.Text>
                      <hr />
                      <strong style={{ fontSize: "12px" }}>
                        Commented on : {createdAt}
                      </strong>
                      <strong style={{ fontSize: "12px" }}>
                        Update on : {updatedAt}
                      </strong>
                    </Card>
                  </div>
                );
              })}
            </Form>
          ) : null}
        </Card>
      </div>
    </>
  );
}

export default SinglePublicBlog;
