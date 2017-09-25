import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import logo from './logo.svg';
import styles from './App.css';

@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <div styleName="App">
        <div styleName="App-header">
          <img src={logo} styleName="App-logo" alt="logo" />
          <h2>
            Welcome to React
            <i className="material-icons" styleName="favorite-icon">beach_access</i>
          </h2>
        </div>
        <p styleName="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
