export default function CheckBox(props) {
  return (
    <label className={`custom-checkbox ${props.invalid ? "is-invalid" : ""}`}>
      <input type="checkbox" defaultChecked={props.checked} />
      <span />
    </label>
  );
}
