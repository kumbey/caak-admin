export default function Button({icon, type, className, large, outlined, children, uppercase, ...props}) {
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
                {...props}
            >
                <span className={`${props.icon}`} />
            </button>
        );
    }
    return (
        <button
            onClick={props.onClick}
            type={props.type || "button"}
            className={`
                ${props.className || ""}
                btn btn_${props.skin}
                ${props.uppercase ? "uppercase" : ""} 
                ${props.outlined ? "btn_outlined" : ""} 
            `}
        >
            {children}
        </button>
    );
}
