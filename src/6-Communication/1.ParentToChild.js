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


function ParentToChild() {
    let prop = {
        list :[{value:1},{value:2}],
        title:`ParentToChild`
    }

    return <List {...prop}/>
}




export default ParentToChild;