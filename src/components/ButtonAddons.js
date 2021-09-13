export default function ButtonAddons(props) {
    return (
        <div className="input-group">
            <input type="text" className="form-control input-group-item" placeholder={props.placeholder}/>
            <button className="btn btn_primary uppercase input-group-item">{props.children}</button>
        </div>
    )
}
