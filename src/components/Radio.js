export default function Radio(props) {
  return (
    <label className={`custom-radio ${props.invalid ? "is-invalid" : ""}`}>
      <input type="radio" name="radio" defaultChecked={props.defaultChecked} />
      <span />
      <span>Radio Checked</span>
    </label>
  );
}
