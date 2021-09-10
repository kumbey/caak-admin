export default function Radio(props) {
    return (
            <form className="mt-5">
                <label className="custom-radio">
                    <input type="radio" name="radio"/>
                    <span></span>
                    <span>Radio</span>
                </label>
                <label className="custom-radio mt-2">
                    <input type="radio" name="radio" defaultChecked={props.defaultChecked}/>
                    <span></span>
                    <span>Radio Checked</span>
                </label>
            </form>
    )
}
