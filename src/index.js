import React, { Component } from 'react';
import { render } from 'react-dom';



import { Setup } from './1-Setup';
import { 
    HelloMessage, HelloMessage2,
    Commented,
    Name,
    Style,
    SpreadDemo
 } from './2-Jsx';
import {
    StateDemo,
    PropDemo,
    PropTypesDemo
} from './3-State';


import { Mount, Update, Test } from './4-LifeCycle';

import { ParentToChild, ChildToParent, Cross, EETest } from './5-communication';

import {
    ReactMixin, MyClass, MyComponent, MyContainer,
    MyComponent1, MyComponent2, MyComponent3, MyComponent4,
    MyComponentDecorators1, MyComponentDecorators2, MyComponentDecorators3, MyComponentDecorators4, MyComponentDecorators5
} from './5-abstract';


import { SearchSelect, SearchSele } from './6-componentCompose';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*
        // 1. setup

        <Setup />


        // 2. jsx
        <HelloMessage name={"llfly"}/>
        <HelloMessage2 name={"llfly"}/>
        <Commented/>
        <Name/>
        <Style/>
        <SpreadDemo/>


        // 3. State
        <StateDemo/>
        <PropDemo/>
        <PropTypesDemo/>


         <ParentToChild list={[{value:1},{value:2}]} title={`ParentToChild`}/>
         <ChildToParent />
         <Cross />
         <EETest/>



         <ReactMixin/>
         <MyClass/>
         <MyComponent/>
         <MyContainer/>



         <MyComponent1 />
         <MyComponent2 />
         <MyComponent3 />
         <MyComponent4 />

         <MyComponentDecorators1 loggedIn={true} text={'test'}/>
         <MyComponentDecorators2/>
         <MyComponentDecorators3 text={'state test'}/>
         <MyComponentDecorators4/>
         <MyComponentDecorators5 />

         <SearchSelect placeholder={"test"} onSearch={e=>{console.log(e)}} data={["1","2","123","123","1231231","424324123"]}/>
        <SearchSele />

        */

        return (
            <div>
                <PropDemo/>
            </div>
        )
    }
}


render(<App />, document.getElementById('app'));





