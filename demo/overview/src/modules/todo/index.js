import React, { Component } from 'react';

import { Utils, ObserverComponent } from 'cc-ui';
const classes = Utils.classes;

import service from './service';

const DayDiff = 86400000;
const weekStrArr = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const DateStrMaker = function (dateUnix) {
    var today = new Date();
    var date = new Date(dateUnix);

    var todayLocalDateStr = today.toLocaleDateString();
    var localDateStr = date.toLocaleDateString();

    var weekStr = weekStrArr[date.getDay()];

    if (localDateStr == todayLocalDateStr) {
        return '今天  ' + weekStr;
    }

    var diff = Date.parse(todayLocalDateStr) - Date.parse(localDateStr);
    if (diff < (DayDiff * 2)) {
        return '昨天  ' + weekStr;
    }
    if (diff < (DayDiff * 3)) {
        return '前天  ' + weekStr;
    }

    return localDateStr;
}

class TodoItem extends ObserverComponent {
    constructor (props) {
        super(props);

        this.id = props.id;

        this.service = service;

        this.generateState();

        this.bindEvents();
    }

    generateState () {
        var data = this.service.query(this.id) || {};

        this.state = this.state || {};
        this.state.name = data.name;
        this.state.done = !!data.done;
    }

    bindEvents () {
        this.itemChangedEvent = () => this.updateState();
        this.bindEvent('itemChanged', this.itemChangedEvent);
    }

    updateState () {
        this.generateState();
        this.setState(this.state);
    }

    makeDone () {
        this.service.update(this.id, { done: true });
    }

    render () {
        return (
            <div className={classes({ "todo-item": true, "todo-done": this.state.done })} key={this.state.id}>
                {this.state.name}
                { !this.state.done && (<span className="done-btn" onClick={() => this.makeDone()}>Done</span>) }
            </div>
        );
    }
}

export default class TodoList extends ObserverComponent {
    constructor (props) {
        super(props);

        this.service = service;
        this.state = {};
        this.state.list = this.service.getList();
        this.state.prepareAddValue = '';
        this.state.predicate = '';

        window['TODOService'] = this.service;

        this.bindEvents();
    }

    bindEvents () {
        // this.listChangedEvent = () => {
        //     this.state.list = this.service.getList();
        //     this.setState({ list: this.state.list });
        // };
        //
        // this.service.bindEvent('listChanged', this.listChangedEvent);
        //
        // this.listVisibleChangedEvent = () => {
        //     this.state.list = this.service.getList();
        //     this.setState({ list: this.state.list });
        // };
        //
        // this.service.bindEvent('listVisibleChanged', this.listVisibleChangedEvent);

        this.bindEvent('listChanged', () => {
            this.state.list = this.service.getList();
            this.setState({ list: this.state.list });
        });

        this.bindEvent('listVisibleChanged', () => {
            this.state.list = this.service.getList();
            this.setState({ list: this.state.list });
        });
    }

    predicateChanged (e) {
        var value = e.target.value;
        this.state.predicate = value;
        this.setState(this.state, () => {
            clearTimeout(this.searchDelayFlag);

            this.searchDelayFlag = setTimeout(() => {
                this.service.updateVisible(this.state.predicate);
            }, 400);
        });
    }

    prepareAddValueChanged (e) {
        this.state.prepareAddValue = e.target.value;

        this.setState({
            prepareAddValue: this.state.prepareAddValue
        });
    }

    addTodo () {
        if (!this.state.prepareAddValue) { return; }

        this.service.add({ name: this.state.prepareAddValue });

        this.state.prepareAddValue = '';
        this.setState({ prepareAddValue: this.state.prepareAddValue });
    }

    renderHeader () {
        return (
            <div className="todo-list-header">
                <div className="search-ipt-container-wrap">
                    <div className="cc-form-input-wrap">
                        <span className="iconfont iconsearch"></span>
                        <input type="text" placeholder="搜索" value={this.state.predicate} onChange={this.predicateChanged.bind(this)}></input>
                    </div>
                </div>
            </div>
        );
    }

    renderTodoCategorys () {
        var list = this.state.list || [];
        list = list.map(item => Object.assign({}, item, { dateCategory: DateStrMaker(item.createdAt) }));

        list = list.sort(function (l, r) { return r.createdAt - l.createdAt; });

        var dateCategoryMap = {};

        for (var i = 0; i< list.length; i++) {
            var item = list[i];
            dateCategoryMap[item.dateCategory] = dateCategoryMap[item.dateCategory] || [];
            dateCategoryMap[item.dateCategory].push(item);
        }
        var dateCategoryMatrix = Object.keys(dateCategoryMap).map(key => dateCategoryMap[key]);
        dateCategoryMatrix = dateCategoryMatrix.sort(function (l, r) { return r[0].createdAt - l[0].createdAt; });

        return (
            <div className="todo-category-container">
                {
                    dateCategoryMatrix.map(itemList => (
                        <div key={itemList[0].dateCategory}>
                            <div className="todo-category-date-header">
                                {itemList[0].dateCategory}
                            </div>
                            {
                                itemList.map(item =>
                                    <div key={item.id} style={{ display: item.visible === false ? 'none' : 'block' }}>
                                        <TodoItem {...item} />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        );
    }

    renderTodoFooter () {
        return (
            <div className="todo-list-footer">
                <div className="cc-form-input-wrap block">
                    <input type="text" placeholder="记录大小事务" value={this.state.prepareAddValue} onChange={this.prepareAddValueChanged.bind(this)}></input>
                </div>
                <span className={classes({"add-btn": true, "enable": this.state.prepareAddValue})} onClick={() => this.addTodo()}>Add</span>
            </div>
        );
    }

    render () {
        return (
            <div className="todo-list-wrap">
                { this.renderHeader() }
                { this.renderTodoCategorys() }
                { this.renderTodoFooter() }
            </div>
        );
    }
}
