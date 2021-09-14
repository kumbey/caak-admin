export default function TagInput(props) {
    return (
        <form className="mt-5">
            <label className="form-control-addon-within flex-row-reverse">
                <input type="text" className="form-control pl-2 border-none w-full" placeholder={props.placeholder}/>
                <span className="flex items-center pl-4">
                    <span className="badge badge_primary">
                        {props.default}
                        <button type="button" className="focus:outline-none ml-1 la la-times"/>
                    </span>
                </span>
            </label>
            <small className="block mt-2">{props.small}</small>
        </form>
    )
}
