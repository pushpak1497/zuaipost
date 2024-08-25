import React, { useEffect, useState } from "react";
import { useCreateblogMutation } from "../../redux/api/blogApi";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createblog, { isLoading, error }] = useCreateblogMutation();
  const navigate = useNavigate();
  const handleCreate = (e) => {
    e.preventDefault();
    createblog({
      title,
      description,
    });
    navigate("/");
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleCreate}>
          <h2 className="mb-4">Create Post</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={description}
              rows="4"
              cols="20"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating....." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
