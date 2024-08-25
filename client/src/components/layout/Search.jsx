import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    searchParams.has("keyword") && setKeyword(searchParams.get("keyword"));
  }, [searchParams]);

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Post Name ..."
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;
