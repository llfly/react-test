import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

console.log(PureRenderMixin);


// class MixinTest extends Component {
//     render() {
//         return <div>mixinTest</div>
//     }
// }
const mountMixin = {
    componentDidMount(){
        console.log('mountMixin componentDidMount');
    },
    componentWillMount(){
        console.log('mountMixin componentWillMount');
    }
}

const logMixin = {
    log : ()=>console.log('log mixin'),
    componentDidMount(){
        console.log('logMixin componentDidMount')
    }
}


export default React.createClass({
    mixins:[PureRenderMixin,mountMixin,logMixin],

    render(){
        return <div>
            mixinTest
            <input type="button" value="log" onClick={this.log}/>
        </div>
    }
})

/*

在 createClass 对象参数中传入数组 mixins，里面封装了我们所需要的模块。
mixins 数组也可以增加多个 mixin，其每一个 mixin 方法之间的有重合，对于普通方法和生命周期方法是有所区分的。

在不同的 mixin 里实现两个名字一样的普通方法，按理说，后面的方法应该会覆盖前面的方法。
那么，在 React 中是否一样会覆盖呢？事实上，它并不会覆盖，而是在控制台里报了一个在 ReactClassInterface 里的错误，
指出你尝试在组件中多次定义一个方法，这会造成冲突。因此，在 React 中是不允许出现重名普通方法的 mixin。

如果是 React 生命周期定义的方法，则会将各个模块的生命周期方法叠加在一起顺序执行。

我们看到，使用 createClass 实现的 mixin 为组件做了两件事。

- 工具方法。这是 mixin 的基本功能，如果你想共享一些工具类方法，就可以定义它们，直接在各个组件中使用。

- 生命周期继承，props 与 state 合并。这是 mixin 特别重要的功能，它能够合并生命周期方法。
如果有很多 mixin 来定义 componentDidMount 这个周期，那么 React 会非常智能地将它们都合并起来执行。
同样，mixin 也可以作用在 getInitialState 的结果上，作 state 的合并，而 props 也是这样合并的。
 */





