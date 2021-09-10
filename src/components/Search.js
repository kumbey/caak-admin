export default function Search() {
    return (
        <form className="search-select mt-5">
            <label className="form-control-addon-within flex-row-reverse" data-toggle="search-select">
                <input 
                    type="text" 
                    className="form-control pl-2 border-none w-full" 
                    placeholder="Search"
                />
                <span className="flex items-center pl-4">
                    <span className="badge badge_primary">
                        Pokhara
                        <button type="button" className="ml-1 la la-times"></button>
                    </span>
                </span>
            </label>
            <div className="search-select-menu">
                <h6 className="uppercase">Nepal</h6>
                <div className="item">Kathmandu</div>
                <div className="item active">Pokhara</div>
                <div className="item">Lumbini</div>
                <h6 className="uppercase">India</h6>
                <div className="item">Delhi</div>
                <div className="item">Mumbai</div>
                <div className="item">Karnataka</div>
            </div>
        </form>
    )
}
