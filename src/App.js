import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Container from "./components/Container";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitch from "./components/extra/PageSwitch";
import Carousel from "./components/Carousel/Carousel";
import Login from "./components/pages/Login";
import CreateCategory from "./pages/CreateCategory";
import CreateGroup from "./pages/CreateGroup";

function App() {
  const [overlay, setOverlay] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState("");

  useEffect(() => {
    overlay ? setOverlayStyle("overlay active") : setOverlayStyle("");
  }, [overlay]);

  return (
    <Router>
      <ThemeProvider>
        <Container>
          <PageSwitch />
        </Container>
      </ThemeProvider>
    </Router>
  );
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
          {/* <Login /> */}
          <CreateCategory></CreateCategory>
          <CreateGroup></CreateGroup>
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
