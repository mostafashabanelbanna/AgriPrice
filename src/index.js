import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import App from "./App";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: "rtl",
});

ReactDOM.render(
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);
