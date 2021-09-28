import { useEffect } from "react";
import { hideOverlay, showOverlay } from "../assets/js/menu";

export default function Modal(props) {
  useEffect(() => {
    props.show ? showOverlay(true) : hideOverlay();
  }, [props.show]);

  return (
    <div
      onClick={props.onClose}
      className={`modal ${props.side ? "modal_aside" : ""} ${
        props.show
          ? props.side
            ? "active animate__animated animate__faster animate__fadeInRight"
            : "active animate__animated animate__faster animate__fadeInDown"
          : ""
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal-dialog modal-dialog${props.type ? "_" : ""}${
          props.type
        } max-w-2xl`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{props.title}</h2>
            <button
              onClick={props.onClose}
              type="button"
              className="close la la-times"
              data-dismiss="modal"
            />
          </div>
          <div className="modal-body">{props.content}</div>
          <div className="modal-footer">
            <div className="flex ml-auto">
              <button
                onClick={props.onClose}
                type="button"
                className="btn btn_secondary uppercase"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn_primary ml-2 uppercase">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
