import React from "react";

const Label = ({
  toggleCollapse,
  collapseRef,
  ref,
  label,
  activeIndex,
  ...props
}) => {
  return (
    <button
      ref={ref}
      onClick={() => {
        props.onClick(props.index);
        activeIndex !== props.index && toggleCollapse(collapseRef.current);
      }}
      className={`${
        activeIndex === props.index ? "active" : ""
      } nav-link h5 uppercase`}
      data-toggle="tab"
    >
      {label}
    </button>
  );
};
export default Label;
