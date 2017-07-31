import React,{ Component } from 'react';
import PropTypes from 'prop-types';


export default class Mount extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'mountTest'
        }
    }

    
    // getDefaultProps(){
    //     // Warning: getDefaultProps was defined on LifeCycle, a plain JavaScript class.
    //     // This is only supported for classes created using React.createClass.
    //     // Use a static property to define defaultProps instead.
    //     console.log('get default props');
    // }
    

    componentWillMount() {
        console.log('component will mount');
    }

    componentDidMount() {
        //进行 window 对象操作 以及 ajax 请求
        // 两秒后调用 mountTest2 触发 update
        setTimeout(()=>this.setState({
            name : 'mountTest2'
        }),2000);

        console.log('component did mount');
    }


    shouldComponentUpdate(){
        // 在初始化时或者使用 forceUpdate 时不被执行
        console.log('should component update');
        return false;//return true;
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
        console.log('render...');
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