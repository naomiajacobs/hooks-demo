import React, {useState, useEffect} from 'react';

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
            <div className="title">With Classes</div>
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

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);

    return {value, onChange};
}

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log(width);
        }
    }, []);

    return width;
}

export function NameWithHooks() {
    const name = useFormInput('plasmid001');
    const bases = useFormInput('GATTACA');
    const width = useWindowWidth();

    useEffect(() => {
        document.title = name.value;
    }, [name]);

    return <div className="demo withHooks">
        <div className="title">With Hooks</div>
        <div>
            Name:
            <input {...name} />
        </div>
        <div>
            Bases:
            <input {...bases} />
        </div>
        <div>Width: {width}</div>
    </div>;
}