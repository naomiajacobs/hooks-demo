import React from "react";

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
  return <div />;
}
