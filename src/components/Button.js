export default function Button(props) {
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