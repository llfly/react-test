import React, {Component} from 'react';


export default class Commented extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        //let a = 1;
        /*
        test 
        */
        const name = true;

        return(<div>
            {
                //一般注释, 用 {} 包围
                //`{}花括号内可以写JS逻辑，表达式和方法定义都可以`
            }
            <span
            /*  多
                行
                注
                释 
            */
            className={ name ? 'a' : 'b' } // 行尾注释
            href= ""
            > 注释 </span>
        </div>)


    }
}