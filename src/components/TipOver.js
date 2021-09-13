import React from "react";
import Tippy from "@tippyjs/react";

export default function TipOver(props) {
  return (
    <div>
      <Tippy
        theme={"light-border tooltip "}
        offset={[0, 12]}
        interactive={true}
        allowHTML={true}
        placement={props.tipOverPosition}
        animation={"shift-toward-extreme"}
        content={
          <div>
            <h5>{props.title}</h5>
            <div className={"mt-5"}>{props.content}</div>
          </div>
        }
      >
        <button
          type="button"
          className={`btn btn_${props.skin} ${props.uppercase}`}
        >
          {props.children}
        </button>
      </Tippy>
    </div>
  );
}
