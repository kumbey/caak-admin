import React, { useEffect } from "react";
import { useToast } from "./ToastProvider";
import "./anime.css";

const Toast = ({
  title,
  time,
  content,
  type,
  id,
  autoClose,
  removing,
  ...props
}) => {
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
        <span
          className={`${
            type === "delete"
              ? "las la-trash-alt text-social-pinterest"
              : type === "update"
              ? "las la-check-circle text-social-whatsapp"
              : type === "archived"
              ? "las la-box text-social-twitter"
              : ""
          } text-2xl mr-2`}
        />
        <p
          className="text-base"
          style={{
            display: "inline-block",
            width: "300px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </p>
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
      <div
        className="toast-body flex items-center"
        style={{
          display: "inline-block",
          width: "380px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Toast;
