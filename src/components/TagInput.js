export default function TagInput() {
    return (
        <form className="mt-5">
            <label className="form-control-addon-within flex-row-reverse">
                <input type="text" className="form-control pl-2 border-none w-full" placeholder="Enter a tag"/>
                <span className="flex items-center pl-4">
                    <span className="badge badge_primary">
                        tag
                        <button type="button" className="focus:outline-none ml-1 la la-times"></button>
                    </span>
                </span>
            </label>
        </form>
    )
}
