export default function Input({ label, helpText, ...props }) {
  return (
    <div>
      <label className="label block">{label}</label>
      <input className="form-control" {...props} />
      <small className="block">{helpText}</small>
    </div>
  );
}
