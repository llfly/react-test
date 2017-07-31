import React , { Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    static contextTypes = {
        color: PropTypes.string
    }

    render(){
        const { value } = this.props;

        return (
            <button style={{color:this.context.color}}>
                { value }
            </button>
        )
    }
}


class ListItem extends Component {
    static contextTypes = {
        color: PropTypes.string
    }

    render(){
        return (
            <div>
                <Button {...this.props} />
            </div>
        )
    }
}


class List extends Component {
    static childContextTypes = {
        color : PropTypes.string
    }

    getChildContext(){
        return {
            color: 'red'
        }
    }

    render(){
        const { list } = this.props;
        return (
            <div>
                <ul>
                    {
                        list.map((entry,index)=>(
                            <ListItem key={`list-${index}`} value={entry.text} />
                        ))
                    }
                </ul>
            </div>
        )
    }
}


const Cross = () => {
    const list = [
        {
            text : 'name',
        },
        {
            text : 'age',
        }
    ]
    const handleItemChange = entry => console.log(entry);

    return <List list={list} handleItemChange={handleItemChange}/>
}

export default Cross ;


/*

 可以看到，我们并没有给 ListItem 传递 props，而是在父组件中定义了 ChildContext，
 这样从这一层开始的子组件都可以拿到定义的 context，例如这里的 color。

 事实上，context 一直存在于 React 的源码中，但直到 React 0.14 版本才被正式记录在官方文档里。
 不过 React 官方并不建议大量使用 context，因为尽管它可以减少逐层传递，但当组件结构复杂的时候，
 我们并不知道 context 是从哪里传过来的。Context 就像一个全局变量一样，
 而全局变量正是导致应用走向混乱的罪魁祸首之一，给组件带来了外部依赖的副作用。
 在大部分情况下，我们并不推荐使用 context 。使用 context 比较好的场景是真正意义上的全局信息且不会更改，例如界面主题、用户信息等。

*/