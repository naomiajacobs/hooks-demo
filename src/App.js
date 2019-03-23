import React, { useState } from "react";
import "./App.css";

import { NameWithHooks, NameWithoutHooks } from "./Name";

function App() {
  const [showHooks, setShowHooks] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <span className={"toggleHooks"}>
          <button type="checkbox" onClick={() => setShowHooks(!showHooks)}>
            {showHooks ? "HIDE HOOKS" : "SHOW HOOKS"}
          </button>
        </span>
        <div className="hooks">
          <NameWithoutHooks />
          {showHooks && <NameWithHooks />}
        </div>
      </header>
    </div>
  );
}

export default App;
