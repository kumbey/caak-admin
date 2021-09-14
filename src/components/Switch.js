export default function Switch(props) {
    return (
            <form className="flex">
                <label className={`switch ${props.outlined ? "switch_outlined" : ""}`}>
                    <input type="checkbox" defaultChecked={props.defaultChecked}/>
                    <span></span>
                    <span>{props.text}</span>
                </label>
            </form>
    )
}
