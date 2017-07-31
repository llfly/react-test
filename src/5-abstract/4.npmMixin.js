/*
 使用 ES6 classes 形式构建组件时，并不支持 mixin

 decorator 是在 ES7 中定义的新特性，与 Java 中的 pre-defined annotation（预定义注解） 相似。
 但与 Java 的 annotation 不同的是，decorator 是运用在运行时的方法。
 在 Redux 或其他一些应用层框架中，越来越多地使用 decorator 以实现对组件的“修饰”。
 现在，我们使用 decorator 来实现 mixin。

 core-decorators 库为开发者提供了一些实用的 decorator，其中实现了我们正想要的 @mixin。
 */


/*
import { getOwnPropertyDescriptors } from './private/utils';
const { defineProperty } = Object;
function handleClass(target, mixins) {
    if (!mixins.length) {
        throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }
    for (let i = 0, l = mixins.length; i < l; i++) {
        // 获取 mixins 的 attributes 对象
        const descs = getOwnPropertyDescriptors(mixins[i]);
        // 批量定义 mixins 的 attributes 对象
        for (const key in descs) {
            if (!(key in target.prototype)) {
                defineProperty(target.prototype, key, descs[key]);
            }
        }
    }
}
export default function mixin(...mixins) {
    if (typeof mixins[0] === 'function') {
        return handleClass(mixins[0], []);
    } else {
        return target => {
            return handleClass(target, mixins);
        };
    }
}
*/


import React,{Component} from 'react';
import { mixin } from 'core-decorators';

const PureRender = {
    shouldComponentUpdate() {
        console.log(111);
    }
};

const Theme = {
    setTheme() {console.log('get~')}
};

@mixin(PureRender, Theme)
class MyComponent extends Component {
    render() {
        this.setTheme()

        return <div>mixin</div>
    }
}

export default MyComponent;
//当用属性代理构建 HOC 时，调用顺序不同于 mixin ，上述的执行生命周期过程类似于堆栈调用
// didmount -> HOC didmount -> (HOCs didmount) -> (HOCs will unmount) -> HOC will unmount -> unmount