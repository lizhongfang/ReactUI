import React, { Component } from 'react';
import moment from 'moment';
import { classes } from './../../utils';

import DatePicker from './../date-picker';

import Timer from './../timer';

/**
    <TimePicker value={someDefaultValue}></TimePicker>
    // *******************
    // Props:
    // value: '11:12:13',
    // onChange: function (selectedTime) {} // 选中变化事件
    // *******************
*/
export default class TimePicker extends DatePicker {
    constructor (props) {
        super(props);

        this.state = this.state || {};
        this.state.tempValue = this.state.value;
        this.selectTime = this.selectTime.bind(this);
        this.setTempValue = this.setTempValue.bind(this);
    }

    valueStrValided (value) {
        return moment(value, 'HH:mm:ss').isValid();
    }

    selectTime (e) {
        // var newValue = moment(time, 'HH:mm:ss').format('HH:mm:ss');
        e.stopPropagation();

        var tempValue = this.state.tempValue;

        this.updateValue(tempValue);
        this.hideCalendar();
    }

    setCurrentTime (e) {
        e.stopPropagation();

        var tempValue = moment().format('HH:mm:ss');
        this.updateValue(tempValue);
        this.hideCalendar();
    }

    setTempValue (tempValue) {
        this.state.tempValue = tempValue;
        this.setState({ tempValue: this.state.tempValue });
    }

    inputClick (e) {
        DatePicker.prototype.inputClick.call(this, e);
        this.state.tempValue = this.state.value;
    }

    render () {
        return (
            <div className="cc-date-picker cc-time-picker" onClick={this.inputClick}>
                <div className={
                    'cc-form-input-wrap'
                    + (this.state.valueVailded ? '' : ' invalid')
                }>
                    <input type="text"
                        value={this.state.value}
                        onChange={this.valueChange}
                        onFocus={this.inputFocus}
                        onBlur={this.inputBlur}
                    ></input>
                </div>
                {this.state.calendarVisible && (<div className={
                    'cc-date-picker-drop-panel'
                    + (this.state.calendarVisible ? ' visible' : '')
                }>
                    <div className="cc-timer-wrap">
                        <Timer value={this.state.value} onChange={this.setTempValue} />
                        <div className="cc-time-picker-footer">
                            <span className="cc-time-now-btn" onClick={e => this.setCurrentTime(e)}>此刻</span>
                            <span className={classes({ "cc-time-submit-btn": true, "disabled": !this.state.tempValue })} onClick={e => this.selectTime(e)}>确定</span>
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}
