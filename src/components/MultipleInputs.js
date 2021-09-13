export default function MultipleInputs(props) {
    return (
        <div className="input-group">
            <div className="input-addon input-addon-prepend input-group-item">{props.children}</div>
            <input type="text" className="form-control input-group-item" placeholder={props.placeholder1}/>
            <input type="text" className="form-control input-group-item" placeholder={props.placeholder2}/>
        </div>
    )
}
