## 1. `组件初始定义`

- getDefaultProps 得到默认属性对象，这个在ES6的时候不需要这样定义
- propTypes 属性检验规则
- mixins 组件间公用方法


## 2. `初次创建组件时调用`

- getInitialState 得到初始状态对象
- render 返回组件树. 必须设置
- componentDidMount 渲染到 dom 树中是调用，只在客户端调用，可用于获取原生节点

## 3. `组件的属性值改变时调用`

- componentWillReceiveProps 属性改变调用
- shouldComponentUpdate 判断是否需要重新渲染
- render 返回组件树. 必须设置
- componentDidUpdate 渲染到 dom 树中是调用, 可用于获取原生节点

## 4. `销毁组件`
- componentWillUnmount 组件从 dom 销毁前调用


# 创建 -> 渲染 -> 销毁
getDefaultProps()
getInitialState()
componentWillMount()
render()
componentDidMount()
componentWillUnmount()


# 当组件接收新的数据时，即组件更新时
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()


# question


1. setState 的过程 详见 test