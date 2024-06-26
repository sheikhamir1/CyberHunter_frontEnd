import React, { useState, useContext } from "react";
import { CreateContext2 } from "../../AllContext/ContextTwo";
import { CreateContext5 } from "../../AllContext/ContextFive";

// libraries
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";

// bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardTitle from "react-bootstrap/esm/CardTitle";

// icons
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { RiEditFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

function Like_Comp() {
  const { allBlog } = useContext(CreateContext2);
  const { likePost, dislikePost, CommentPost } = useContext(CreateContext5);

  const [showComment, setShowComment] = useState(false);
  const [color, setColor] = useState("blue");

  const { id } = useParams();

  const DetailBlog = allBlog.find((blog) => blog._id === id);
  //   console.log("this is DetailBlog:", DetailBlog);

  const handleLike = (id) => {
    console.log("this is id:", id);
    likePost(id);
    setColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
  };

  const handleDislike = (id) => {
    console.log("this is id:", id);
    dislikePost(id);
  };

  const handleComment = () => {
    setShowComment(!showComment);
    setTrackComments((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // CommentPost(DetailBlog._id, data.text);
    // reset();
    // setTrackComments((prev) => prev + 1);
  };

  return (
    <>
      <div className="main" style={{ backgroundColor: "#f3d7b475" }}>
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
            <strong>{DetailBlog.likeCount}</strong>
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
              onClick={() => handleLike(DetailBlog._id)}
            />
            Like
          </div>
          <div className="dislikeSetup" style={{ margin: "5px" }}>
            <SlDislike
              style={{ fontSize: "30px", padding: "4px", cursor: "pointer" }}
              onClick={() => handleDislike(DetailBlog._id)}
            />
            Dislike
          </div>

          <div className="commentSetup" style={{ margin: "5px" }}>
            <FaRegComment
              style={{ fontSize: "30px", padding: "4px", cursor: "pointer" }}
              onClick={handleComment}
              //   onClick={() => handleComment(DetailBlog._id)}
            />{" "}
            Comment
          </div>

          <div className="shareSetup" style={{ margin: "5px" }}>
            <FaRegShareSquare
              style={{ fontSize: "30px", padding: "4px", cursor: "pointer" }}
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
                Post Comment
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
      </div>
    </>
  );
}

export default Like_Comp;
