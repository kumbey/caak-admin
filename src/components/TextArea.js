export default function TextArea(props) {
  return (
    <textarea
      className={`form-control ${props.invalid ? "is-invalid" : ""}`}
      rows={props.rows}
    />
  );
}
