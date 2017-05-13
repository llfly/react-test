import React , { Component } from 'react';
import { render } from 'react-dom';

import {Mount,Update,Test} from './2-LifeCycle';
import {ParentToChild,ChildToParent,Cross,EETest} from './4-communication';
import {ReactMixin,MyClass,MyComponent,MyContainer,
    MyComponent1,MyComponent2,MyComponent3,MyComponent4,
    MyComponentDecorators1,MyComponentDecorators2,MyComponentDecorators3,MyComponentDecorators4,MyComponentDecorators5
} from './5-abstract';



class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*

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


        */
        return (
            <div>
                <MyComponentDecorators1 loggedIn={true} text={'test'}/>
                <MyComponentDecorators2/>
                <MyComponentDecorators3 text={'state test'}/>
                <MyComponentDecorators4/>
                <MyComponentDecorators5 />
            </div>
        )
    }
}


render(<App/>, document.getElementById('app'));





