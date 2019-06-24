import React, { useEffect, useState } from "react";

function shortcutIsPressed(keys, depressedKeys) {
  // Means it'll return for multiple ones at once
  return keys.every(key => depressedKeys.has(key));
}

/**
 * 
 * @param {keys: Array<string>, handleOn: () => void, handleOff: () => void()} shortcuts 
 */
export function useKeyboardShortcuts(shortcuts) {

}

export default function useKeyboardShortcut(keys) {
  const depressedKeys = useDepressedKeys();
  console.log('keys: ', depressedKeys);
  const [currentlyPressed, setCurrentlyPressed] = useState(false);
  if (shortcutIsPressed(keys, depressedKeys)) {
    if (!currentlyPressed) {
      setCurrentlyPressed(true);
    }
  } else {
    if (currentlyPressed) {
      setCurrentlyPressed(false);
    }
  }
  return currentlyPressed;
}

function useDepressedKeys() {
  const [keys, setKeys] = useState(new Set());

  useEffect(() => {
    const registerDown = e => {
      if (!e.repeat && !keys.has(e.key)) {
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
    console.log('added listeners');
    return () => {
      // remove the event handlers
      document.removeEventListener("keydown", registerDown);
      document.removeEventListener("keyup", registerUp);
      console.log('removed listeners');
    }
  }, []);

  return keys;
}

