import { createRef, useState } from "react";
import TopBar from "./components/TopBar";
// import Avatar from "./components/Avatar";
// import Badges from "./components/Badges";
// import Breadcrumb from "./components/Breadcrumb";
// import Button from "./components/Button";
// import CheckBox from "./components/CheckBox";
// import DropDown from "./components/DropDown";
// import Dropzone from "./components/Dropzone";
// import FileBrowser from "./components/FileBrowser";
// import Header from "./components/Header";
// import Input from "./components/Input";
// import Popover from "./components/Popover";
// import Radio from "./components/Radio";
// import RangeSlider from "./components/RangeSlider";
// import Rating from "./components/Rating";
// import SearchAndSelect from "./components/SearchAndSelect";
// import SearchInput from "./components/SearchInput";
// import Select from "./components/Select";
// import Switch from "./components/Switch";
// import Tables from "./components/Tables";
// import TagInput from "./components/TagInput";
// import TextArea from "./components/TextArea";
// import TipOver from "./components/TipOver";
// import Blog from "./components/pages/Blog";
// import Login from "./components/pages/Login";
// import Register from "./components/pages/Register";
// import CardRow from "./components/CardRow";
// import CardColumn from "./components/CardColumn";
// import CardImage from "./components/CardImage";
// import CardIcon from "./components/CardIcon";
// import CardShowcase from "./components/CardShowcase";
// import CardBlank from "./components/CardBlank";
// import Alerts from "./components/Alerts";
// import Collapse from "./components/Collapse";
// import Layout from "./components/Layout";
// import Accordion from "./components/Accordion";
// import Modal from "./components/Modal";
import Tabs from "./components/Tabs/Tabs";
import CreateToast from "./components/Toast/CreateToast";
import ToastProvider from "./components/Toast/ToastProvider";
import MenuBar from "./components/MenuBar";
import { ThemeProvider } from "./context/ThemeContext";
import Container from "./components/Container";

function App() {
  const darkModeRef = createRef();
  const menuBarRef = createRef();
  const menuItemsRef = createRef();
  const [isOpen, setIsOpen] = useState(false);
  // const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggle = () => setIsOpen(true);

  return (
    <>
      <ThemeProvider>
        <Container>
          <TopBar darkModeRef={darkModeRef} menuBarRef={menuBarRef} />
          <MenuBar
            menuBarRef={menuBarRef}
            darkModeRef={darkModeRef}
            menuItemsRef={menuItemsRef}
          />
          <main className="workspace">
            <Tabs />
            <ToastProvider>
              <CreateToast />
            </ToastProvider>
          </main>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
