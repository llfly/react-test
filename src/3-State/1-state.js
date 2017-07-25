import React, { Component } from 'react';


// 可以把组件当成一个状态机，我们给组件传入数据作为输入，组件在内部进行逻辑处理，之后返回一段HTML结构作为输出。
// 而传入的数据即为props，组件内部的状态控制即为state，每一次状态对应于组件的一个 ui 。

export default class StateDemo extends Component {

  state = {
    secondsElapsed: 0
  }

  tick(){
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  }

  componentDidMount(){
    this.interval = setInterval( this.tick.bind(this), 1000 );
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    return (
      <div>目前已经计时：{this.state.secondsElapsed}秒</div>
    )
  }
}