const mixin = (obj, mixins) => {
    const newObj = obj;
    newObj.prototype = Object.create(obj.prototype || null);
    for (var prop in mixins) {
        if (mixins.hasOwnProperty(prop)) {
            // hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。
            // 如果有，返回true，否则返回false。
            newObj.prototype[prop] = mixins[prop];
        }
    }
    return newObj;
}


const BigMixin = {
    fly: () => {
        console.log('I can fly');
    }
}


//这里不能用箭头函数，会导致 没有 constructor
const Big = function () {
    console.log('new big');
};

console.log(Big.prototype);

const FlyBig = mixin(Big, BigMixin);


const flyBig = new FlyBig(); // 'new big'
flyBig.fly();// 'I can fly'