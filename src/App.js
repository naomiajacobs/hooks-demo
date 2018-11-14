import React, { Component } from 'react';
import './App.css';

import {NameWithHooks, NameWithoutHooks} from './Name';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NameWithoutHooks/>
          <NameWithHooks/>
        </header>
      </div>
    );
  }
}

export default App;
