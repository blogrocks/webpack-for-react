import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div class={styles.app}>
        <div class={styles.appHeader}>
          <img src={logo} class={styles.appLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p class={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
