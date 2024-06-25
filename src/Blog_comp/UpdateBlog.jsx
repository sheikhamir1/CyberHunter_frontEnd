// all hooks
import React, { useContext, useEffect, useState } from "react";
import { CreateContext2 } from "../AllContext/ContextTwo";
import { CreateContext4 } from "../AllContext/ContextFour";

// libraries
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

// bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

// icons
import { TfiWrite } from "react-icons/tfi";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import { MdNoteAdd } from "react-icons/md";

function UpdateBlog() {
  const {
    UpdateBlogId,
    updateBlogBody,
    show,
    errorShow,
    serverMsg,
    serverError,
    handleUpdateBlog,
  } = useContext(CreateContext2);

  const { setTrackPublicBlog } = useContext(CreateContext4);

  const [tags, setAddtags] = useState([]);
  const [content, setContent] = useState("");

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    reset: resetForm2,
  } = useForm();

  const removeTag = (indexToRemove) => {
    setAddtags(tags.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit2 = async (data) => {
    setAddtags([...tags, data.tags]);
    resetForm2();
    setTrackPublicBlog((prev) => prev + 1);

    // console.log("this is addTags", tags);
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors },
    reset: reset1,
    setValue: setValueForm1,
  } = useForm({});

  useEffect(() => {
    setValueForm1("title", updateBlogBody.title);
    setValueForm1("categories", updateBlogBody.categories);
    setValueForm1("isPublic", updateBlogBody.isPublic);
    setContent(updateBlogBody.content);
    setAddtags(updateBlogBody.tags);
  }, [updateBlogBody]);

  const onSubmit1 = async (data) => {
    const title = data.title;
    const categories = data.categories;
    const isPublic = data.isPublic;

    // console.log("this is addTags", tags);

    const body = {
      title,
      content,
      categories,
      isPublic,
      tags,
    };
    // console.log("addTags after sendonm the body", tags);
    // console.log("this is content in body", content);

    handleUpdateBlog(body);
    reset1();
    setContent("");
    setAddtags([]);
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
      <div className="mainSetup">
        <Form
          className="formSetupCreateBlog"
          style={{ marginBottom: "0px" }}
          onSubmit={handleSubmitForm2(onSubmit2)}
        >
          <Form.Group className="mb-3 CreateBlogGrp" controlId="formBasicTags">
            {/* <Button type="submit" style={{ display: "none" }}> */}

            <Form.Label>Add Tags</Form.Label>
            <MdNoteAdd />
            <Form.Control
              type="text"
              placeholder="use tags related to your blog then press enter"
              name="tags"
              {...registerForm2("tags")}
            />
            <div className="tags-container">
              <FaTags style={{ fontSize: "20px", marginRight: "10px" }} />
              {tags.map((tags, index) => (
                <span
                  key={index}
                  className="tag"
                  style={{
                    color: "brown",
                    fontWeight: "bold",
                  }}
                >
                  {tags}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0px",
                      marginLeft: "5px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  >
                    <IoIosCloseCircle />
                  </button>
                </span>
              ))}
            </div>
          </Form.Group>
        </Form>
      </div>

      <div className="mainSetup">
        <Form
          className="formSetupCreateBlog"
          style={{ marginTop: "0px" }}
          onSubmit={handleSubmit1(onSubmit1)}
        >
          <Form.Group className="mb-3 CreateBlogGrp" controlId="formBasicEmail">
            <Form.Label>Blog Title</Form.Label>
            <TfiWrite style={{ fontSize: "20px", marginLeft: "5px" }} />
            <Form.Control
              type="title"
              placeholder="What's on your mind?"
              name="title"
              {...register1("title", {
                required: "title is required",
                minLength: {
                  value: 2,
                  message: "title must be at least 2 characters",
                },
              })}
            />
            {errors.title && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.title.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 CreateBlogGrp" controlId="formBasicEmail">
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ direction: "rtl" }],
                  [{ color: [] }, { background: [] }],
                  ["image"],
                  [{ size: ["small", false, "large", "huge"] }],
                  [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "code-block",
                  ],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["undo", "redo"],
                  //   ["clean"],
                ],
              }}
              theme="snow"
              placeholder="What's on your mind..."
            />
          </Form.Group>

          <Form.Group
            className="mb-3 CreateBlogGrp"
            controlId="formBasicCategory"
          >
            <Form.Select
              required
              aria-label="Default select example"
              name="categories"
              {...register1("categories", {
                required: "categories is required",
              })}
            >
              <option value="">select a category</option>
              <option value="Development">Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Presonal">Presonal</option>
              <option value="Others">Others</option>
            </Form.Select>
            {errors.categories && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.categories.message}
              </span>
            )}
          </Form.Group>

          <Form.Group
            className="mb-3 CreateBlogGrp"
            controlId="formBasicCategory"
          >
            <Form.Select
              required
              aria-label="Default select example"
              name="isPublic"
              {...register1("isPublic", {
                required: "select one of the option",
              })}
            >
              <option value="">select a Post Type</option>
              <option value="true">Public</option>
              <option value="false">Private</option>
            </Form.Select>
            {errors.isPublic && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                {errors.isPublic.message}
              </span>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="setupBtnOnCreateBlog"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateBlog;
