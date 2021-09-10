export default function Input() {
    return (
        <form className="mt-5">
            <label className="label block mb-2" htmlFor="input">Label</label>
            <input id="input" type="text" className="form-control" placeholder="Enter text here"/>
            <small className="block mt-2">This is help text.</small>
        </form>
    )
}
