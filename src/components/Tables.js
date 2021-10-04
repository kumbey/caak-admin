export default function Tables({ styles, fullWidth, children, ...props }) {
  return (
    <table
      className={`table table_${styles} ${fullWidth ? "w-full" : ""} mt-20`}
      {...props}
    >
      {children}
    </table>
  );
}
