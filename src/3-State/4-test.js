import React ,{ Component } from 'react';

//state 的 set 过程 ？ 

export default class StateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
        this._handleClick = this._handleClick.bind(this);
    }


    componentDidMount() {
        this.setState({val: 1});
        console.log(this.state.val);//0
        this.setState({val: 2});
        console.log(this.state.val);//0


        setTimeout(() => {
            this.setState({val: 3});
            console.log(this.state.val);//3
            this.setState({val: 4});
            console.log(this.state.val);//4
        }, 0)
    }


    _handleClick() {
        this.setState({val:5});
        console.log(this.state.val);//4
        this.setState({val:6});
        console.log(this.state.val);//4
    }


    render() {
        return (<div>
            <button onClick={this._handleClick}>Test</button>
        </div>)
    }

}

