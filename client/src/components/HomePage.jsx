import React, { useState, useEffect } from "react";
import { useDeleteblogMutation, useGetBlogsQuery } from "../redux/api/blogApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./layout/Header";

function HomePage() {
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || undefined;
  const [viewMode, setViewMode] = useState("grid");
  const params = { keyword };
  const { data, error } = useGetBlogsQuery(params);
  const navigate = useNavigate();
  console.log(data);
  const [deleteblog, { isError }] = useDeleteblogMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const handleDelete = (id) => {
    if (isError) {
      alert("Delete Option available only for the owner");
    }
    deleteblog(id);

    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="blogs_heading" className="text-secondary mt-5 text-center">
            Latest Blogs
          </h1>
          <button
            className={` mx-3 btn btn-outline-primary ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={` btn btn-outline-primary ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>

          <section id="blogs" className="mt-3">
            <div className="row">
              {data?.data?.length === 0 ? (
                <h3 className="text-center">No Active Blogs</h3>
              ) : (
                data?.data.map((blog) => (
                  <div
                    className={`col-sm-12 ${
                      viewMode === "grid" ? "col-md-6 col-lg-3" : "col-md-12"
                    } my-3`}
                    key={blog._id}
                  >
                    <div className="card p-3 rounded" key={blog?._id}>
                      <div className="card-body ps-3 d-flex flex-column">
                        <h1 className="card-title">{blog.title}</h1>
                        <p className="card-descripyion">{blog.description}</p>

                        <Link
                          to={`/blogs/${blog?._id}`}
                          id="view_btn"
                          className="btn btn-block align-self-center"
                        >
                          View Details
                        </Link>
                        {isAuthenticated && (
                          <>
                            <Link
                              to={`/posts/update/${blog?._id}`}
                              id="view_btn"
                              className="btn btn-block mt-3 align-self-center"
                            >
                              Update Blog
                            </Link>
                            <Link
                              to={`/`}
                              onClick={() => {
                                handleDelete(blog?._id);
                              }}
                              id="view_btn"
                              className="btn btn-block mt-3 align-self-center"
                            >
                              Delete Blog
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default HomePage;
