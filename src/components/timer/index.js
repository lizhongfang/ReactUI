import React, { Component } from 'react';
import moment from 'moment';

const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']; // [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 ];
for (var j = 10; j < 24; j++) { Hours.push(j.toString()) }
const Minites = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
const Seconds = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
for (var i = 10; i < 60; i++) { Minites.push(i.toString()); Seconds.push(i.toString()); }


// *******************
// Props:
// value: '14:20:45',
// onChange: function (selectedTime) {} // 选中变化事件
// *******************
export default class Timer extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        // this.state.selectedTime = props.value || null;
        this.generateViewStateInfo(props.value);

        // this.updateViewStateInfo();
        this.triggerOnChange = this.triggerOnChange.bind(this);
        this.randomRootId = Math.random().toFixed(2) * 100;
    }

    generateViewStateInfo (selectedTime) {
        if (selectedTime) {
            var timeMoment = moment(selectedTime, 'HH:mm:ss');
            this.state.hour = timeMoment.format('HH');
            this.state.minite = timeMoment.format('mm');
            this.state.second = timeMoment.format('ss');
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            var newValue = newProps.value;
            if (newValue !== this.props.value) {
                this.generateViewStateInfo(newValue);
                this.setState(this.state, () => this.scrollSelectedIntoView());
            }
        }
    }

    updateViewStateInfo () {

    }

    updateViewState () {
        // this.updateViewStateInfo();
        this.setState(this.state, this.triggerOnChange);
    }

    selectHour (hour, e) {
        e.stopPropagation();
        this.state.hour = hour;
        this.updateViewState();
    }

    selectMinite (minite, e) {
        e.stopPropagation();
        this.state.minite = minite;
        this.updateViewState();
    }

    selectSecond (second, e) {
        e.stopPropagation();
        this.state.second = second;
        this.updateViewState();
    }

    generateHouerScroller () {
        var selectedHour = this.state.hour;
        return Hours.map(num => (
            <div key={num}
                id={'J_cc_timer_hour_' + this.randomRootId + (num == selectedHour ? 'selected' : '')}
                onClick={(e) => this.selectHour(num, e)}
                className={
                    'cc-time-row'
                    + (num == selectedHour ? ' selected' : '')
                }
            >{num}</div>
        ));
    }

    generateMiniteScroller () {
        var selectedMinite = this.state.minite;
        return Minites.map(num => (
            <div key={num}
                id={'J_cc_timer_minite_' + this.randomRootId + (num == selectedMinite ? 'selected' : '')}
                onClick={(e) => this.selectMinite(num, e)}
                className={
                    'cc-time-row'
                    + (num == selectedMinite ? ' selected' : '')
                }
            >{num}</div>
        ));
    }

    generateSecondScroller () {
        var selectedSecond = this.state.second;
        return Seconds.map(num => (
            <div key={num}
                id={'J_cc_timer_second_' + this.randomRootId + (num == selectedSecond ? 'selected' : '')}
                onClick={(e) => this.selectSecond(num, e)}
                className={
                    'cc-time-row'
                    + (num == selectedSecond ? ' selected' : '')
                }
            >{num}</div>
        ));
    }

    render () {
        return (
            <div className="cc-timer">
                <div className="cc-timer-column cc-timer-column-hour">
                    { this.generateHouerScroller() }
                </div>
                <div className="cc-timer-column cc-timer-column-minite">
                    { this.generateMiniteScroller() }
                </div>
                <div className="cc-timer-column cc-timer-column-second">
                    { this.generateSecondScroller() }
                </div>
            </div>
        );
    }

    componentDidMount () {
        this.scrollSelectedIntoView();
        // setTimeout(function () {
        //
        // }, 0);

    }

    scrollSelectedIntoView () {
        var selectedRowIds = [
            'J_cc_timer_hour_' + this.randomRootId + 'selected',
            'J_cc_timer_minite_' + this.randomRootId + 'selected',
            'J_cc_timer_second_' + this.randomRootId + 'selected'
        ];
        selectedRowIds.map(jId => {
            var selectRowEle = document.getElementById(jId);
            selectRowEle && selectRowEle.scrollIntoViewIfNeeded();
        });
    }

    triggerOnChange () {
        var state = this.state;
        if (state.hour && state.minite && state.second) {
            this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(`${state.hour}:${state.minite}:${state.second}`);
        }
    }
}
