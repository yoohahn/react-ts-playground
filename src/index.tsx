import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";

declare const __DEV__: boolean;
declare const module: {
  hot: { accept: (file: string, fn: () => void) => void };
};

const rootElm = document.getElementById("body") as HTMLElement;
const render = (Component: typeof App) => {
  if (__DEV__) {
    const { AppContainer } = require("react-hot-loader");
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      rootElm
    );

    module.hot.accept("./app", () => render(Component));
  }

  if (!__DEV__) {
    ReactDOM.render(<Component />, rootElm);
  }
};

render(App);
