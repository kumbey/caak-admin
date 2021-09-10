import React from "react";
import Login from "./components/Login";
import TopBar from "./components/TopBar";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <ForgotPassword />
    </React.Fragment>
  );
}

export default App;
