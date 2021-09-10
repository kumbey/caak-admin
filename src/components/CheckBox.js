export default function CheckBox(props) {
    return (
        <form className="mt-5">
            <label className="custom-checkbox">
                <input type="checkbox" defaultChecked={props.defaultChecked}/>
                <span></span>
                <span>Checkbox</span>
            </label>
        </form>
    )
}
