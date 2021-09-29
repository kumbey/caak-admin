import { createRef, useState, useEffect } from "react";
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
import Carousel from "./components/Carousel/Carousel";
import Login from "./components/pages/Login"

function App() {
  const darkModeRef = createRef();
  const menuBarRef = createRef();
  const menuItemsRef = createRef();

  const [overlay, setOverlay] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState("");

  useEffect(() => {
    overlay ? setOverlayStyle("overlay active") : setOverlayStyle("");
  }, [overlay]);

  return (
    <>
      <ThemeProvider>
        <Container>
          {/* <TopBar darkModeRef={darkModeRef} menuBarRef={menuBarRef} /> */}
          {/* <MenuBar
            overlay={overlay}
            setOverlay={setOverlay}
            overlayStyle={overlayStyle}
            setOverlayStyle={setOverlayStyle}
            menuBarRef={menuBarRef}
            darkModeRef={darkModeRef}
            menuItemsRef={menuItemsRef}
          /> */}
          <Login/>
          {/* <main className={`workspace ${overlayStyle}`}>
            <Tabs />
            <ToastProvider>
              <CreateToast />
            </ToastProvider>
            <Carousel show="4" margin={10} />
          </main> */}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
