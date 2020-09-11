import React, { Component } from 'react';
import moment from 'moment';

import { classes } from './../../utils';

import DatePicker from './../date-picker';
import Calendar from './../calendar';
import Timer from './../timer';

const DefaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const DefaultDateFormat = 'YYYY-MM-DD';
const DefaultTimeFormat = 'HH:mm:ss';

/**
    <DateTimePicker value={someDefaultValue}></DateTimePicker>
    // *******************
    // Props:
    // value: '2020-03-11 18:08:07',
    // onChange: function (selectedDateTime) {} // 选中变化事件
    // *******************
*/
export default class DateTimePicker extends DatePicker {
    constructor (props) {
        super(props);

        this.state = this.state || {};

        if (this.state.value && this.valueStrValided(this.state.value)) {
            this.state.dateValue = moment(this.state.value).format(DefaultDateFormat);
            this.state.timeValue = moment(this.state.value).format(DefaultTimeFormat);
        }

        this.selectDate = this.selectDate.bind(this);
        this.selectTime = this.selectTime.bind(this);
    }

    updateValue (newValue) {
        newValue = this.valueStrFormater(newValue);
        var valueVailded = this.valueStrValided(newValue);

        this.state.value = newValue;
        this.state.valueVailded = valueVailded;

        if (this.state.value && this.state.valueVailded) {
            this.state.dateValue = moment(this.state.value).format(DefaultDateFormat);
            this.state.timeValue = moment(this.state.value).format(DefaultTimeFormat);
        }

        this.setState({
            value: this.state.value,
            valueVailded: this.state.valueVailded,
            dateValue: this.state.dateValue,
            timeValue: this.state.timeValue
        }, () => {
            if (this.state.valueVailded) {
                this.triggerOnChange();
            }
        });
    }

    valueStrValided (value) {
        return (moment(value, DefaultDateTimeFormat).format(DefaultDateTimeFormat) == value);
    }

    selectDate (date) {
        var newDateValue = moment(date).format('YYYY-MM-DD');
        this.state.dateValue = newDateValue;
        this.setState({
            dateValue: this.state.dateValue,
            // timeValue: this.state.timeValue
        });
    }

    selectTime (time) {
        // debugger
        var newTimeValue = moment(time, 'HH:mm:ss').format('HH:mm:ss');
        this.state.timeValue = newTimeValue;
        this.setState({
            // dateValue: this.state.dateValue,
            timeValue: this.state.timeValue
        });
    }

    setCurrent () {
        var currentMoment = moment();
        this.selectDate(currentMoment);
        this.selectTime(currentMoment);

        // this.setState({
        //     dateValue: this.state.dateValue,
        //     timeValue: this.state.timeValue
        // });
    }

    selectDateTime (e) {
        e.stopPropagation();

        if (this.state.dateValue && this.state.timeValue) {
            var newValueStr = this.state.dateValue + ' ' + this.state.timeValue;
            if (this.valueStrValided(newValueStr)) {
                var newValue = moment(newValueStr).format(DefaultDateTimeFormat);

                this.updateValue(newValue);
                this.hideCalendar();
            }
        }

        // var newValue = moment(date).format('YYYY-MM-DD');
        // // debugger
        // this.updateValue(newValue);
        // this.hideCalendar();
    }

    render () {
        return (
            <div className="cc-date-picker cc-datetime-picker" onClick={this.inputClick}>
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
                <div className={
                    'cc-date-picker-drop-panel'
                    + (this.state.calendarVisible ? ' visible' : '')
                }>
                    <div className="cc-datetime-picker-drops-container">
                        <Calendar value={this.state.dateValue} onChange={this.selectDate} />
                        <Timer value={this.state.timeValue} onChange={this.selectTime} />
                    </div>
                    <div className="cc-datetime-picker-drops-footer">
                        <span className="cc-datetime-now-btn" onClick={e => this.setCurrent(e)}>此刻</span>
                        <span className={classes({ "cc-datetime-submit-btn": true, "disabled": !(this.state.dateValue && this.state.timeValue) })} onClick={e => this.selectDateTime(e)}>确定</span>
                    </div>
                </div>
            </div>
        );
    }
}
