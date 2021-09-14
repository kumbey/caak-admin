import React from "react";
import Input from "../Input";
import Select from "../Select";
import Switch from "../Switch";
import TextArea from "../TextArea";
import Button from "../Button";
import Tabs from "../Tabs";
import TagInput from "../TagInput";
import FileBrowser from "../FileBrowser";

 const AddPost = () => {
    return(
        <div className="lg:flex lg:-mx-4 mt-20">
            <div className="lg:w-1/2 xl:w-3/4 lg:px-4 mt-5 ml-12">
                <div className="card p-5">
                    <div className="xl:w-1/2">
                        <div className="mb-5">
                            <Input title={"Title"}/>
                        </div>
                        <div className="mb-5">
                            <Input title={"Slug"}/>
                        </div>
                    </div>
                    <div className="mb-5">
                        <TextArea rows={16} title={"Content"} />
                    </div>
                    <div className="xl:w-1/2">
                        <TextArea rows={8} title={"Excerpt"}/>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 xl:w-1/4 lg:px-4 lg:pt-0 ml-10 mt-5 mr-12">
                <div className="card relative p-5">
                    <h3>Publish</h3>
                    <div className="flex items-center">
                        <div className="w-1/4">
                            <label className="label block">Status</label>
                        </div>
                        <div className="w-3/4">
                            <Select default={"Draft"} second={"Option"} />
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="w-1/4">
                            <label className="label block">Visibility</label>
                        </div>
                        <div className="w-3/4">
                            <Select default={"Public"} second={"Option"} />
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="w-1/4">
                            <label className="label block">Publish</label>
                        </div>
                        <div className="w-3/4">
                            <Switch text={"Immediately"}/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Button className="mr-2 " uppercase skin={"primary"}>Publish</Button>
                        <Button uppercase skin={"secondary"} outlined>Save Draft</Button>
                    </div>
                </div>
                <div className="card mt-5 p-5">
                    <h3 className="mb-3">Categories</h3>
                    <Tabs/>
                </div>
                <div className="card mt-5 p-5">
                    <h3 className="mb-3">Tags</h3>
                    <TagInput placeholder={"Enter a tag"} default={"tag"} small={"Seperate tags with commas"}/>
                </div>
                <div className="card mt-5 p-5">
                    <h3 className="mb-3">Featured Image</h3>
                    <FileBrowser />
                </div>
            </div>
            
        </div>
    )
 }

 export default AddPost;