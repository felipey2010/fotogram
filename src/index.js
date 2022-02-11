import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import Context from "./utils/Context";
import { SnackbarProvider } from "notistack";
import Collapse from "@mui/material/Collapse";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Collapse}>
      <Context>
        <App />
      </Context>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
