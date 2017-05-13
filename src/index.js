import React , { Component } from 'react';
import { render } from 'react-dom';

import {Mount,Update,Test} from './2-LifeCycle';
import {ParentToChild,ChildToParent,Cross,EETest} from './4-communication';
import {ReactMixin,MyComponent} from './5-abstract';



class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                hello,react
                <ParentToChild list={[{value:1},{value:2}]} title={`ParentToChild`}/>
                <ChildToParent />
                <Cross />
                <EETest/>
                <ReactMixin/>
                <MyComponent/>
            </div>
        )
    }
}


render(<App/>, document.getElementById('app'));





