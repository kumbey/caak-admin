import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Container from "./components/Container";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitch from "./components/extra/PageSwitch";
import CreateCategory from "./pages/CreateCategory";
import CreateGroup from "./pages/CreateGroup";

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
