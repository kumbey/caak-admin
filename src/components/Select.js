export default function Select({ children, ...props }) {
  return (
    <div className="custom-select">
      <h4>{props.title}</h4>
      <select
        onChange={props.onChange}
        className={`form-control ${props.invalid ? "is-invalid" : ""}`}
      >
        {children}
      </select>
      <div className="custom-select-icon la la-caret-down" />
    </div>
  );
}
