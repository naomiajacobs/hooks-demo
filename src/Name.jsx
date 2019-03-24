import React, { useEffect, useState } from "react";

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

export function NameWithHooks() {
  const [name, setName] = useState("Naomi");
  const updateName = e => setName(e.target.value);
  useEffect(() => (document.title = name));

  const [favoriteColor, setFavoriteColor] = useState("teal");
  const updateFavoriteColor = e => setFavoriteColor(e.target.value);

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // second parameter is optional, would be fine without it

  return (
    <div
      className="demo withHooks"
      style={{ backgroundColor: favoriteColor }}
    >
      <div className="title">With Classes</div>
      <div className="inputWrapper">
        Name:
        <input value={name} onChange={updateName} />
      </div>
      <div className="inputWrapper">
        Fave Color:
        <input value={favoriteColor} onChange={updateFavoriteColor} />
      </div>
      <div>Width: {width}</div>
    </div>
  );
}
