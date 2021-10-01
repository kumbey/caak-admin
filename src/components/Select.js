export default function Select({ children, ...props }) {
  return (
    <div className="custom-select">
      <select className={`form-control ${props.invalid ? "is-invalid" : ""}`}>
        {children}
      </select>
      <div className="custom-select-icon la la-caret-down" />
    </div>
  );
}
