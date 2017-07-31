import React, { Component } from 'react';


class UnmountHelper extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.log('clear');
        //清除一些 widow 事件 以及 定时器
    }

    render() {
        return <div>Unmount Test</div>
    }
}




export default class UnMount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: true
        }
    }
    
    render() {
        return (<div>
           {
               this.state.isRender ? <UnmountHelper/> : null
           }
           <input type='button' value='unmount test' onClick={e=>{
               this.setState({
                   isRender : !this.state.isRender
               });
           }} />
        </div>)
    }
}