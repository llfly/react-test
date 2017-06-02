import React, { Component } from 'react'

//--------------------------------------------------------------------- Base Component -------------------------------------

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    render() {
        const { value } = this.state;
        const { placeholder,onChange } = this.props;

        return <input type="text"
                      value={value}
                      placeholder={placeholder}
                      onChange={e=>onChange(e)}
        />
    }
}

class SelectInput extends Component {
    render() {
        const { keyword, onChange, placeholder, context } = this.props
        return (
            <div className="select-input-wrapper">
                <Input
                    className="select-input"
                    type="text"
                    value={keyword}
                    onChange={e => onChange.call(context, e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}


class ListItem extends Component {
    render() {
        const { label, onClick } = this.props;
        return <li onClick={() => onClick(label)}>{label}</li>
    }
}

class List extends Component {
    render() {
        const { data = [], onClick, active = false } = this.props;

        console.log(data);

        const finalList = active ? (<ul className="search-list-wrapper">
            {data.map((item, index) => <ListItem onClick={onClick} label={item} key={index}/>)}
        </ul>) : null;

        return finalList;
    }
}

//--------------------------------------------------------------------- HOC合成第二种：手动调用包装函数。这里可以传入多个hoc函数-------------------------------------


function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//完成 List 数据请求
const asyncSelectDecorator = params => WrappedComponent => {
    class AsyncSelectDecorator extends Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.onSearch = this.onSearch.bind(this)
            this.state = {
                data : [1,2,3,4]
            }
        }

        onSearch(keyword) {
            // 模拟ajax请求
            const data = [1, 2, 3, 4].map(count => new Array(count).fill(keyword).join(''))
            this.setState({
                data,
            })
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...params}
                    onSearch={this.onSearch}
                    data={this.state.data}
                />
            );
        }
    }
    return AsyncSelectDecorator;
}


class Selector extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                {children.map((child, index) => {
                    return React.cloneElement(child, {...this.props, key: index})
                })}
            </div>
        )
    }
}


const WrapperSelector = compose(asyncSelectDecorator({placeholder: '请输入',onChange:e=>{console.log(e)}}))(Selector);

class SearchSele extends Component {
    render() {
        return (
            <WrapperSelector className="search-select" {...this.props}>
                <SelectInput />
                <List />
            </WrapperSelector>
        )
    }
}

export default SearchSele;



