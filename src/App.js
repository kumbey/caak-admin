import React from "react";
import TopBar from "./components/TopBar";
import Avatar from "./components/Avatar";
import Badges from "./components/Badges";
import Breadcrumb from "./components/Breadcrumb";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";
import DropDown from "./components/DropDown";
import Dropzone from "./components/Dropzone";
import FileBrowser from "./components/FileBrowser";
import Header from "./components/Header";
import Input from "./components/Input";
import Popover from "./components/Popover";
import Radio from "./components/Radio";
import RangeSlider from "./components/RangeSlider";
import Rating from "./components/Rating";
import Search from "./components/Search";
import SearchInput from "./components/SearchInput";
import Select from "./components/Select";
import Switch from "./components/Switch";
import Tables from "./components/Tables";
import TagInput from "./components/TagInput";
import TextArea from "./components/TextArea";
import TipOver from "./components/TipOver";
import Blog from "./components/pages/Blog";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import TabsComp from "./components/TabsComp";
import BasicInput from "./components/BasicInput";
import MultipleInputs from "./components/MultipleInputs";
import ButtonAddons from "./components/ButtonAddons";
import MultipleAddons from "./components/MultipleAddons";

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <Login />
      <Register />
      <Blog />
      <Avatar avatarStyle={"m-4"} shadow />
      <Badges outlined skin={"danger"} badgeStyle={" m-4"}>
        Badge
      </Badges>
      <Breadcrumb />
      <Button
        skin={"primary"}
        icon={"las la-lg la-star"}
        className={"w-12 h-12 bg-blue"}
      />
      <CheckBox checked />
      <DropDown
        split
        uppercase
        icon={"la la-star"}
        iconStyle={"ml-2 text-lg"}
        skin={"primary"}
      >
        DropDown
      </DropDown>
      <Dropzone />
      <FileBrowser />
      <Header />
      <Input />
      <Popover
        popOverPosition={"right"}
        skin={"primary"}
        title={"Popover Title"}
        content={"Here’s some amazing content. It’s very engaging. Right?"}
      >
        Hello PopOver
      </Popover>
      <Radio />
      <RangeSlider />
      <Rating />
      <Search />
      <SearchInput />
      <Select />
      <Switch />
      <Tables />
      <TagInput />
      <TextArea />
      <TipOver 
        skin={"primary"} 
        tipOverPosition={"right"} 
        content={"teeestiing content "} 
        title={"skraaaaaa"}>
        Hello TipOver
      </TipOver>
      <TabsComp/>
      <BasicInput placeholder={"placeholder text here"}>.link</BasicInput>
      <MultipleInputs placeholder1={"Skratta name here"} placeholder2={"Skraa name here"}>Skratta bolon Skraaa</MultipleInputs>
      <ButtonAddons placeholder={"placeholder shv"}>Click</ButtonAddons>
      <MultipleAddons placeholder={"asdsad"} input1={"asdasd"} input2={"input2"}/>
    </React.Fragment>
  );
}

export default App;
