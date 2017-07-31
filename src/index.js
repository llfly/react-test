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
import { StateDemo, PropDemo, PropTypesDemo, StateTest} from './3-State';
import { Mount, Update, UnMount } from './4-LifeCycle';

import {
    ReactMixin, Es7Decorators, MyComponent, MyContainer,
    MyComponent1, MyComponent2, MyComponent3, MyComponent4,
    MyComponentDecorators1, MyComponentDecorators2, MyComponentDecorators3, MyComponentDecorators4, MyComponentDecorators5
} from './5-Abstract';

import { ParentToChild, ChildToParent, Cross, EETest } from './6-Communication';






import { SearchSelect, SearchSele } from './7-ComponentCompose';


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
        <StateTest/>


        // 4. LifeCycle
        <Mount/>
        <Update/>
        <UnMount/>


        // 5. Abstract
         <ReactMixin/>
         <Es7Decorators/>
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


        // 6. Communication
         <ParentToChild />
         <ChildToParent />
         <Cross />
         <EETest/>

        

        <SearchSelect placeholder={"test"} onSearch={e=>{console.log(e)}} data={["1","2","123","123","1231231","424324123"]}/>
        <SearchSele />

        */

        return (
            <div>
                <Es7Decorators/>
            </div>
        )
    }
}


render(<App />, document.getElementById('app'));





