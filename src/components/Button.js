export default function Button(props) {
    return (
        <button 
            type="button" 
            className={`
                btn 
                btn_${props.style} 
                uppercase
                ${props.outlined ? "btn_outlined" : ""} 
            `}>
                {props.children}
        </button>
    )
}
