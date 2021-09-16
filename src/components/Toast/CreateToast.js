import React from "react";
import Button from "../Button";

import { useToast } from "./ToastProvider";

const CreateToast = (props) => {
  const { addToast } = useToast();

  return (
    <div className="animated infinite bounce mt-20" style={{ padding: "24px" }}>
      <Button
        uppercase
        skin="primary"
        onClick={() => {
          addToast(props.content);
        }}>Add Toast</Button>
    </div>
  );
};

export default CreateToast;
