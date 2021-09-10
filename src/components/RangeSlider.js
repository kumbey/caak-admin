export default function RangeSlider() {
    return (
        <form className="mt-5">
            <input type="range" min="1" max="100" defaultValue="50" className="custom-range"/>
        </form>
    )
}
