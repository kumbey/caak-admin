export default function Select(props) {
  return (
    <div className="custom-select">
      <select className={`form-control ${props.invalid ? "is-invalid" : ""}`}>
        <option>Select</option>
        <option>Option</option>
      </select>
      <div className="custom-select-icon la la-caret-down" />
    </div>
  );
}
