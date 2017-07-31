//select + Search => SearchSelect

import React, { Component } from 'react'

//--------------------------------------------------------------------- Base Component -------------------------------------

class Input extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: props.value || ''
        }
    }


    componentWillReceiveProps(nextProps){
        if(this.state.value != nextProps.value){
            this.setState({
                value:nextProps.value
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

        const finalList = active ? (<ul className="search-list-wrapper">
            {data.map((item, index) => <ListItem onClick={onClick} label={item} key={index} />)}
        </ul>) : null;

        return finalList;
    }
}

//--------------------------------------------------------------------- HOC 合成第一种 ： 使用decorator-------------------------------------

//完成 SearchInput 和 List 的交互
const searchDecorator = WrappedComponent => {
    class SearchDecorator extends Component {
        constructor(props) {
            super(props);
            // 子组件调用父组件，第一种方式，直接在父组件内部修改this
            this.onClickHandle = this.onClickHandle.bind(this)
            // this.onChangeHandle = this.onChangeHandle.bind(this)
            this.state = {
            }
        }

        onClickHandle(keyword) {
            this.setState({
                keyword,
                active: false,
            })
        }

        onChangeHandle(keyword) {
            const data = this.props.data.filter(item=>~item.indexOf(keyword));
            this.setState({
                keyword,
                active: true,
                data
            })
            this.props.onSearch(keyword)
        }

        // 子组件调用父组件，第二种方式，把父组件this传给子组件，子组件调用bind或者call绑定context
        render() {
            const { data, keyword } = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    context={this}
                    onChange={this.onChangeHandle}
                    onClick={this.onClickHandle}
                />
            )
        }
    }

    return SearchDecorator;
}

@searchDecorator
class Selector extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                {children.map((child, index) => {
                    return React.cloneElement(child, { ...this.props, key:index})
                })}
            </div>
        )
    }
}


class SearchSelect extends Component {
    render() {
        return (
            <Selector {...this.props}>
                <SelectInput />
                <List />
            </Selector>
        )
    }
}


export default SearchSelect
