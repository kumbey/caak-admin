export default function CheckBox(props) {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        defaultChecked={props.checked}
        data-toggle={props.dataToggle}
      />
      <span />
    </label>
  );
}
