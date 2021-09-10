import React from "react";
import CardRow from "./CardRow";

const BlogRow = () => {
  return (
    <div>
      <div className={"mb-5"}>
        <CardRow />
      </div>
      <div className={"mb-5"}>
        <CardRow />
      </div>
      <div className={"mb-5"}>
        <CardRow />
      </div>
      <div className={"mb-5"}>
        <CardRow />
      </div>
    </div>
  );
};

export default BlogRow;
