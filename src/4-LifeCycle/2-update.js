import React, { Component } from 'react';
import PropTypes from 'prop-types';



class UpdateHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'update test',
            age:this.props.age || 18
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('nextProps', nextProps, 'nextState', nextState);

        //only +1 setState
        if (nextProps.age === this.props.age + 1) {
            console.log('+1');
            this.setState({age: nextProps.age})
        }
    }


    componentWillUpdate() {
        console.log('componentWillUpdate');
    }


    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        let { name, age } = this.state;
        
        console.log('render...');

        return (<div>
            {`name : ${name} age : ${age}`}
        </div>)
    }

}


export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 18
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        let age = this.state.age + Math.floor(Math.random() * 3); 
        this.setState({age});
    }


    render() {
        let { age } = this.state;

        return <div>
            <UpdateHelper age={age} />
            <input type='button' onClick={this.clickHandler} value="age++" />
        </div>
    }
}

// componentWillReceiveProps =>  shouldComponentUpdate  true ? (=> componentWillUpdate => componentDidUpdate) : null