export default function FileBrowser(props) {
    return (
        <div>
            <label className="input-group text-base font-normal" htmlFor="customFile">
                <div
                    className="file-name input-addon input-addon-prepend input-group-item w-full overflow-x-hidden">
                        No file chosen</div>
                    <input id="customFile" type="file" className="hidden"/>
                    <div className="input-group-item btn btn_primary uppercase">Choose File</div>
            </label>
        </div>
    )
}
