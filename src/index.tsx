import React from "react";
import ReactDOM from "react-dom/client";
import "./application/css/index.css";
import LoginContainer from "./module/login/page/login.container";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginContainer />
  </React.StrictMode>
);
