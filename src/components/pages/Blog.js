import React from "react";
import Header from "../Header";
import Pagination from "../partials/Pagination";
import BlogRow from "../BlogRow";

const Blog = () => {
  return (
    <div className={"workspace"}>
      <Header />
      <BlogRow />
      <div className={"mt-5"}>
        <Pagination />
      </div>
    </div>
  );
};

export default Blog;
