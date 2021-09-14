import React from "react";
import Breadcrumb from "../Breadcrumb";
import Button from "../Button";
import CardColumn from "../CardColumn";
import CardIcon from "../CardIcon";
import CardImage from "../CardImage";
import DropDown from "../DropDown";
import Dropzone from "../Dropzone";
import Pagination from "../partials/Pagination";
import SearchInput from "../SearchInput";

const Media = () => {
    return(
        <div className="mt-24  mr-10 ml-10">
            <div className="lg:flex items-center justify-end ml-auto mt-5 lg:mt-0">
                <div className="mr-5">
                    <SearchInput/>
                </div>
                <DropDown
                    uppercase
                    icon={"la la-caret-down "}
                    iconStyle={"ml-2 text-lg"}
                    skin={"secondary"}
                    outlined
                >
                    sort by
                </DropDown>
            </div>
            <div className="card lg:flex p-4 mt-5">
                <Button uppercase skin={"primary"}>
                    <span class="la la-sync text-xl leading-none mr-2"></span>
                    refresh
                </Button>
                <div class="lg:flex ml-auto mt-2 lg:mt-0">
                    <Button className="mr-2" uppercase skin={"primary"}>
                        <span class="la la-upload text-xl leading-none mr-2"></span>
                        upload
                    </Button>
                    <Button className="mr-2" uppercase skin={"primary"}>
                        <span class="la la-folder-plus text-xl leading-none mr-2"></span>
                        new folder
                    </Button>
                    <Button className="mr-2" uppercase skin={"primary"}>
                        <span class="la la-random text-xl leading-none mr-2"></span>
                        move
                    </Button>
                    <Button className="mr-2" uppercase skin={"primary"}>
                        <span class="la la-redo-alt text-xl leading-none mr-2"></span>
                        rename
                    </Button>
                    <Button uppercase skin={"danger"}>
                        <span class="la la-trash text-xl leading-none mr-2"></span>
                        remove
                    </Button>
                </div>
            </div>
            <div className="card lg:flex p-4 mt-5">
                <Breadcrumb/>
            </div>


            {/*/item*/}
            <div className="lg:flex lg:-mx-4 mt-5">
                <div className="lg:w-3/4">
                    <div className="sm:flex sm:flex-wrap  h-5/6">
                        <CardIcon title={"Potato"}/>
                        <CardIcon title={"Tomato"}/>
                        <CardIcon title={"Onion"}/>
                        <CardIcon title={"Potato.mp3"} icon={"music"}/>
                        <CardIcon title={"Tomato.mp4"} icon={"video"}/>
                        <CardIcon title={"Onion.pdf"} icon={"file"}/>
                        <CardImage title={"Potato.jpg"} image={"breakfast"}/>
                        <CardImage title={"Tomato.jpg"} image={"pepper"}/>
                        <CardImage title={"Onion.jpg"} image={"onion"}/>
                        <CardImage title={"Potato.jpg"} image={"potato"}/>
                        <CardImage title={"Taomato.jpg"} image={"tomato"}/>
                    </div>
                </div>
                <div className="lg:w-1/4 ml-5">
                    <CardColumn/>
                    <div className="card p-5 mt-5">
                        <Dropzone title={"Dropzone"}/>
                    </div>
                </div>
                
            </div>
            <div className="mt-5 mb-5">
                <Pagination/>
            </div>
        </div>
    )
}

export default Media