import React from "react";
import CardColumn from "./CardColumn";

const BlogColumn = () => {
  return (
    <div className="sm:flex sm:flex-wrap sm:-mx-4">
      <div className="sm:flex sm:w-1/2 xl:w-1/4 mb-5 sm:px-4">
        <CardColumn />
      </div>
      <div className="sm:flex sm:w-1/2 xl:w-1/4 mb-5 sm:px-4">
        <CardColumn />
      </div>
      <div className="sm:flex sm:w-1/2 xl:w-1/4 mb-5 sm:px-4">
        <CardColumn />
      </div>
      <div className="sm:flex sm:w-1/2 xl:w-1/4 mb-5 sm:px-4">
        <CardColumn />
      </div>
    </div>
  );
};

export default BlogColumn;
