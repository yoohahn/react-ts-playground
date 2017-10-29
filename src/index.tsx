import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './index.css';

declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const module: any;

const rootElm = document.getElementById('body') as HTMLElement;
const render = (Component: typeof App) => {
  if (__DEV__) {
    const { AppContainer } = require('react-hot-loader');
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      rootElm,
    );

    module.hot.accept('./app', () => render(App));
  }

  if (__PROD__) {
    ReactDOM.render(
      <App />,
      rootElm,
    );
  }
};

render(App);
