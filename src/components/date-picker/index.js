import React, { Component } from 'react';

import moment from 'moment';

import Calendar from './../calendar';

/**
    <DatePicker value={someDefaultValue}></DatePicker>
    // *******************
    // Props:
    // value: '2020-03-11',
    // onChange: function (selectedDate) {} // 选中变化事件
    // name: Form表单标识字段name
    // *******************
*/
export default class DatePicker extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.value = props.value || '';
        this.state.valueVailded = true;
        this.state.focus = !!props.focus;
        this.state.calendarVisible = !!props.calendarVisible;

        this.valueChange = this.valueChange.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.inputClick = this.inputClick.bind(this);
        this.hideCalendar = this.hideCalendar.bind(this);

        this.selectDate = this.selectDate.bind(this);
    }

    valueChange (e) {
        var newValue = e.target.value;

        this.updateValue(newValue);
    }

    updateValue (newValue) {
        newValue = this.valueStrFormater(newValue);
        var valueVailded = this.valueStrValided(newValue);

        this.state.value = newValue;
        this.state.valueVailded = valueVailded;
        this.setState({
            value: this.state.value,
            valueVailded: this.state.valueVailded
        }, () => {
            if (this.state.valueVailded) {
                this.triggerOnChange();
            }
        });
    }

    //
    /**
        ( 是否要做到这种程度， 未可知； 可能只需要给一个合法不合法标识就可以了 )
        Valid Format:
        2020
        2020-
        2020-0
        2020-01
        2020-12
        2020-12-
        2020-12-2
        2020-12-23
    */
    valueStrFormater (value) {
        return value;
    }

    valueStrValided (value) {
        return moment(value).isValid();
    }

    inputFocus () {
        this.state.focus = true;
        this.setState({ focus: this.state.focus });
    }
    inputBlur () {
        this.state.focus = false;
        this.setState({ focus: this.state.focus });
    }
    inputClick (e) {
        e.stopPropagation();

        this.state.calendarVisible = true;
        this.setState({ calendarVisible: this.state.calendarVisible }, () => {
            window.removeEventListener('click', this.hideCalendar);
            window.addEventListener('click', this.hideCalendar);
        });
    }

    hideCalendar () {
        this.state.calendarVisible = false;
        this.setState({ calendarVisible: this.state.calendarVisible }, () => {
            window.removeEventListener('click', this.hideCalendar);
        });
    }

    selectDate (date) {
        var newValue = moment(date).format('YYYY-MM-DD');
        // debugger
        this.updateValue(newValue);
        this.hideCalendar();
    }

    render () {
        return (
            <div className="cc-date-picker" onClick={this.inputClick}>
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
                    <Calendar value={this.state.value} onChange={this.selectDate} withTodayBtn={true} />
                </div>
            </div>
        );
    }

    componentDidMount () {

    }
    componentWillUnmount () {

    }

    triggerOnChange () {
        // console.log(" Calendar Send -> ", this.state.selectedDate)
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.value);
        this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
    }
}
