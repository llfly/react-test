// 纯函数，PureRender 中的 Pure 指的就是组件满足纯函数的条件，即组件的渲染是被相同的 props 和 state 渲染进而得到相同的结果。
// 这个概念与上述给定相同的输入，它总是返回相同的输出一致。


// 1. pureRender 的本质


// 怎么实现 PureRender 的过程呢？官方在早期就为开发者提供了名为 react-addons-pure-render-mixin 的插件。
// 其原理为重新实现了 shouldComponentUpdate 生命周期方法，让当前传入的 props和 state 与之前的作浅比较，如果返回 false，那么组件就不会执行 render 方法。
// 这里讲到了用 shouldComponentUpdate 来作性能优化的方法。在理想情况下，不考虑 props 和 state 的类型，那么要作到充分比较，只能通过深比较，但是它实在是太昂贵了：


/*
shouldComponentUpdate(nextProps, nextState) {
    // 太昂贵了
    return isDeepEqual(this.props, nextProps) &&
        isDeepEqual(this.state, nextState);
}
*/

// 然而，PureRender 对 object 只作了引用比较，并没有作值比较。对于实现来说，这是一个取舍问题。
// PureRender 源代码中只对新旧 props 作了浅比较。以下是 shallowEqual 的示例代码：


function shallowEqual(obj, newObj) {
    if (obj === newObj) {
        return true;
    }
    const objKeys = Object.keys(obj);
    const newObjKeys = Object.keys(newObj);
    if (objKeys.length !== newObjKeys.length) {
        return false;
    }
    // 关键代码，只需关注 props 中每一个是否相等，无需深入判断
    return objKeys.every(key => {
        return newObj[key] === obj[key];
    });
}


// 2. 运用 PureRender
// 利用 createClass 构建组件时，可以使用官方的插件，其名为 react-addons-pure-render-mixin。
// 此外，用 ES6 classes 语法一样可以使用这个插件，比如：

import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
class App extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return <div className={this.props.className}>foo</div>;
    }
}

// 当然，我们也可以用前面介绍的 decorator 来实现，其中 pure-render-decorator 库已经帮我们实现了所需要的功能。
// 在组件化开发过程中，要尽可能地满足 Pure，这样才能保证对相应的变更作出最少的渲染。



// 3. 优化 PureRender
// 在使用 React 写组件的过程中，PureRender 可能是最重要也是最常见的性能优化方法。
// 试想在数据可变的情况下，深比较的成本是相当昂贵的。但事实上，浅比较可以覆盖的场景并不是那么多。
// 如果说 props 或 state 中有以下几种类型的情况，那么无论如何，它都会触发 PureRender 为true。

// 直接为 props 设置对象或数组

// 我们知道，每次调用 React 组件其实都会重新创建组件。
// 就算传入的数组或对象的值没有改变，它们引用的地址也会发生改变。比如，下面为 Account 组件设置一个 style prop：

// <Account style={{ color: 'black' }} />
// 这样设置 prop，则每次渲染时 style 都是新对象。对于这样的赋值操作，我们只需要提前赋值成常量，不直接使用字面量即可。
// 再比如，我们为 style prop 设置一个默认值也是一样的道理：

// <Account style={this.props.style || {}} />
// 此时，我们只需要将默认值保存成同一份引用，就可以避免这个问题：

// const defaultStyle = {};
// <Account style={this.props.style || defaultStyle} />
// 同样，像在 props 中为对象或数据计算新值会使 PureRender 无效：

// <Item items={this.props.items.filter(item => item.val > 30)} />
// 我们可以马上想到始终让对象或数组保持在内存中就可以增加命中率。
// 但保持对象引用不符合函数式编程的原则，这为函数带来了副作用，Immutable.js 可以优雅地解决这类问题。

设置 props 方法并通过事件绑定在元素上

这与 2.1.2 节讲述的是同一件事，只是从优化的角度重新提起。比如：

import React, { Component } from 'react';

class MyInput extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.update(e.target.value);
    }

    render() {
        return <input onChange={this.handleChange} />;
    }
}
我们不用每次都绑定事件，因此把绑定移到构造器内。如果绑定方法需要传递参数，那么可 以考虑通过抽象子组件或改变现有数据结构解决。

设置子组件

对于设置了子组件的 React 组件，在调用 shouldComponentUpdate 时，均返回 true。为什么呢？下面以 NameItem 组件为例来介绍：

import React, { Component } from 'react';
class NameItem extends Component {
    render() {
        return (
            <Item>
                <span>Arcthur</span>
                <Item/>
                )
                }
                }
                上面的子组件 JSX 部分翻译过来，其实是：

                <Item
                    children={React.createElement('span', {}, 'Arcthur')}
                />
                显然，Item 组件不论什么情况下都会重新渲染。那么，怎么避免 Item 组件的重复渲染呢？很简单，我们给 NameItem 设置 PureRender，也就是说提到父级来判断：

                import React, { Component } from 'react';
                import PureRenderMixin from 'react-addons-pure-render-mixin';

                class NameItem extends Component {
                constructor(props) {
                super(props);

                this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
            }

                render() {
                return (
                <Item>
                <span>Arcthur</span>
                </Item>
                );
            }
            }
                如果 NameItem 再加兄弟组件，Item 组件不得不被影响到，解决方法同样是将 Item 抽象的 NameItem 提出。