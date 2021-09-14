export default function Select(props) {
  return (
    <div className="custom-select">
      <select className={`form-control ${props.invalid ? "is-invalid" : ""}`}>
        <option>{props.default}</option>
        <option>{props.second}</option>
      </select>
      <div className="custom-select-icon la la-caret-down" />
    </div>
  );
}
