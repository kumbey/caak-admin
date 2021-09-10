export default function Badges(props) {
  return (
    <div
      className={`badge ${props.outlined ? "badge_outlined" : ""} badge_${
        props.skin || "primary"
      } ${props.uppercase} ${props.badgeStyle}`}
    >
      {props.children}
    </div>
  );
}
