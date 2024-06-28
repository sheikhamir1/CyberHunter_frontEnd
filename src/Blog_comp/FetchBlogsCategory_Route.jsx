// all hooks
import React, { useContext } from "react";
import { CreateContext6 } from "../AllContext/ContextSix";

// libraries
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Resue_Comp/LodingSpinner_Comp";
import { css } from "@emotion/react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Css
import "./CreateBlog.css";

function FetchBlogsCategory_Route() {
  const { BlogsCategory } = useContext(CreateContext6);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    navigate("/BlogsCategory/" + data.categories);
    BlogsCategory(data.categories);
    reset();
  };

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#f3d7b475",
          padding: "10px",
          margin: "0px",
        }}
      >
        Search By Category
      </h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#f3d7b475",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form.Group
          style={{ padding: "10px", textAlign: "center", width: "80%" }}
          controlId="formBasicCategory"
        >
          <Form.Select
            required
            aria-label="Default select example"
            name="categories"
            {...register("categories", {
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
        <Button
          variant="primary"
          type="submit"
          className="setupBtnOnCreateBlog"
          style={{ margin: "8px", height: "32px", padding: "0px 5px" }}
        >
          Search
        </Button>
      </Form>
    </>
  );
}

export default FetchBlogsCategory_Route;
