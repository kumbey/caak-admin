import { ThemeProvider } from "./context/ThemeContext";
import Container from "./components/Container";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitch from "./components/extra/PageSwitch";
import ToastProvider from "./components/Toast/ToastProvider";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Container>
          <ToastProvider>
            <PageSwitch />
          </ToastProvider>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
