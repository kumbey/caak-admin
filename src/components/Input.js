export default function Input({
  label,
  helpText,
  error,
  errorMessage,
  width,
  ...props
}) {
  return (
    <div>
      <h4 className={`mb-2 ${width}`}>{label}</h4>
      <input className="form-control" {...props} />
      {error && <small className={"text-red"}>{errorMessage}</small>}
      <small className="block">{helpText}</small>
    </div>
  );
}
