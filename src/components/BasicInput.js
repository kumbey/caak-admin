export default function BasicInput(props) {
    return (
        <div className="input-group">
            <input type="text" className="form-control input-group-item" placeholder={props.placeholder}/>
            <div className="input-addon input-addon-append input-group-item">{props.children}</div>
        </div>
    )
}
