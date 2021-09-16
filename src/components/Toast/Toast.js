import React, { useEffect } from "react";
import { useToast } from "./ToastProvider";
import "./anime.css";

const Toast = ({ title, time, content, id, autoClose, removing, ...props }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    let timer = null;
    if (autoClose === true) {
      timer = setTimeout(() => {
        removeToast(id);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [id, autoClose, removeToast]);

  return (
    <div
      className={removing ? "toast removeToast mb-4" : "toast addToast mb-4"}
    >
      <div className="toast-header">
        <h5>{title}</h5>
        <small>{time}</small>
        <button
          onClick={() => {
            removeToast(id);
          }}
          type="button"
          className="close"
        >
          &times;
        </button>
      </div>
      <div className="toast-body">{content}</div>
    </div>
  );
};

export default Toast;
