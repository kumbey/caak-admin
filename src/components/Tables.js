export default function Tables({ styles, fullWidth, children, ...props }) {
  return (
    <table
      className={`table table_${styles} ${fullWidth ? "w-full" : ""} mt-20`}
      {...props}
    >
      <thead>
        <tr>
          <th className="text-left uppercase">Нэр</th>
          <th className="text-left uppercase">Зураг</th>
          <th className="text-left uppercase">Үүссэн огноо</th>
          <th className="text-left uppercase">Зассан огноо</th>
          <th className="text-left uppercase">Засах</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
