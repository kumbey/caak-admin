import React from "react";

const List = ({ items, ...props }) => {
  var dragging = null;
  return (
    <ul
      id="sortable-style-1"
      className="sortable"
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {}}
      onDragStart={(event) => {
        dragging = event.target;
        event.dataTransfer.setData("text/html", dragging);
      }}
      onDrop={(event) => {
        event.preventDefault();
        console.log("event.target.id => ", event.target.id);
        console.log("dragging.id => ", dragging.id);
        if (event.target.style["border-bottom"] !== "") {
          event.target.style["border-bottom"] = "";
          props.insertItem(event.target.id, dragging.id, true);
        } else {
          event.target.style["border-top"] = "";
          props.insertBefore(event.target.id, dragging.id, false);
        }
      }}
    >
      {items.map((item) => (
        <li draggable id={item.id} key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
