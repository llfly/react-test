import React,{Component} from 'react';



//控制 props
const MyContainer1 = (WrappedComponent) =>
    class extends Component {
        render(){
            const newProps = {
                text : 'newText'
            };
            return <WrappedComponent {...this.props} {...newProps} />
        }
    };

@MyContainer1
class MyComponent1 extends Component{
    render(){
        return <div>MyComponent1,{this.props.text}</div>
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------
//通过 refs 使用引用

const MyContainer2 = (WrappedComponent) =>
    class extends Component {
        proc(wrappedComponentInstance){
            console.log('props',wrappedComponentInstance.props);
            console.log('state',wrappedComponentInstance.state);
            wrappedComponentInstance.method();
        }

        render(){
            const props = Object.assign({},this.props,{ref:this.proc.bind(this)});
            // 为什么 ref 能执行 ？
            return <WrappedComponent {...props} />
        }
    }


@MyContainer2
class MyComponent2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            test :1
        }
    }

    method(){
        console.log(111);
    }

    render(){
        return <div>MyComponent2</div>
    }
}
// 当 WrappedComponent 被渲染时，refs 回调函数就会被执行，这样就会拿到一份WrappedComponent 实例的引用。
// 这就可以方便地用于读取或增加实例的 props，并调用实例的方法。


//----------------------------------------------------------------------------------------------------------------------------------------
// 抽象 state
// 可以通过 WrappedComponent 提供的 props 和回调函数抽象 state
// 高阶组件可以将原组件抽象为展示型组件，分离内部状态。

const MyContainer3 = (WrappedComponent) =>
    class extends Component {
        constructor(props){
            super(props);
            this.state = {
                name : ''
            }

            this.onNameChange = this.onNameChange.bind(this);
        }

        onNameChange(event){
            this.setState({
                name:event.target.value
            })
        }

        render(){
            const newProps = {
                name :{
                    value : this.state.name,
                    onChange : this.onNameChange
                }
            }

            return <WrappedComponent {...this.props} {...newProps} />
        }
    }


@MyContainer3
class MyComponent3 extends Component {
    render(){
        return <input name="name" {...this.props.name}/>
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------
// 使用其他元素包裹 WrappedComponent

// 可以使用其他元素来包裹 WrappedComponent，这既可以是为了加样式，也可以是为了布局。
const MyContainer4 = (WrappedComponent) =>
    class extends Component {
        render() {
            return (
                <div style= {{display:'inline-block'}}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }

@MyContainer4
class MyComponent4 extends Component {
    render(){
        return <div style={{width:'100px',height:'100px',backgroundColor:'red'}}>
            虽然我是div,但是是inline-block的
        </div>
    }
}




export {
    MyComponent1,
    MyComponent2,
    MyComponent3,
    MyComponent4
}
