export default function ButtonIcon(props) {
    return (
        <button 
            type="button" 
            className={`
                btn 
                btn-icon
                ${props.large ? "btn-icon_large" : ""}
                btn_${props.style}
                ${props.outlined ? "btn_outlined" : ""} 
            `}
        >
            <span className="la la-star"></span>
        </button>
    )
}
