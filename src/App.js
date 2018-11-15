import React, { Component } from 'react';
import './App.css';

import {NameWithHooks, NameWithoutHooks} from './Name';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {hide: false}
    }
  render() {
    return (
      <div className="App">
          <button type='checkbox' onClick={() => this.setState({hide: !this.state.hide})}>HIDE HOOKS</button>
        <header className="App-header">
          <NameWithoutHooks/>
          {!this.state.hide && <NameWithHooks/>}
        </header>
      </div>
    );
  }
}

export default App;
