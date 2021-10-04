export default function Select({ children, title, invalid, ...props }) {
  return (
    <div className="custom-select">
      <h4>{title}</h4>
      <select
        className={`form-control ${invalid ? "is-invalid" : ""}`}
        {...props}
      >
        {children}
      </select>
      <div className="custom-select-icon la la-caret-down" />
    </div>
  );
}
