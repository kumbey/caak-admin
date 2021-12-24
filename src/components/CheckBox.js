export default function Checkbox({
  id,
  handleClick,
  checked,
  className,
  onClick,
  title,
  label,
  ...props
}) {
  return (
    <div>
      <h4 className="mb-2">{title}</h4>
      <label className={`custom-checkbox ${props.invalid ? "is-invalid" : ""}`}>
        <input
          id={id}
          type="checkbox"
          onChange={handleClick}
          checked={checked}
          className={className}
          onClick={onClick}
          {...props}
        />
        <span className="mr-2" />
        <p className="text-base">{label}</p>
      </label>
    </div>
  );
}
