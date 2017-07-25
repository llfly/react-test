import React,{ Component } from 'react';
import PropTypes from 'prop-types';


export default class Mount extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'mountTest'
        }
    }

    /*
    getDefaultProps(){
        // Warning: getDefaultProps was defined on LifeCycle, a plain JavaScript class.
        // This is only supported for classes created using React.createClass.
        // Use a static property to define defaultProps instead.
        console.log('get default props');
    }
    */

    componentWillMount() {
        console.log('component will mount');
    }
    componentDidMount() {

        setTimeout(()=>this.setState({
            name : 'mountTest2'
        }),2000);

        console.log('component did mount');
    }


    shouldComponentUpdate(){
        console.log('should component update');
        return false;
    }


    componentWillUpdate(){
        console.log('component will update');
    }


    componentDidUpdate(){
        console.log('component did update');
    }

    render(){
        let { name } = this.state;
        let { age } = this.props;

        return (
            <div>
                {`name : ${name} age : ${age}`}
            </div>
        )
    }
}



//if shouldComponentUpdate return true
//component will mount
//component did mount
//should component update
//component will update
//component did update
//else
//component will mount
//component did mount
//should component update


Mount.propTypes = {
    age : PropTypes.number
}


Mount.defaultProps = {
    age : 23
}
