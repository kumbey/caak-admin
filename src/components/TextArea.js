export default function TextArea({ children, ...props }) {
  return (
    <div>
      <h4>{props.title}</h4>
      <textarea
        onChange={props.onChange}
        value={props.value}
        className={`form-control ${props.invalid ? "is-invalid" : ""}`}
        rows={props.rows}
        {...props}
      >
        {children}
      </textarea>
    </div>
  );
}
