export default function MultipleAddons(props) {
    return (
        <div className="input-group">
            <input type="text" className="form-control input-group-item" placeholder={props.placeholder}/>
            <div className={`input-addon input-addon-append input-group-item`}>{props.input1}</div>
            <div className={`input-addon input-addon-append input-group-item`}>{props.input2}</div>
        </div>
    )
}
