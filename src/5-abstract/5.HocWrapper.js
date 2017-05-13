/*
higher-order

higher-order function(高阶函数) ：这种函数接受函数作为输入，或是输出一个函数。比如，常用的工具方法 map、reduce 和 sort 等都是高阶函数。
高阶组件（higher-order component），类似于高阶函数，它接受 React 组件作为输入，输出一个新的 React 组件。

hocFactory:: W: React.Component => E: React.Component

通俗的讲：当 React 组件被包裹时（wrapped），高阶组件会返回一个增强（enhanced）的 React 组件。
可以想象，高阶组件让我们的代码更具有复用性、逻辑性与抽象特性。它可以对 render 方法作劫持，也可以控制 props 与 state。


实现高阶组件的方法：

- 属性代理(props proxy) 高阶组件通过包裹的 React 组件来操作 props

- 反向继承(inheritance inversion) 高阶组件继承于被包裹的 React 组件
*/



//属性代理

import React, {Component} from 'react';

const MyContainer = (WrappedComponent) =>
    class extends Component{
        render(){
            const newProps = {
                name:'test'
            };

            return <WrappedComponent {...this.props} {...newProps}/>;
        }
    }



//use

class MyComponent extends Component{
    render(){
        return <div>MyComponent,{this.props.name}</div>
    }
}

//这样组件就可以一层层地作为参数被调用，原始组件就具备了高阶组件对它的修饰。
//就这么简单，保持单个组件封装性的同时还保留了易用性。
export default MyContainer(MyComponent);


//通过 decorator 来转换

// 简单地替换成作用在类上的 decorator，即接收需要装饰的类为参数，返回一个新的内部类。
// 这与高阶组件的定义完全一致。因此，可以认为作用在类上的 decorator 语法糖简化了高阶组件的调用。


/*
@MyContainer
class MyComponent extends Component {
    render() {

        console.log(MyComponent);
        return null
    }
}
export default MyComponent;
*/