import {EventEmitter} from 'events';
export default new EventEmitter();

// 在 componentDidMount 事件中，如果组件挂载完成，再订阅事件；
// 当组件卸载的时候，在 componentWillUnmount 事件中取消事件的订阅。

