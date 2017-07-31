import React,{Component} from 'react';


//可以对类进行装饰
function isTestable(value) {
    /* @params:
     * target: 当前装饰类：Es7Decorators
     * */
    return function decorator(target) {
        // 装饰类属性
        target.isTestable = value
    }
}

function enumerable(value) {
    /* @params:
     * target: 当前装饰类：Es7Decorators
     * key: 当前装饰属性名:method
     * descriptor: defineProperty函数的第三个参数：descriptor
     * */
    return function (target, key, descriptor) {
        // 这里可以对属性值装饰
        descriptor.value = () => {
            return `名字：${value}`
        }
        return descriptor
    }
}


@isTestable(true)
class Es7Decorators extends Component {

    @enumerable('llfly')
    method(){

    }

    render(){
        console.log(this.method(),Es7Decorators.isTestable);
        return <div>es7DecoratorsTest</div>
    }
}


export default Es7Decorators;


/*
mixin 的问题：

- 破坏了原有组件的封装

即使给原来组件带来新特性，但也可能带来新的 state 和 props， 意味着组件有一些 "不可见" 的状态需要我们去维护，但我们使用时并不知道
此外 mixin 中的方法可能还会调用其他 组件中的方法


- 命名冲突

mixin是平面结构，不同 mixin 中的命名在不可知的情况，重用的情况是不可控的

- 增加复杂性

代码难以维护，写 React 组件时，首先考虑的往往是单一的功能、简洁的设计和逻辑。
*/


/*
 简而言之，decorators就是把装饰类当做参数传入装饰器函数内。
 当函数有返回值时候，返回值当做装饰后的函数代理装饰函数。 当函数没有返回值时，参数当做装饰后的函数代理装饰函数。
*/


@decorators
class Cls{

}

function decorators(Cls){
    Cls.age = 10
    Cls.prototype.age = 20
    // return { age: 30 }
}

console.log(Cls.age)          // 打印10，打开注释后（return { age: 30}），输出30
console.log(new Cls().age)    // 打印20，打开注释后（return { age: 30}），报错