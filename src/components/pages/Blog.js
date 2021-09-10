import React from "react";
import Header from "../Header";
import Pagination from "../partials/Pagination";
import BlogRow from "../BlogRow";
import BlogCardList from "../BlogCardList";
import BlogColumn from "../BlogColumn";

const Blog = () => {
  const [viewSortType, setViewSortType] = React.useState("list");
  const viewSort = () => {
    if (viewSortType === "list") {
      return <BlogCardList />;
    } else if (viewSortType === "row") {
      return <BlogRow />;
    } else return <BlogColumn />;
  };
  return (
    <div className={"workspace"}>
      <Header setViewSortType={setViewSortType} />
      {viewSort()}
      <div className={"mt-5"}>
        <Pagination />
      </div>
    </div>
  );
};

export default Blog;
