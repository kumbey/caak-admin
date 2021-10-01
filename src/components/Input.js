export default function Input({
  label,
  helpText,
  error,
  errorMessage,
  ...props
}) {
  return (
    <div>
      <h4>{props.title}</h4>
      <input className="form-control" {...props} />
      {error && <small className={"text-red"}>{errorMessage}</small>}
      <small className="block">{helpText}</small>
    </div>
  );
}
