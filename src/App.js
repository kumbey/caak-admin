import {useEffect, useState} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import Container from "./components/Container";
import {BrowserRouter as Router} from "react-router-dom";
import PageSwitch from "./components/extra/PageSwitch";

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
                    <PageSwitch/>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
