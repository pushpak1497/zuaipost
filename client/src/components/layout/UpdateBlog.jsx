import React, { useState } from "react";
import { useUpdateblogMutation } from "../../redux/api/blogApi";

import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEmptyerror, setIsEmptyError] = useState(false);
  const navigate = useNavigate();
  const [updateblog, { isLoading }] = useUpdateblogMutation();
  const handleUpdate = (e) => {
    e.preventDefault();

    if (title === "" && description === "") {
      setIsEmptyError(true);
    } else if (title === "" && description !== "") {
      updateblog({ id: params.id, description });
      navigate("/");
    } else if (title !== "" && description === "") {
      updateblog({ id: params.id, title });
      navigate("/");
    }
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleUpdate}>
          <h2 className="mb-4">Update Post</h2>
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
            {isLoading ? "Updating....." : "Update Post"}
          </button>
          {isEmptyerror && <p>*Please change Title or description</p>}
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
