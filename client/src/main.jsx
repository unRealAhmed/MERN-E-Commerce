import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Sidebarcontext from "./context/Sidebarcontext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sidebarcontext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Sidebarcontext>
  </React.StrictMode>
);
