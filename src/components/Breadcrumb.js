import React from "react";

const Breadcrumb = () => {
  return (
    <div className={"flex flex-col"}>
      <h1>Blog</h1>
      <ul className={"flex items-center"}>
        <li>
          <a href="guak">Pages</a>
        </li>
        <li className="divider la la-arrow-right" />
        <li>
          <a href="usaj">Blog</a>
        </li>
        <li className="divider la la-arrow-right" />
        <li>List</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
