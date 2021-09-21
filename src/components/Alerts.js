import { createRef } from "react";
import animateCSS from "../assets/js/animateCSS";

const Alerts = (props) => {
  const alertRef = createRef();
  const closeAlert = (alert) => {
    alert.style.overflowY = "hidden";
    alert.style.height = alert.offsetHeight + "px";

    animateCSS(alert, "fadeOut").then(() => {
      alert.style.transitionProperty =
        "height, margin, padding, border, opacity";
      alert.style.transitionDuration = "200ms";
      alert.style.transitionTimingFunction = "linear";

      alert.style.opacity = 0;
      alert.style.height = 0;
      alert.style.marginTop = 0;
      alert.style.marginBottom = 0;
      alert.style.paddingTop = 0;
      alert.style.paddingBottom = 0;
      alert.style.border = 0;
    });
  };
  return (
    <div
      ref={alertRef}
      className={`alert alert_${props.skin || "primary"} ${
        props.outlined ? "alert_outlined" : ""
      }`}
    >
      <strong className="uppercase">{props.title}</strong>
      {props.message}
      <button
        type="button"
        className="dismiss la la-times"
        data-dismiss="alert"
        onClick={() => closeAlert(alertRef.current)}
      />
    </div>
  );
};

export default Alerts;
