import React, { Component } from 'react';

class Demo extends Component {
  defaultProps = {
    title: '这是默认的title属性值'
  }

  render(){
    // 通过 this.props 可以获取传递给该组件的属性值，还可以通过定义 getDefaultProps 来指定默认属性值
    //（这是ES5的写法，ES6定义组件的默认props可以直接写props）
    console.log(this.props);
    return <b>{this.props.title}</b>
  }
}


class Demo2 extends Component {
    render(){
    // 通过 this.props 可以获取传递给该组件的属性值，还可以通过定义 getDefaultProps 来指定默认属性值
    //（这是ES5的写法，ES6定义组件的默认props可以直接写props）
    console.log(this.props);
    return <b>{this.props.title}</b>
  }
}

Demo2.defaultProps = {
    title:'test'
}

export default class PropDemo extends Component {
    render() {
        return (<div>
            <Demo title="设置标题"/>
            <Demo2/>
        </div>)
    }
}


