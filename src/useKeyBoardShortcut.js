import React, { useEffect, useState } from "react";

function useToggle(initialState) {
  const [bool, setBool] = useState(initialState);
  return [bool, () => setBool(bool => !bool)];
}

function shortcutIsPressed(keys, depressedKeys) {
  return depressedKeys.size === keys.length && 
  keys.every(key => depressedKeys.has(key));
}

function useKeyBoardShortcut(keys, handler) {
  const depressedKeys = useDepressedKeys();
  const [currentlyPressed, toggleCurrentlyPressed] = useToggle(shortcutIsPressed(keys, depressedKeys));
  if (shortcutIsPressed(keys, depressedKeys)) {
    if (!currentlyPressed) {
      handler();
      toggleCurrentlyPressed();
    }
  } else {
    toggleCurrentlyPressed();
  }
}

function useDepressedKeys() {
  const [keys, setKeys] = useState(new Set());

  useEffect(() => {
    const registerDown = e => {
      if (!keys.has(e.key)) {
        setKeys(keys => {
          keys.add(e.key);
          return keys;
        });
      }
    }

    const registerUp = e => {
      setKeys(keys => {
        keys.delete(e.key);
        return keys;
      });
    }

    document.addEventListener("keydown", registerDown);
    document.addEventListener("keyup", registerUp);
    return () => {
      // remove the event handlers
      document.removeEventListener("keydown", registerDown);
      document.removeEventListener("keyup", registerUp);
    }
  }, []);

  return keys;
}

// Maybe a way to get singleton behavior and only set one global listener?
let depressedKeys;

function useDepressedKeysSingleton() {
  if (depressedKeys) { return depressedKeys; }
  depressedKeys = useDepressedKeys();
  return depressedKeys;
}
