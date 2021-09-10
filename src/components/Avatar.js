export default function Avatar(props) {
  return (
    <div
      className={`avatar w-${props.width || 16} h-${props.height || 16} ${
        props.shadow ? "avatar_with-shadow" : ""
      } ${props.avatarStyle}`}
    >
      <div className={`status bg-${props.statusColor || "green"} `} />
      <img
        src="../assets/images/potato.jpg"
        alt="avatar"
        className={props.imageStyle}
      />
    </div>
  );
}
