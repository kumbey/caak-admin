import React from "react";
import { createPortal } from "react-dom";

import Toast from "./Toast";

const ToastContainer = ({ toasts }) => {
  return createPortal(
    <div className="toasts-container top-auto lg:top-20 bottom-0 lg:bottom-auto right-0 left-0 lg:left-auto">
      {toasts.map((toasts, index) => (
        <Toast
          key={index}
          id={index}
          popOverPosition={"right"}
          skin={"primary"}
          autoClose={false}
          title={"Title"}
          {...toasts}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
