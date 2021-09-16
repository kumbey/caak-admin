export default function Input(props) {
  return (
    <div>
      <label className="label block" htmlFor="input">
        {props.title}
      </label>
      <input
        type={props.type || "text"}
        className={`form-control ${props.invalid ? "is-invalid" : ""}`}
        placeholder={props.placeholder}
      />
      <small className="block">{props.helpText}</small>
      </div>
  );
}
