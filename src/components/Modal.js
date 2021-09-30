import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import ReactDOM from "react-dom";

export default function Modal({
  children,
  submitBtnName,
  onSubmit,
  show,
  onClose,
  side,
  type,
  modalType,
  title,
  content,
  ...props
}) {
  const { setOverlay, overlay } = useTheme();
  useEffect(() => {
    show ? setOverlay(true) : setOverlay(false);
  }, [show]);
  return ReactDOM.createPortal(
    <form onSubmit={onSubmit}>
      <div
        onClick={onClose}
        className={`modal ${side ? "modal_aside" : ""} ${
          show
            ? side
              ? "active animate__animated animate__faster animate__fadeInRight"
              : "active animate__animated animate__faster animate__fadeInDown"
            : ""
        }`}
        {...props}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`modal-dialog modal-dialog${
            modalType ? "_" : ""
          }${modalType} max-w-2xl`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
              <button
                onClick={onClose}
                type="button"
                className="close la la-times"
                data-dismiss="modal"
              />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <div className="flex ml-auto">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn btn_secondary uppercase"
                  data-dismiss="modal"
                >
                  Хаах
                </button>
                <button type={type} className="btn btn_primary ml-2 uppercase">
                  {submitBtnName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>,
    document.body
  );
}
