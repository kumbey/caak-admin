export default function Avatar(props) {
    return (
        <div class="mt-4 flex flex-wrap items-center">
            <div className={`avatar w-${props.width} h-${props.height} ml-4 ${props.shadow ? "avatar_with-shadow" : ""}`}>
                <div className={`status bg-${props.statusColor}`}></div>
                <img src="assets/images/potato.jpg" alt=""/>
            </div>
        </div>
    )
}
