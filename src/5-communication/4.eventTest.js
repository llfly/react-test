import React , { Component } from 'react';
import emitter from './4.eventEmitter';



class ListItem extends Component {
    static defaultProps = {
        checked : false
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange}/>
                <span>{this.props.value}</span>
            </li>
        )
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list.map(entry => ({
                text: entry.text,
                checked: entry.checked || false,
            })),
        };
    }
    onItemChange(entry) {
        const { list } = this.state;
        this.setState({
            list: list.map(prevEntry => ({
                text: prevEntry.text,
                checked: prevEntry.text === entry.text ?
                    !prevEntry.checked : prevEntry.checked,
            }))
        });
        emitter.emit('ItemChange', entry);
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map((entry, index) => (
                        <ListItem
                            key={`list-${index}`}
                            value={entry.text}
                            checked={entry.checked}
                            onChange={this.onItemChange.bind(this, entry)}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
class EETest extends Component {
    componentDidMount() {
        this.itemChange = emitter.on('ItemChange', (data) => {
            console.log(data);
        });
    }
    componentWillUnmount() {
        emitter.removeListener(this.itemChange);
    }
    render() {
        return (
            <List list={[{text: 1}, {text: 2}]} />
        );
    }
}


export default EETest;



/*
 Pub/Sub 模式实现的过程非常容易理解，即利用全局对象来保存事件，用广播的方式去处理事件。
 这种常规的设计方法在软件开发中处处可见，但这种模式带来的问题就是逻辑关系混乱。



*/











