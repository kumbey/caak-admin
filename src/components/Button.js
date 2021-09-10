export default function Button(props) {
    return (
        <button 
            type="button" 
            className={`
                btn btn_${props.style} 
                ${props.uppercase ? "uppercase" : ""} 
                ${props.outlined ? "btn_outlined" : ""} 
            `}>
                Primary
        </button>
    )
}
