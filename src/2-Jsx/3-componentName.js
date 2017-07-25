import React, {Component} from 'react';


// 1. 组件命名遵循驼峰命名，首字母大写
// 2. React只有一个限制， 组件只能渲染单个根节点。如果想要返回多个节点，它们必须被包含在同一个节点里。
export default class Name extends Component{
    render() {
        return (
            <div>
                tests
            </div>
            // <div>
            //     test2
            // </div>
        )
    }
}