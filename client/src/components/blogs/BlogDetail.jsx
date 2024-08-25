import React from "react";
import { useGetBlogDetailsQuery } from "../../redux/api/blogApi";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const params = useParams();
  const { data } = useGetBlogDetailsQuery(params.id);
  // console.log(data);
  return (
    <div className="row p-5">
      <div className="col-12 col-lg-5 ">
        <h1>
          Title:
          {data?.data?.title}
        </h1>

        <hr />

        <h3 className="mt-2">Description:</h3>
        <p>{data?.data?.description}</p>
      </div>
    </div>
  );
}

export default BlogDetail;
