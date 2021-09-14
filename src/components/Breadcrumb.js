import React from "react";

const Breadcrumb = (props) => {
  return (
    <div className={"flex flex-col"}>
      <h1>{props.title}</h1>
      <ul className={"flex items-center"}>
        <li>
          <a href="guak">Pages</a>
        </li>
        <li className="divider la la-arrow-right" />
        <li>
          <a href="usaj">Blog</a>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
