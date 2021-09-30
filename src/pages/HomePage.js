import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import MenuBar from "../components/MenuBar";

const HomePage = () => {
  const [overlay, setOverlay] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState("");

  useEffect(() => {
    overlay ? setOverlayStyle("overlay active") : setOverlayStyle("");
  }, [overlay]);
  return (
    <>
      <TopBar />
      <MenuBar setOverlay={setOverlay} />
    </>
  );
};

export default HomePage;
