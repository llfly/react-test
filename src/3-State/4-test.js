import React ,{ Component } from 'react';

export default class StateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
        this._handleClick = this._handleClick.bind(this);
    }


    componentDidMount() {
        this.setState({val: 1});
        console.log(this.state.val);//0
        this.setState({val: 2});
        console.log(this.state.val);//0


        setTimeout(() => {
            this.setState({val: 3});
            console.log(this.state.val);//3
            this.setState({val: 4});
            console.log(this.state.val);//4
        }, 0)
    }


    _handleClick() {
        this.setState({val:5});
        console.log(this.state.val);//4
        this.setState({val:6});
        console.log(this.state.val);//4
    }


    render() {
        return (<div>
            <button onClick={this._handleClick}>Test</button>
        </div>)
    }

}

// this.setState是异步，所以在this.setState之后立即调用this.state是获取不到最新的数据的，那么怎么获取最新的数据呢？
// 三个方法：
// - 回调函数callback
// - componentDidUpdate
// - 将this.setState放入setTimeout函数中(在setTimeout函数中，在this.setState之后this.state是立即更新的，所以也可以获取到更新后的数据)


// https://github.com/facebook/react/blob/35962a00084382b49d1f9e3bd36612925f360e5b/src/renderers/shared/reconciler/ReactUpdates.js#L199

// 核心代码
function enqueueUpdate(component) {
  // ...

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}

// 若 isBatchingUpdates 为 true，则把当前组件（即调用了 setState 的组件）放入 dirtyComponents 数组中；
// 否则 batchUpdate 所有队列中的更新
// 先不管这个 batchingStrategy，例子中 setState 调用表现之所以不同，这里逻辑判断起了关键作用

// 其实 batchingStrategy 只是一个简单的对象，定义了一个 isBatchingUpdates 的布尔值，和一个 batchedUpdates 方法。
// 简化的定义代码：

var batchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
    // ...
    batchingStrategy.isBatchingUpdates = true;
    
    transaction.perform(callback, null, a, b, c, d, e);
  }
};

// 注意 batchingStrategy 中的 batchedUpdates 方法中，有一个 transaction.perform 调用。这里有个概念 —— Transaction（事务）
// https://github.com/facebook/react/blob/6d5fe44c8602f666a043a4117ccc3bdb29b86e78/src/shared/utils/Transaction.js


// 简单地说，一个所谓的 Transaction 就是将需要执行的 method 使用 wrapper 封装起来，再通过 Transaction 提供的 perform 方法执行
// 而在 perform 之前，先执行所有 wrapper 中的 initialize 方法
// perform 完成之后（即 method 执行后）再执行所有的 close 方法
// 一组 initialize 及 close 方法称为一个 wrapper，从 ASIIC 图中可以看出 Transaction 支持多个 wrapper 叠加

// 具体到实现上，React 中的 Transaction 提供了一个 Mixin 方便其它模块实现自己需要的事务
// 而要使用 Transaction 的模块，除了需要把 Transaction 的 Mixin 混入自己的事务实现中外，还需要额外实现一个抽象的 getTransactionWrappers 接口。
// 这个接口是 Transaction 用来获取所有需要封装的前置方法（initialize）和收尾方法（close）的，
// 因此它需要返回一个数组的对象，每个对象分别有 key 为 initialize 和 close 的方法。

import Transaction from 'react-dom/lib'

//var Transaction = require('./Transaction');

// 我们自己定义的 Transaction
var MyTransaction = function() {
  // do sth.
};

Object.assign(MyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function() {
    return [{
      initialize: function() {
        console.log('before method perform');
      },
      close: function() {
        console.log('after method perform');
      }
    }];
  }
});

var transaction = new MyTransaction();
var testMethod = function() {
  console.log('test');
}
transaction.perform(testMethod);

// before method perform
// test
// after method perform


// https://zhuanlan.zhihu.com/p/20328570