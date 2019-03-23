import React from "react";
import "./App.css";

import { NameWithHooks, NameWithClass } from "./Name";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="hooks">
          <NameWithClass />
          <NameWithHooks />
        </div>
      </header>
    </div>
  );
}

export default App;
