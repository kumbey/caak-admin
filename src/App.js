import { ThemeProvider } from "./context/ThemeContext";
import Container from "./components/Container";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitch from "./components/extra/PageSwitch";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Container>
          <PageSwitch />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
