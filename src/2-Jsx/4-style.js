import React, { Component } from 'react';
import './index.css';

export default class Style extends Component {
    render() {
        const MyComponentStyles = {
            color: 'blue',
            fontSize: '28px'
        };

        return (
        <div>
            <div style={MyComponentStyles}>可以直接这样写行内样式</div>
            <div style={{color:'yellow',fontSize:'28px'}}>可以直接这样写行内样式</div>
            <div className='test'>可以直接这样写行内样式</div>
        </div>)
    }
}