export default function Tables(styles, fullWidth, children, ...props) {
  return (
    <table
      className={`table table_${styles} ${fullWidth ? "w-full" : ""} mt-20`}
      {...props}
    >
      <thead>
        <tr>
          <th className="text-left uppercase">#</th>
          <th className="text-left uppercase">First</th>
          <th className="text-left uppercase">Last</th>
          <th className="text-left uppercase">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>John</td>
          <td>Doe</td>
          <td>
            <a href="#edit">
              <i class="las la-edit text-2xl "></i>
            </a>
            <a href="#del">
              <i class="las la-trash-alt text-2xl ml-4"></i>
            </a>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>John</td>
          <td>Doe</td>
          <td>
            <a href="#edit">
              <i class="las la-edit text-2xl "></i>
            </a>
            <a href="#del">
              <i class="las la-trash-alt text-2xl ml-4"></i>
            </a>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>John</td>
          <td>Doe</td>
          <td>
            <a href="#edit">
              <i class="las la-edit text-2xl "></i>
            </a>
            <a href="#del">
              <i class="las la-trash-alt text-2xl ml-4"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
