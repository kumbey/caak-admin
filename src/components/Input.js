export default function Input() {
    return (
        <form>
            <label className="label block" htmlFor="input">Label</label>
            <input id="input" type="text" className="form-control" placeholder="Enter text here"/>
            <small className="block">This is help text.</small>
        </form>
    )
}
