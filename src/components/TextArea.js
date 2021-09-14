export default function TextArea(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <textarea
        className={`form-control ${props.invalid ? "is-invalid" : ""}`}
        rows={props.rows}
      />
    </div>
  );
}
