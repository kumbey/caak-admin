export default function Button(props) {
    if (props.icon) {
        return (
            <button
                type={props.type || "button"}
                className={`
                ${props.className || ""}
                btn btn_${props.skin || "primary"}
                ${props.icon ? "btn-icon" : ""}
                ${props.large ? "btn-icon_large" : ""}
                ${props.outlined ? "btn_outlined" : ""} 
            `}
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
                btn btn_${props.skin || "primary"}
                ${props.uppercase ? "uppercase" : ""} 
                ${props.outlined ? "btn_outlined" : ""} 
            `}
        >
            {props.children}
        </button>
    );
}
