// 观察者模式服务实例
// 提供事件触发， 事件绑定， 事件解绑机制
export default class ObserverService {
    constructor () {
        this.eventsPool = this.eventsPool || {};
    }

    bindEvent (event, callback) {
        this.eventsPool = this.eventsPool || {};
        this.eventsPool[event] = this.eventsPool[event] || [];
        this.eventsPool[event].push(callback);
    }

    unbindEvent (event, callback) {
        this.eventsPool = this.eventsPool || {};
        this.eventsPool[event] = this.eventsPool[event] || [];
        var targetIdx = this.eventsPool[event].indexOf(callback);

        (targetIdx > -1) && this.eventsPool[event].splice(targetIdx, 1);
    }

    triggerEvent (event, body) {
        for (var i = 0; this.eventsPool && this.eventsPool[event] && i < this.eventsPool[event].length; i++) {
            typeof this.eventsPool[event][i] == 'function' && this.eventsPool[event][i](body);
        }
    }
}
