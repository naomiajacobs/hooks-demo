import React, { useEffect, useState } from "react";
import _ from "underscore";

export class NameWithClass extends React.Component {
  state = {
    name: "Naomi",
    favoriteColor: "teal",
    width: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    document.title = this.state.name;
  }

  componentDidUpdate() {
    document.title = this.state.name;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => this.setState({ width: window.innerWidth });

  updateName = e => this.setState({ name: e.target.value });

  updateFavoriteColor = e => this.setState({ favoriteColor: e.target.value });

  render() {
    return (
      <div
        className="demo withoutHooks"
        style={{ backgroundColor: this.state.favoriteColor }}
      >
        <div className="title">With Classes</div>
        <div className="inputWrapper">
          Name:
          <input value={this.state.name} onChange={this.updateName} />
        </div>
        <div className="inputWrapper">
          Fave Color:
          <input
            value={this.state.favoriteColor}
            onChange={this.updateFavoriteColor}
          />
        </div>
        <div>Width: {this.state.width}</div>
      </div>
    );
  }
}

function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);
  return { value, onChange };
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // second parameter is optional, would be fine without it
  return width;
}

function ToggleableInput(props) {
  const inputProps = _.omit(props, "expandedInput");
  return props.expandedInput ? (
    <textarea rows="10" cols="60" {...inputProps} />
  ) : (
    <input {...inputProps} />
  );
}

function useKeyboardShortcut(keys, callback) {
  const [depressedKeys, setDepressedKeys] = useState(new Set([]));
  useEffect(
    () => {
      const registerKeyDown = e => {
        if (!depressedKeys.has(e.key))
          setDepressedKeys(depressedKeys.add(e.key));
      };
      const registerKeyUp = e => {
        depressedKeys.delete(e.key);
        setDepressedKeys(depressedKeys);
      };
      document.addEventListener("keydown", registerKeyDown);
      document.addEventListener("keyup", registerKeyUp);
      return () => {
        document.removeEventListener("keydown", registerKeyDown);
        document.removeEventListener("keyup", registerKeyUp);
      };
    },
    [depressedKeys, setDepressedKeys]
  );
  if (
    keys.length === depressedKeys.size &&
    keys.every(key => depressedKeys.has(key))
  ) {
    callback();
  }
}

export function NameWithHooks() {
  const name = useInputValue("Naomi");
  useEffect(
    () => {
      document.title = name.value;
    },
    [name.value]
  );

  const favoriteColor = useInputValue("teal");
  const width = useWindowWidth();

  const [expandedInput, setExpandedInput] = useState(true);

  useKeyboardShortcut(["Control", "c"], () => {
    if (expandedInput) setExpandedInput(false);
  });
  useKeyboardShortcut(["Control", "e"], () => {
    if (!expandedInput) setExpandedInput(true);
  });

  return (
    <div
      className="demo withHooks"
      style={{ backgroundColor: favoriteColor.value }}
    >
      <div className="title">With Classes</div>
      <div className="inputWrapper">
        Name:
        <ToggleableInput {...name} expandedInput={expandedInput} />
      </div>
      <div className="inputWrapper">
        Fave Color:
        <ToggleableInput {...favoriteColor} expandedInput={expandedInput} />
      </div>
      <div>Width: {width}</div>
    </div>
  );
}
