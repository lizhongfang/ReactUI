import React, { Component} from 'react';
import Header from './common/header';
import LeftNav from './common/leftNav';

// import { Calendar, DatePicker, Timer, TimePicker, DateTimePicker } from 'cc-ui';
import Home from './home';

import Todo from './todo';

import NavService from './../models/navService';

import { ObserverComponent } from 'cc-ui';
import Router from '../router';
import Menu from './common/menu';

import { renderRoutes } from 'react-router-config';


export default class App extends ObserverComponent {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.todoVisible = false;
        this.service = NavService;
        this.bindEvents();
    }

    bindEvents () {
        this.bindEvent('navChanged', target => {
            console.log(target);
            this.state.todoVisible = (target.id == 'xhmTodo');
            this.setState({ todoVisible: this.state.todoVisible });
        });
    }

    render () {
        return (
            <div className="flex-column">
                <Header></Header>
                <Router />
            </div>
        );
    }
}
