import moment from 'moment';

import {
    MonthSimpleLabelArr, MonthSimpleZHCNLabelArr, MonthCompleteLabelArr, WeekDaySimpleLabelArr, WeekDayTinyLabelArr,
    getCurrentDateNum,
    getMonthFirstDayMoment, getMonthLastDayMoment,getMonthlyBlockDays,
    getWeeklyRowDateRange,
    NumLenghtFormat, RegionDateBetween,
    ArrToMatrix, IsToday
} from './utils';

// import { campaignResponse } from './mockData';


/*
    options: {
        firstWeekDay: 0, // 按月显示 矩阵第一列星期数 默认 0-星期天
        monthlyBlockRows: 5, // 按月显示 矩阵行数 默认 5 行， 最小 5 行
        mode: 'Month', // 模式， 'Month'-月; 'Week'-周; 'Day'-天
    }

*/
export default class CalendarDataExportService {
    constructor (options) {
        this.monthSimpleLabelArr = MonthSimpleZHCNLabelArr || [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        this.monthCompleteLabelArr = MonthCompleteLabelArr || [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        // this.weekDaySimpleLabelArr = WeekDaySimpleLabelArr || [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        this.weekDaySimpleLabelArr = WeekDaySimpleLabelArr || [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ];
        this.weekDayTinyLabelArr = WeekDayTinyLabelArr || [ '日', '一', '二', '三', '四', '五', '六' ];

        options = options || {};
        this.options = options;

        this.firstWeekDay = this.options.firstWeekDay || 0; // 0-Sun ; 1-Mon

        this.monthlyBlockRows = Math.max(this.options.monthlyBlockRows || 5, 5);
    }

    getCurrentDateNum (targetDate) {
        return getCurrentDateNum(targetDate);
    }


    getMonthlyBlockDateRange (monthNum, yearNum) {
        var startDateMoment = getMonthFirstDayMoment(monthNum, yearNum);

        var startWeekDay = this.getCurrentDateNum(startDateMoment).w;
        var diffStart = this.firstWeekDay - startWeekDay;

        var monthlyBlockStartDate = startDateMoment.add(diffStart, 'days');

        var monthlyBlockEndDate = moment(monthlyBlockStartDate).add(7 * this.monthlyBlockRows - 1, 'days');


        return { start: monthlyBlockStartDate, end: monthlyBlockEndDate };
        // return { start: monthlyBlockStartDate.format(), end: monthlyBlockEndDate.format() };
    }

    // 获取当月方格框日期列表
    getMonthlyBlockDays (monthNum, yearNum) {
        var range = getMonthlyBlockDays(monthNum,yearNum);

        var startDayMoment = range.start;
        var endDayMoment = range.end;

        var days = [startDayMoment.format('YYYY-MM-DD')];
        var daysEnd = [range.end.format('YYYY-MM-DD')];
        var daysDiff = parseInt(endDayMoment.diff(startDayMoment)/1000/3600/24);

        for (var i = 1; i < daysDiff+1; i++) {
            days.push(startDayMoment.add(1, 'days').format('YYYY-MM-DD'));
        }
        return days;
    }

    // 获取当月方格框日期 按 星期切分 的矩阵
    getMonthlyBlockWeekDaysRows (monthNum, yearNum) {
        return ArrToMatrix(this.getMonthlyBlockDays(monthNum, yearNum), 7);
    }

    getWeeklyRowDays (weekNum, yearNum) {
        var range = getWeeklyRowDateRange(weekNum, yearNum);

        var startDayMoment = moment(range.start).add(this.firstWeekDay, 'days');

        var days = [startDayMoment.format('YYYY-MM-DD')];
        for (var i = 1; i < 7; i++) {
            days.push(startDayMoment.add(1, 'days').format('YYYY-MM-DD'));
        }

        return days;
    }

    getMonthlyWeekLabels () {
        var weekDaySimpleLabelArr = [].concat(this.weekDaySimpleLabelArr);

        var offsetArr = weekDaySimpleLabelArr.splice(0, this.firstWeekDay);
        return weekDaySimpleLabelArr.concat(offsetArr || []);
    }

    getDailyHourRows () {
        var hourCount = 24;
        var rows = [];
        for (var i = 0; i < hourCount; i++) {
            rows.push({ hourNum: i, hourTimeLabel: NumLenghtFormat(i, 2) + ':00' });
        }
        return rows;
    }
}
