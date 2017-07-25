import React, { Component } from 'react';

class Spread extends Component {
    render () {
         console.log(this.props);
         return <h1> {this.props.name} is a {this.props.type} </h1>;
    }
}


export default class SpreadDemo extends Component {
  render(){
        const prop = {
            name:123,
            type:'test'
        }
        //可以通过 `{...obj}` 来批量设置一个对象的键值对到组件的属性
        return  <div>
            <Spread {...prop} />
            <Spread name={prop.name} type ={prop.type}/>
        </div>
  }
}
