import React, {Component} from 'react';

//父组件向子组件通信

function ListItem ({value}){
    return (
        <li>
            <span>{value}</span>
        </li>
    )
}

const ListTitle = ({title}) => (
    <div>
        {title}
    </div>
);

function List({list,title}){
    return (
        <div>
            <ListTitle title={title}/>
            <ul>
                {
                    list.map((entry,index)=><ListItem key={`${list}-${index}`} value={entry.value} />)
                }
            </ul>
        </div>
    )
}




export default List;