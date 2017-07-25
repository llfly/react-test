//(src/isomorphic/React.js)：

var React = {
    Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        toArray: ReactChildren.toArray,
        only: onlyChild,
    },
    Component: ReactComponent,                      // 用来创建 React 组件类
    PureComponent: ReactPureComponent,              // 用来创建 React 纯组件类
    createElement: createElement,                   // 创建 React 元素
    cloneElement: cloneElement,                     // 拷贝 React 元素
    isValidElement: ReactElement.isValidElement,    // 判断是否是有效的 React 元素
    PropTypes: ReactPropTypes,                      // 定义 React props 类型。(过时的API) 引入方式不是原来的 import { PropTypes } from 'react'，而变成了 import PropTypes from 'prop-types'。
    createClass: ReactClass.createClass,            // 创建 React 组件类（过时的API） 现在推荐开发者用 class 的方式继承 Component 或者 PureComponent。
    createFactory: createFactory,                   // 创建 React 工厂函数。（不建议使用）
    createMixin: function(mixin) {                  // 创建 Mixin
        return mixin;
    },
    DOM: ReactDOMFactories,                         // 主要和同构相关
    version: ReactVersion,                          // 当前使用的 React 版本号
    __spread: __spread,                             // 已废弃，直接用 Object.assign() 代替
};


// React.createElement 方法其实是调用的 ReactElement 模块的 ReactElement.createElement 方法


// Virtual DOM 是真实 DOM 的模拟，真实 DOM 是由真实的 DOM 元素构成，Virtual DOM 也是由虚拟的 DOM 元素构成。
// 真实 DOM 元素我们已经很熟悉了，它们都是 HTML 元素（HTML Element）。
// 那虚拟 DOM 元素是什么呢？React 给虚拟 DOM 元素取名叫 React 元素（React Element）。



// 我们知道，React 可以通过组合一些 HTML 原生元素形成组件，然后组件又可以被其他的组件复用。
// 所以，原生元素和组件其实在概念上都是一致的，都是具有特定功能和 UI 的可复用的元素。
// 因此，React 把这些元素抽象成了 React Element。不论是 HTML 原生元素，例如：<p></p>，<a></a>，等。
// 或者这些原生元素的组合（组件），例如 <Message /> 等。它们都是 React Element，而创建这些 Element 的方法就是 React.createElement。

// React Virtual DOM 就是由 React Element 构成的一棵树。

// 接下来我们就探究下 React Element 到底长什么样以及 React 是如何创建这些 React Element 的。


var ReactElement = function(type, key, ref, self, source, owner, props) {
    var element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
        _owner: owner,
    };
    if (__DEV__) {
        // ...
    }
    return element;
};

// ReactElement其实是一个工厂函数，接受7个参数，最终返回一个React Element对象。

