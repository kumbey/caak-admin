export default function CheckBox(props) {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        defaultChecked={props.checked}
      />
      <span />
    </label>
  );
}
