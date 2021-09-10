export default function ButtonIcon(props) {
  if (props.icon) {
    return (
      <button
        type={props.type || "button"}
        className={`
                ${props.className || ""}
                btn btn_${props.skin}
                ${props.icon ? "btn-icon" : ""}
                ${props.large ? "btn-icon_large" : ""}
                ${props.outlined ? "btn_outlined" : ""} 
            `}
      >
        <span className={`la ${props.icon}`} />
      </button>
    );
  }
  return (
    <button
      type={props.type || "button"}
      className={`
                ${props.className || ""}
                btn btn_${props.skin}
                ${props.uppercase ? "uppercase" : ""} 
                ${props.outlined ? "btn_outlined" : ""} 
            `}
    >
      {props.children}
    </button>
  );
}
