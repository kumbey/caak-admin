export default function TextArea({ children, invalid, title, ...props }) {
  return (
    <div>
      <h4>{title}</h4>
      <textarea
        className={`form-control ${invalid ? "is-invalid" : ""}`}
        {...props}
      >
        {/*{children}*/}
      </textarea>
    </div>
  );
}
