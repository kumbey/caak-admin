export default function Switch(props) {
    return (
            <form className="mt-5">
                <label className={`switch ${props.outlined ? "switch_outlined" : ""}`}>
                    <input type="checkbox" defaultChecked={props.defaultChecked}/>
                    <span></span>
                    <span>Switched On</span>
                </label>
            </form>
    )
}
