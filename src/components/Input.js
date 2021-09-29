export default function Input({title, ...props}) {
  return (
    <div>
      <label className="label block" htmlFor="input">
        {props.title}
      </label>
      <input
        {...props}
      />
      <small className="block">{props.helpText}</small>
      </div>
  );
}
