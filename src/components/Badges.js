export default function Badges(props) {
    return (
        <div className={`badge ${props.outlined ? "badge_outlined" : ""} badge_${props.name} uppercase}`}>Primary</div>
    )
}
