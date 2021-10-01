export default function Input({
  label,
  helpText,
  error,
  errorMessage,
  ...props
}) {
  return (
    <div>
      <label className="label block">{label}</label>
      <input className="form-control" {...props} />
      {error && <small className={"text-red"}>{errorMessage}</small>}
      <small className="block">{helpText}</small>
    </div>
  );
}
