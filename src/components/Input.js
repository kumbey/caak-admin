export default function Input(props) {
  return (
    <form>
      <label className="label block" htmlFor="input">
        Label
      </label>
      <input
        id="input"
        type={props.type || "text"}
        className={`form-control ${props.invalid ? "is-invalid" : ""}`}
        placeholder={props.placeholder || "Placeholder"}
      />
      <small className="block">{props.helpText}</small>
    </form>
  );
}
