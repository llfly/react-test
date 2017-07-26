# React第四讲课堂笔记（定义组件）

用 `React.createClass` 或者 `React.Component` 定义组件时允许传入相应的配置及组件 `API` 的使用，包括组件生命周期提供的一系列钩子函数。



## 5. `示例`

```

export default LifeCycle;

```

调用组件并销毁组件示例
```
import React, { Component } from 'react';
import LifeCycleDemo from './LifeCycleDemo';

class DestroyComponent extends Component {

  state = {
    value:1,
    destroyed:false
  }

  increase = () => {
    this.setState({
      value: this.state.value + 1
    });
  }

  destroy = () => {
    this.setState({
      destroyed: true
    });
  }

  render() {
    if(this.state.destroyed){
        return null;
    }

    return <div>
      <p>
        <button onClick={this.increase}>每次加1</button>
        <button onClick={this.destroy}>干掉这两个按钮</button>
      </p>
      <LifeCycleDemo value={this.state.value}/>
    </div>;
  }
}

export default DestroyComponent;

```
