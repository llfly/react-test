import React ,{Component} from 'react';
//反向继承：


const MyContainer = (WrappedComponent) =>
    class extends WrappedComponent{
        render (){
            return super.render();
        }
    }

/*

 高阶组件返回的组件继承于 WrappedComponent。
 因为被动地继承了 WrappedComponent，所有的调用都会反向，这也是这种方法的由来。

 这种方法与属性代理不太一样。
 它通过继承 WrappedComponent 来实现，方法可以通过 super 来顺序调用。因为依赖于继承的机制，HOC 的调用顺序和队列是一样的：

 didmount → HOC didmount → (HOCs didmount) → will unmount → HOC will unmount → (HOCs will unmount)

 在反向继承方法中，高阶组件可以使用 WrappedComponent 引用，这意味着它可以使用WrappedComponent 的 state、props 、生命周期和 render 方法。
 但它不能保证完整的子组件树被解析。

*/

/*

- 渲染劫持
渲染劫持指的就是高阶组件可以控制 WrappedComponent 的渲染过程，并渲染各种各样的结果。
我们可以在这个过程中在任何 React 元素输出的结果中读取、增加、修改、删除 props，或读取或修改 React 元素树，或条件显示元素树，又或是用样式控制包裹元素树。


正如之前说到的，反向继承不能保证完整的子组件树被解析，这意味着将限制渲染劫持功能。
渲染劫持的经验法则是我们可以操控 WrappedComponent 的元素树，并输出正确的结果。
但如果元素树中包括了函数类型的 React 组件，就不能操作组件的子组件。
*/


//----------------------------------------------------------------------------------------------------------------------------------------
// 条件渲染
const MyContainer1 = (WrappedComponent) =>
    class extends WrappedComponent{
        render(){
            if(this.props.loggedIn){
                return super.render();
            }else {
                return (<div>
                    <div className="title">渲染劫持-修改render:</div>
                    you need to login
                </div>)
            }
        }
    }


@MyContainer1
class MyComponentDecorators1 extends Component{
    render(){
        return <div>{this.props.text}</div>
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------
// 对 render 输出结果改造

const MyContainer2 = (WrappedComponent) =>
    class extends WrappedComponent{
        render(){
            const elementsTree = super.render();
            let newProps = {};

            if(elementsTree && elementsTree.type === 'input'){
                newProps = {value:'may the force be with you'};
            }
            const props = Object.assign({},elementsTree.props,newProps);
            const newElementsTree = React.cloneElement(elementsTree,props,elementsTree.props.children);
            return (<div>
                <div className="title">渲染劫持-修改参数:</div>
                {newElementsTree}
            </div>)
        }
    }



@MyContainer2
class MyComponentDecorators2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            value :''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({
            value : event.target.value
        })
    }

    render(){
        return <input type="text" value={this.state.value} onChange={this.onChange}/>
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------
// 控制 state

/*

高阶组件可以读取、修改或删除 WrappedComponent 实例中的 state，如果需要的话，也可以增加 state。
但这样做，可能会让 WrappedComponent 组件内部状态变得一团糟。
大部分的高阶组件都应该限制读取或增加 state，尤其是后者，可以通过重新命名 state，以防止混淆。

*/

const MyContainer3 = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>HOC Debugger Component</h2>
                    <p>Props</p><pre>{JSON.stringify(this.props, null, 2)}</pre>
                    <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
                    {super.render()}
                </div>
            );
        }
    }


@MyContainer3
class MyComponentDecorators3 extends Component {
    render() {
        return <div>{this.props.text}</div>
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------
// 组件命名
//当包裹一个高阶组件时，我们失去了原始 WrappedComponent 的 displayName，而组件名字是方便我们开发与调试的重要属性。
//react-redux

/*

HOC.displayName = `HOC(${getDisplayName(WrappedComponent)})`;
// 或者
class HOC extends ... {
static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
...
}

*/

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component';
}



const MyContainer4 = WrappedComponent =>
    class extends WrappedComponent {
        displayName = `wrapperContainerName(${getDisplayName(WrappedComponent)})`

        render() {
            return (<div>
                <div className="title">命名:</div>
                {this.displayName}
            </div>)
        }
    }

@MyContainer4
class MyComponentDecorators4 extends Component {
    render() {
        return <div>{this.props.text}</div>
    }
}


// 组件参数
function HOCFactoryFactory(...params) {
    // 可以做一些改变 params 的事
    return function HOCFactory(WrappedComponent) {
        return class HOC extends Component {
            render() {
                return <WrappedComponent {...this.props} {...params[0]}/>;
            }
        }
    }
}



@HOCFactoryFactory({ text: 'HOCFactoryFactory' })
class MyComponentDecorators5 extends Component {
    render() {
        return <div>{this.props.text}</div>
    }
}




/*


 HOCFactoryFactory(params)(WrappedComponent)
 // 或者
 @HOCFatoryFactory(params)
 class WrappedComponent extends React.Component{}


*/


export {
    MyComponentDecorators1,
    MyComponentDecorators2,
    MyComponentDecorators3,
    MyComponentDecorators4,
    MyComponentDecorators5
}