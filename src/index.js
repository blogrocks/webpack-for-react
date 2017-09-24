import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import 'fonts/material-icons.scss';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}