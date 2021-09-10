export default function Avatar(props) {
    return (
        <div className="mt-4 flex flex-wrap items-center">
            <div className={`avatar w-${props.width || 16} h-${props.height || 16} ml-4 ${props.shadow ? "avatar_with-shadow" : ""}`}>
                <div className={`status bg-${props.statusColor}`}></div>
                <img src="assets/images/potato.jpg" alt=""/>
            </div>
        </div>
    )
}
