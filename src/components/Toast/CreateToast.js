import React from "react";

import { useToast } from "./ToastProvider";

const CreateToast = () => {
  const { addToast } = useToast();

  return (
    <div className="animated infinite bounce" style={{ padding: "24px" }}>
      <button
        className="btn btn_primary uppercase"
        onClick={() => {
          addToast("NEW TOAST HERE");
        }}
      >
        add toast
      </button>
      <button
        className="btn btn_primary uppercase"
        onClick={() => {
          addToast("NEW TOAST HERE 1");
        }}
      >
        add toast
      </button>
      <button
        className="btn btn_primary uppercase"
        onClick={() => {
          addToast("NEW TOAST HERE 2");
        }}
      >
        add toast
      </button>
    </div>
  );
};

export default CreateToast;
