import TopBar from "../components/TopBar";
import MenuBar from "../components/MenuBar";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { overlay, setOverlay } = useTheme();
  return (
    <div>
      <TopBar />
      <div
        onClick={() => setOverlay(!overlay)}
        className={"absolute top-1/2 left-1/2 z-30"}
      >
        sdadsavdjs
      </div>
      <MenuBar />
    </div>
  );
};

export default HomePage;
