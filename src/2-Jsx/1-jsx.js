// JSX
// 类似 xml 的语法，用来描述组件树
import React from 'react';

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

// JSX是可选的，并不强制要求使用。如果不用JSX，用React提供的API写的话，应该是这样的，直接调用React的API来定义组件和DOM元素。

var HelloMessage2 = React.createClass({
  displayName: "HelloMessage",
  render: function() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
});

export {
    HelloMessage,
    HelloMessage2
}



