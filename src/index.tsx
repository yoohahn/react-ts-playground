import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import './index.css';

const rootElm = document.getElementById('body') as HTMLElement;
const render = (Component: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootElm
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => render(App));
}
