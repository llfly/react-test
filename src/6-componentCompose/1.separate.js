//select + Search => SearchSelect

import 'antd/dist/antd.min.css'
import React, { Component } from 'react'
import { Input } from 'antd'


function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


//--------------------------------------------------------------------- Base Component
class SelectInput extends Component {
    static displayName = 'SelectInput';

    render(){
        const { selectedItem , isActive , onClickHeader , placeholder } = this.props;
        const { text } = selectedItem;

        return (
            <div>
                <div onClick={onClickHeader}>
                    <Input
                        type="text"
                        disabled
                        value={text}
                        placeholder={placeholder}
                    />
                    <Icon className={isActive} name="angle-down" />
                </div>
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

//HOC 合成第一种 ： 使用decorator



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






//完成 SearchInput 和 List 的交互
const searchDecorator = WrappedComponent => {
    class SearchDecorator extends Component {
        constructor(props) {
            super(props);

            this.handleSearch = this.handleSearch.bind(this)
        }

        handleSearch(keyword) {
            this.setState({
                data: this.props.data,
                keyword
            });
            this.props.onSearch(keyword);
        }

        render() {
            const { data, keyword } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    data={data}
                    keyword={keyword}
                    onSearch={this.handleSearch}
                />
            )
        }
    }

    return SearchDecorator;
}


//完成 List 数据请求
const asyncSelectDecorator = WrappedComponent => {
    class AsyncSelectDecorator extends Component {
        componentDidMount() {
            const { url, params } = this.props;

            fetch(url, { params }).then(data => {
                this.setState({
                    data,
                });
            })
        }

        render(){
            return (
                <WrappedComponent
                    {...this.props}
                    data={this.state.data}
                />
            );
        }
    }
    return AsyncSelectDecorator;
}



const FinalSelector = compose(asyncSelectDecorator, searchDecorator, selectedItemDecorator)(Selector);

class SearchSelect extends Component {
    render() {
        return (
            <FinalSelector {...this.props}>
                <SelectInput />
                <SearchSelect />
                <List />
            </FinalSelector>
        )
    }
}
