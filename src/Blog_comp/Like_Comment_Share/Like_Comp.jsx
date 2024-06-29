import React, { useState, useContext, useEffect } from "react";
import { CreateContext2 } from "../../AllContext/ContextTwo";
import { CreateContext5 } from "../../AllContext/ContextFive";
import { CreateContext4 } from "../../AllContext/ContextFour";

// libraries
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import CopyToClipboard from "react-copy-to-clipboard";

// bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardTitle from "react-bootstrap/esm/CardTitle";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

// icons
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function Like_Comp() {
  const { allBlog, setShowAlert, show, serverMsg, setServerMsg } =
    useContext(CreateContext2);
  const { likePost, dislikePost, CommentPost, handleEdit, DeleteComment } =
    useContext(CreateContext5);
  const { publicBlog } = useContext(CreateContext4);

  const [showComment, setShowComment] = useState(false);
  const [color, setColor] = useState("blue");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [shareColor, setShareColor] = useState(null);

  // track comments
  const [trackComments, setTrackComments] = useState(0);

  const { id } = useParams();

  const DetailBlog = allBlog.find((blog) => blog._id === id);
  // const DetailBlog = publicBlog.find((blog) => blog._id === id);
  // console.log("this is DetailBlog:", DetailBlog);

  // console.log("this is all blog in like comp", allBlog);

  const handleLike = (id) => {
    // console.log("this is id:", id);
    likePost(id);
    setColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
  };

  const handleDislike = (id) => {
    // console.log("this is id:", id);
    dislikePost(id);
  };

  const handleComment = () => {
    setShowComment(!showComment);
    setTrackComments((prev) => prev + 1);
  };

  // getting comments

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Please login to Fetch blog again");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}/fetchcomments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      //   console.log("fetch all comments", data);
      if (data.success === true) {
        console.log("all comment fetched");
        setComments(data.data);
      } else if (data.success === false) {
        console.log("fetch comment failed");
        console.error("Error fetching comments:", data.msg);
      }
    };

    fetchComments();
  }, [trackComments]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    CommentPost(DetailBlog._id, data.text);
    reset();
    setTrackComments((prev) => prev + 1);
  };

  // edit comment here
  const handleEditComment = (commentId, currentComment) => {
    setEditCommentId(commentId);
    setInputValue(currentComment);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    // console.log("this is edit comment id in submit", editCommentId);
    // console.log(inputValue);
    handleEdit(editCommentId, inputValue);
    setEditCommentId(null);
    setInputValue("");
    setTrackComments((prev) => prev + 1);
  };

  const handleDeleteComment = (commentId) => {
    // console.log("this is comment id for delete teh comment", commentId);
    DeleteComment(commentId);
    setTrackComments((prev) => prev + 1);
  };

  const HandleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowAlert(true);
      setServerMsg("Shared link copied to clipboard successfully");
      setTimeout(() => {
        setShowAlert(false);
        setShareColor("blue");
      }, 4000);
      setShareColor("green");
    } catch (error) {
      console.error("Failed to copy link:", error);
      setShowAlert(true);
      setServerMsg("Failed to copy shared link");
      setShareColor("red");
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  return (
    <>
      {show && (
        <Alert variant="success" style={{ textAlign: "center", margin: "0px" }}>
          {serverMsg}
        </Alert>
      )}
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
            <strong>Like</strong>
          </div>
          <div className="dislikeSetup" style={{ margin: "5px" }}>
            <SlDislike
              style={{ fontSize: "30px", padding: "4px", cursor: "pointer" }}
              onClick={() => handleDislike(DetailBlog._id)}
            />
            <strong>Dislike</strong>
          </div>

          <div className="commentSetup" style={{ margin: "5px" }}>
            <FaRegComment
              style={{ fontSize: "30px", padding: "4px", cursor: "pointer" }}
              onClick={handleComment}
            />{" "}
            <strong>Comment</strong>
          </div>

          <div className="shareSetup" style={{ margin: "5px" }}>
            <FaRegShareSquare
              style={{
                fontSize: "30px",
                padding: "4px",
                cursor: "pointer",
                color: shareColor,
              }}
              onClick={HandleShare}
            />
            <strong>Share</strong>
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
                borderRadius: "10px",
              }}
            >
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

            {comments.length === 0 ? null : (
              <CardTitle style={{ fontSize: "20px", margin: "20px" }}>
                Comments
              </CardTitle>
            )}
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
                    <Card.Text>{comment.comment}</Card.Text>
                    <hr />

                    {/* edit comment with comment id */}
                    <AiFillEdit
                      title="Click Again To Cancle Edit"
                      style={{
                        fontSize: "20px",
                        margin: "10px",
                        color: "#37a6d1",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleEditComment(comment._id, comment.comment)
                      }
                    />

                    {editCommentId === comment._id ? (
                      <>
                        <InputGroup>
                          <InputGroup.Text>Update comment</InputGroup.Text>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            name="edit"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                          />
                        </InputGroup>
                        <FaSave
                          style={{
                            fontSize: "20px",
                            margin: "10px",
                            color: "#37a6d1",
                            cursor: "pointer",
                          }}
                          onClick={handleUpdateClick}
                        />
                      </>
                    ) : null}
                    <MdDelete
                      style={{
                        fontSize: "20px",
                        margin: "10px",
                        color: "#37a6d1",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteComment(comment._id)}
                    />

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
