export default function Button(props) {
  return (
    <button
      type="button"
      className={`
                ${props.className}
                btn btn_${props.type}
                ${props.uppercase ? "uppercase" : ""} 
                ${props.outlined ? "btn_outlined" : ""} 
            `}
    >
      {props.children}
    </button>
  );
}
