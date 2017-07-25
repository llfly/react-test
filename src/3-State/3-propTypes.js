import React, { Component } from 'react';
import PropTypes from 'prop-types';
//通过指定 propTypes 可以校验props属性值的类型，校验可提升开发者体验，用于约定统一的接口规范


class Demo extends Component {
    render() {
        return <b>{this.props.title}</b>
    }
}

Demo.defaultProps = {
    title: '默认的title'
}


Demo.propTypes = {
    title: PropTypes.string.isRequired
}



export default class PropTypesDemo extends Component {

    render() {
        return <Demo title={123}/>
    }
}


