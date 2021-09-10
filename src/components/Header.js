import React from "react";
import Breadcrumb from "./Breadcrumb";
import SearchInput from "./SearchInput";

const Header = (props) => {

    return (
        <section className="breadcrumb lg:flex items-center">
            <Breadcrumb/>

            {/*View Sort*/}
            <div className="lg:flex items-center ml-auto mt-5 lg:mt-0">
                <div className="flex mt-5 lg:mt-0">
                    <div onClick={()=>props.setViewSortType("list")} className="btn btn-icon btn-icon_large btn_outlined btn_primary cursor-pointer">
                        <span className="la la-bars"/>
                    </div>
                    <div onClick={()=>props.setViewSortType("row")} className="btn btn-icon btn-icon_large btn_outlined btn_secondary ml-2 cursor-pointer">
                        <span className="la la-list"/>
                    </div>
                    <div onClick={()=>props.setViewSortType("column")} className="btn btn-icon btn-icon_large btn_outlined btn_secondary ml-2 cursor-pointer">
                        <span className="la la-th-large"/>
                    </div>
                </div>

                {/*Search -->*/}
                <SearchInput/>

                <div className="flex mt-5 lg:mt-0">
                    {/*Sort By -->*/}
                    <div className="dropdown lg:ml-2">
                        <button
                            className="btn btn_outlined btn_secondary uppercase"
                            data-toggle="dropdown-menu"
                        >
                            Sort By
                            <span className="ml-3 la la-caret-down text-xl leading-none"/>
                        </button>
                        <div className="dropdown-menu">
                            <a href="sda#">Ascending</a>
                            <a href="fafaas">Descending</a>
                        </div>
                    </div>

                    {/*Add New -->*/}
                    <button className="btn btn_primary uppercase ml-2">Add New</button>
                </div>
            </div>
        </section>
    );
};

export default Header;
