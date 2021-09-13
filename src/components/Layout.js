export default function Layout(props) {
    return (
        <form className="relative">
            <label
                className={`
                    label 
                    absolute 
                    block 
                    bg-${props.background}
                    ${props.border ? "border" : ""} 
                    border-${props.borderColor}-${props.borderWidth}
                    rounded
                    font-heading 
                    ${props.uppercase ? "uppercase" : ""}
                    ml-${props.left}
                `}
                htmlFor="input"
            >
                {props.children}
            </label>
            <input id="input" type="text" className={`form-control mt-${props.bottom} pt-2`} placeholder={props.placeholder}/>
        </form>
    )
}
