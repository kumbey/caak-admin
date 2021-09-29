export default function Button({
  icon,
  skin,
  className,
  large,
  outlined,
  children,
  uppercase,
  ...props
}) {
  if (props.icon) {
    return (
      <button
        className={`
                ${className || ""}
                btn btn_${skin}
                ${icon && "btn-icon"}
                ${large && "btn-icon_large"}
                ${outlined && "btn_outlined"} 
                `}
        {...props}
      >
        <span className={`${props.icon}`} />
      </button>
    );
  }
  return (
    <button
      className={`
                ${className || ""}
                btn btn_${skin}
                ${uppercase ? "uppercase" : ""} 
                ${outlined ? "btn_outlined" : ""} 
            `}
      {...props}
    >
      {children}
    </button>
  );
}
