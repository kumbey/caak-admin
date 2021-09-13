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
import CardRow from "./components/CardRow";
import CardColumn from "./components/CardColumn";
import CardImage from "./components/CardImage";
import CardIcon from "./components/CardIcon";
import CardShowcase from "./components/CardShowcase";
import CardBlank from "./components/CardBlank";
import Alerts from "./components/Alerts";
import Collapse from "./components/Collapse";
import Layout from "./components/Layout";
import Accordion from "./components/Accordion";

function App() {
  const darkModeRef = React.createRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(true);
  return (
    <React.Fragment>
      <TopBar darkModeRef={darkModeRef} />
      <Login />
      <Register />
      <Blog />
      <Accordion/>
      <Alerts skin={"primary"} title={"DONE"} message={"This is message"} />
      <Alerts
        outlined
        skin={"danger"}
        title={"DONE"}
        message={"This is message"}
      />
      <Avatar avatarStyle={"m-4"} shadow />
      <Badges outlined skin={"danger"} badgeStyle={"m-4"}>
        Badge
      </Badges>
      <Breadcrumb />
      <Button
        skin={"primary"}
        icon={"las la-lg la-star"}
        className={"w-12 h-12 bg-blue"}
      />
      <CardRow />
      <div className={"w-96"}>
        <CardColumn />
      </div>
      <CardImage />
      <CardIcon />
      <CardShowcase />
      <CardBlank />
      <CheckBox checked />
      <Collapse open closeCollapse={isOpen} setIsOpen={setIsOpen} />
      <Collapse closeCollapse={isOpen} setIsOpen={setIsOpen} />
      <Button onClick={toggle}>Close all collapses</Button>
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
      <Input
        invalid
        placeholder={"New PLace holder"}
        helpText={"Please add correct"}
      />
      <Popover
        popOverPosition={"right"}
        skin={"primary"}
        title={"Popover Title"}
        content={"Here’s some amazing content. It’s very engaging. Right?"}
      >
        Hello PopOver
      </Popover>
      <Radio invalid />
      <RangeSlider />
      <Rating />
      <Search />
      <SearchInput />
      <Select />
      <Switch />
      <Tables styles={"striped"} />
      <TagInput />
      <TextArea rows={5} />
      <TipOver />
      <Layout placeholder={"placeholder"} uppercase background={"white"} bottom={"2"} left={"5"}>Basic</Layout>
      <Layout placeholder={"placeholder"} uppercase border borderWidth={"300"} borderColor={"red"} bottom={"2"} background={'white'} left={"5"}>Border</Layout>
      <Layout placeholder={"placeholder"} uppercase left={"5"}>Inbox</Layout>
    </React.Fragment>
  );
}

export default App;
