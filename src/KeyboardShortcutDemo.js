import React, {useState} from 'react';

import useKeyboardShortcut from './useKeyBoardShortcut';

function Shortcut({keys}) {
  const active = useKeyboardShortcut(keys);
  return <div style={{color: active ? 'red' : 'white'}}>{keys.join(' ')}</div>;
}

export default function KeyboardShortcutDemo() {
  return (<div>
    <Shortcut keys={['a']} />
    <Shortcut keys={['b']} />
    <Shortcut keys={['c']} />
    <Shortcut keys={['m', 'a']} />
    <Shortcut keys={['A']} />
  </div>);
}
