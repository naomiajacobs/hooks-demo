import React from 'react';

export class NameWithoutHooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'plasmid001',
            bases: 'GATTACA',
            width: window.innerWidth,
        };

        this.handleResize = this.handleResize.bind(this);
        this.updateBases = this.updateBases.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.title = this.state.name;
    }

    componentDidUpdate() {
        document.title = this.state.name;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({width: window.innerWidth});
    }

    updateName(e) {
        this.setState({name: e.target.value});
    }

    updateBases(e) {
        this.setState({bases: e.target.value});
    }

    render() {
        return <div className="demo withoutHooks">
            <div className="title">WITHOUT HOOKS</div>
            <div>
                Name:
                <input value={this.state.name} onChange={this.updateName} />
            </div>
            <div>
                Bases:
                <input value={this.state.bases} onChange={this.updateBases} />
            </div>
            <div>Width: {this.state.width}</div>
        </div>;
    }
}

export function NameWithHooks() {
    return <div className="demo withHooks">
        <div className="title">WITH HOOKS</div>
    </div>;
}