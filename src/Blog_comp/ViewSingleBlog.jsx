// all hooks
import React, { useContext, useEffect, useState } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";
import { CreateContext5 } from "../AllContext/ContextFive";

// libraries
import { useParams, Link } from "react-router-dom";
import { format, set } from "date-fns";
import { useForm } from "react-hook-form";

// bootstrap components
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardTitle from "react-bootstrap/esm/CardTitle";

// icons
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { RiEditFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

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

  const { likePost, dislikePost, CommentPost } = useContext(CreateContext5);

  // using react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [color, setColor] = useState("blue");

  // console.log("this is comment:", comments);

  // track comments
  const [trackComments, setTrackComments] = useState(0);

  const { id } = useParams();
  const [showbUTTON, setShowbUTTON] = useState(false);

  const [inputValue, setInputValue] = useState("");
  // const navigate = useNavigate();

  // console.log("this is allBlog:", allBlog);
  const DetailBlog = allBlog.find((blog) => blog._id === id);
  // console.log("this is DetailBlog:", DetailBlog);

  // getting comments

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

  const handleLike = (id) => {
    // console.log("this is id:", id);
    likePost(id);
    setColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
  };

  const handleDislike = (id) => {
    // console.log("this is id:", id);
    dislikePost(id);
  };

  const handleComment = (id) => {
    setShowComment(!showComment);
    setTrackComments((prev) => prev + 1);

    // setGetCommentPostId(id);
    // console.log("this is comment id:", id);
  };

  const onSubmit = (data) => {
    // console.log(CommentData);
    // CommentPost(DetailBlog._id, CommentData.commentBody);
    CommentPost(DetailBlog._id, data.text);
    reset();
    setTrackComments((prev) => prev + 1);
  };

  // handle comment edit and delete

  const handleEditComment = (commentId) => {
    setShowbUTTON(!showbUTTON);
    console.log(commentId);
    const CommentToEdit = comments.find((comment) => comment._id === commentId);
    if (CommentToEdit) {
      setValue("text", CommentToEdit.content);
      setInputValue(CommentToEdit);
    }
    console.log(CommentToEdit);
    // console.log(text);
    // setShowInput(!showInput);
  };

  const handleEditCommentField = (e) => {
    console.log("this is working");
    console.log(inputValue);
  };

  const HandleUpdateClick = (e) => {
    e.preventDefault();
    console.log("this is working", e);
    setShowbUTTON(!showbUTTON);
  };

  // const handleDeleteComment = (id) => {
  //   // console.log(id);
  // };

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
            <Card.Title className="AllBlogCardTitle">
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
                onClick={() => handleComment(DetailBlog._id)}
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
                      {/* <AiFillEdit
                        title="Click Again To Cancle Edit"
                        style={{
                          fontSize: "20px",
                          margin: "10px",
                          color: "#37a6d1",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditComment(comment._id)}
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        style={{
                          marginTop: "10px",
                          marginRight: "10px",
                          marginLeft: "10px",
                          width: "60px",
                          height: "30px",
                          fontSize: "10px",
                        }}
                        onClick={handleEditCommentField}
                      >
                        Update
                      </Button> */}

                      {/* <Button
                        variant="danger"
                        onClick={() => handleDelete(comment._id)}
                      >
                        Delete
                      </Button> */}

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

export default SingleBlogPage;
