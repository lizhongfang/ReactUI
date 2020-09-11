import React, { Component } from 'react';

import moment from 'moment';

import Service from './service';
import { IsToday, NotCurrentMonth, ArrToMatrix, DateStrComplete } from './utils';

// const cDExportService = new Service();

// *******************
// Props:
// value: '2020-03-11',
// selectMode: 'day', // 'day': 天选择视图, 'month': 月选择视图, 'year': 年选择视图
// onChange: function (selectedDate) {} // 选中变化事件
// withTodayBtn: false // 底部是否需要跳转“今天”按钮
// *******************
export default class Calendar extends Component {
    constructor (props) {
        super(props);

        this.cDExportService = new Service();

        this.state = {};
        this.state.selectedDate = props.value ? moment(props.value).format('YYYY-MM-DD') : null;
        this.state.selectMode = props.selectMode || 'day'; // 'day': 天选择视图, 'month': 月选择视图, 'year': 年选择视图
        this.state.viewDate = this.state.selectedDate;
        this.state.withTodayBtn = !!props.withTodayBtn;

        this.updateStateInfo();

        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextYear = this.nextYear.bind(this);
        this.prevYear = this.prevYear.bind(this);
        this.next12Year = this.next12Year.bind(this);
        this.prev12Year = this.prev12Year.bind(this);
        this.triggerOnChange = this.triggerOnChange.bind(this);
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            var selectedDate = newProps.value;
            if ((selectedDate != this.props.value) && DateStrComplete(selectedDate)) {
                // console.log('ChangeSelectedDate -> ')
                // console.log(selectedDate);
                this.state.selectedDate = selectedDate;
                this.state.viewDate = selectedDate;
                this.updateState();
            }
        }
    }

    updateStateInfo () {
        var currentViewDate = this.state.viewDate;
        currentViewDate = (currentViewDate ? moment(currentViewDate) : moment()).format('YYYY-MM-DD');
        this.state.viewDate = currentViewDate; // 当前视图日期
        this.state.currentDateNumMap = this.cDExportService.getCurrentDateNum(this.state.viewDate); // 目标日期 数字标识 { y: 2020, m: 1, w: 5, d: 17 }

        if (this.state.selectMode == 'year') {
            this.state.yearRangeArr = this.getYearModeRangeArr();
        }
    }

    updateState (callbackFunc) {
        this.updateStateInfo();

        this.setState(this.state, callbackFunc);
    }

    nextMonth () { this.navView(1, 'months'); }
    prevMonth () { this.navView(-1, 'months'); }

    nextYear () { this.navView(1, 'years'); }
    prevYear () { this.navView(-1, 'years'); }

    next12Year () { this.navView(12, 'years'); }
    prev12Year () { this.navView(-12, 'years'); }

    navView (num, stepMode) {
        var currentViewDate = this.state.viewDate;
        var targetViewDate = moment(currentViewDate).add(num, stepMode);

        this.state.viewDate = targetViewDate.format('YYYY-MM-DD');
        this.updateState();
    }

    selectDate (date) {
        // debugger;
        this.state.selectedDate = moment(date).format('YYYY-MM-DD');
        this.state.viewDate = this.state.selectedDate;
        console.log(' Calendar Select -> ', this.state.selectedDate);
        this.updateState(this.triggerOnChange);
        // this.updateState();
    }

    changeMode (mode) {
        this.state.selectMode = mode;

        this.updateState();
    }

    generateHeader () {
        var currentMoment = moment(this.state.viewDate);
        var selectMode = this.state.selectMode;
        if (selectMode == 'day') {
            return (
                <div className="cc-calendar-header">
                    <span className="icon-arrow iconfont icondouble-arrow-left" onClick={this.prevYear}></span>
                    <span className="icon-arrow iconfont iconarrow-left" onClick={this.prevMonth}></span>

                    <span className="cc-calendar-header-year-label" onClick={() => this.changeMode('year')}>{currentMoment.format('YYYY')}年</span>
                    <span className="cc-calendar-header-month-label" onClick={() => this.changeMode('month')}>{currentMoment.format('M')}月</span>

                    <span className="icon-arrow iconfont iconarrow-right1" onClick={this.nextMonth}></span>
                    <span className="icon-arrow iconfont icondouble-arrow-right" onClick={this.nextYear}></span>
                </div>
            );
        }
        if (selectMode == 'month') {
            return (
                <div className="cc-calendar-header">
                    <span className="icon-arrow iconfont icondouble-arrow-left" onClick={this.prevYear}></span>

                    <span className="cc-calendar-header-year-label" onClick={() => this.changeMode('year')}>{currentMoment.format('YYYY')}年</span>

                    <span className="icon-arrow iconfont icondouble-arrow-right" onClick={this.nextYear}></span>
                </div>
            );
        }
        if (selectMode == 'year') {
            var yearRangeArr = this.state.yearRangeArr || [];
            return (
                <div className="cc-calendar-header">
                    <span className="icon-arrow iconfont icondouble-arrow-left" onClick={this.prev12Year}></span>

                    <span className="cc-calendar-header-year-label">{yearRangeArr[0]}年 ~ {yearRangeArr[11]}年</span>

                    <span className="icon-arrow iconfont icondouble-arrow-right" onClick={this.next12Year}></span>
                </div>
            );
        }
    }

    generateWeeklyHeader () {
        return (
            <div className="cc-calendar-date-week-row">
            { this.cDExportService.weekDayTinyLabelArr.map(label => (<span key={label} className="cc-calendar-date-day-piece week-label">{label}</span>)) }
            </div>
        )
    }

    generateWeeklyRows () {
        var dateNumMap = this.state.currentDateNumMap || {};
        var yearNum = dateNumMap.y, monthNum = dateNumMap.m;

        var weeklyDaysRows = this.cDExportService.getMonthlyBlockWeekDaysRows(monthNum, yearNum);
        return weeklyDaysRows.map((datesRow, idx) => (
            <div className="cc-calendar-date-week-row" key={idx}>
            { datesRow.map(date => (
                <span key={date} className={
                    'cc-calendar-date-day-piece'
                    + (date == this.state.selectedDate ? ' selected' : '')
                    + (IsToday(date) ? ' is-today' : '')
                    + (NotCurrentMonth(date, this.state.viewDate) ? ' not-current' : '')
                } onClick={() => this.selectDate(date)}>
                    <span className="date-number-wrap"><span className="date-number">{moment(date).format('DD')}</span></span>
                </span>
            )) }
            </div>
        ));
    }

    selectMonth (monthIdx) {
        var currentViewDate = this.state.viewDate;
        this.state.viewDate = moment(currentViewDate).month(monthIdx).format('YYYY-MM-DD');

        this.state.selectMode = 'day';
        this.updateState();
    }

    generateMonthPiecesMatrix () {
        var dateNumMap = this.state.currentDateNumMap || {};

        var monthSimpleLabelArr = this.cDExportService.monthSimpleLabelArr.map((label, idx) => ({
            monthIdx: idx,
            monthLabel: label
        }));
        var monthLabelMatrix = ArrToMatrix([].concat(monthSimpleLabelArr), 4);

        var currentViewDate = this.state.viewDate;
        var selectedDate = this.state.selectedDate;
        var currentInSelectedYear = moment(currentViewDate).year() == moment(selectedDate).year();

        return monthLabelMatrix.map((row, idx) => (
            <div className="cc-calendar-date-month-row" key={idx}>
            {
                row.map((monthPiece, idx) => (
                    <span key={idx} className={
                        'cc-calendar-date-month-piece'
                        + (currentInSelectedYear && moment(selectedDate).month() == monthPiece.monthIdx ? ' selected' : '')
                    } onClick={() => this.selectMonth(monthPiece.monthIdx)}>
                        <span className="month-label-wrap"><span className="month-label">{monthPiece.monthLabel}</span></span>
                    </span>
                ))
            }
            </div>
        ));
    }

    selectYear (year) {
        var currentViewDate = this.state.viewDate;
        this.state.viewDate = moment(currentViewDate).year(year).format('YYYY-MM-DD');

        this.state.selectMode = 'month';
        this.updateState();
    }

    getYearModeRangeArr () {
        var currentViewDate = this.state.viewDate;
        var flagYearNum = moment(currentViewDate).year();

        var blockStartYearNum = flagYearNum - 6;
        var yearArr = [];
        for (var i = 0; i < 12; i++) {
            yearArr.push(blockStartYearNum + i);
        }
        return yearArr;
    }

    generateYearPiecesMatrix () {
        var selectedDate = this.state.selectedDate;
        var currentViewDate = this.state.viewDate;
        var flagYearNum = moment(currentViewDate).year();

        var yearArr = this.state.yearRangeArr || [];
        var yearMatrix = ArrToMatrix(yearArr, 4);

        return yearMatrix.map((row, idx) => (
            <div className="cc-calendar-date-month-row" key={idx}>
            {
                row.map((year, idx) => (
                    <span key={idx} className={
                        'cc-calendar-date-month-piece'
                        + (moment(selectedDate).year() == year ? ' selected' : '')
                    } onClick={() => this.selectYear(year)}>
                        <span className="month-label-wrap"><span className="month-label">{year}</span></span>
                    </span>
                ))
            }
            </div>
        ));
    }

    generateFooter () {
        return this.state.withTodayBtn ? (
            <div className="cc-calendar-footer">
                <span className="cc-calendar-today-btn" onClick={() => this.selectDate(moment().format('YYYY-MM-DD'))}>今天</span>
            </div>
        ) : null;
    }

    render () {
        return (
            <div className="cc-calendar">
                { this.generateHeader() }
                {
                    this.state.selectMode == 'day' && (
                        <div className="cc-calendar-day-container">
                            { this.generateWeeklyHeader() }
                            { this.generateWeeklyRows() }
                        </div>
                    )
                }
                {
                    this.state.selectMode == 'month' && (
                        <div className="cc-calendar-month-container">
                            { this.generateMonthPiecesMatrix() }
                        </div>
                    )
                }
                {
                    this.state.selectMode == 'year' && (
                        <div className="cc-calendar-year-container">
                            { this.generateYearPiecesMatrix() }
                        </div>
                    )
                }
                { this.generateFooter() }
            </div>
        )
    }

    triggerOnChange () {
        // console.log(" Calendar Send -> ", this.state.selectedDate)
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.selectedDate);
    }
}
