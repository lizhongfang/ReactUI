// 观察者模式组件实例
// 提供事件绑定方法 以及 组件销毁时 事件自动解绑

import React, { Component } from 'react';

export default class ObserverComponent extends Component {
    constructor (props) {
        super(props);

        this.observerEventsMap = {};
    }

    bindEvent (eventName, callback) {
        this.observerEventsMap[eventName] = callback;
        this.service && this.service.bindEvent && this.service.bindEvent(eventName, callback);
    }

    componentWillUnmount () {
        Object.keys(this.observerEventsMap).map(eventName => this.service && this.service.unbindEvent && this.service.unbindEvent(eventName, this.observerEventsMap[eventName]));
    }
}
