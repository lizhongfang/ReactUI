import moment from 'moment';

const MonthSimpleLabelArr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
const MonthSimpleZHCNLabelArr = [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ];
const MonthCompleteLabelArr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];


const WeekDaySimpleLabelArr = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const WeekDayCompleteLabelArr = [ 'Sunday', 'Monday', 'Tuesday', 'Wensday', 'Thuaday', 'Friday', 'Sataday' ];


// moment().weekday() // 0: Sun, Mon: 1, ..., Fir: 5

function formatDateStr (y, m, d) {
    var arr = [];
    y && arr.push(NumLenghtFormat(y, 4));
    m && arr.push(NumLenghtFormat(m, 2));
    d && arr.push(NumLenghtFormat(d, 2));
    return arr.join('-');
}



// 获取目标日期 数字标识 { y: 2020, m: 1, w: 5, d: 17 } //
function getCurrentDateNum (target) {
    var m = target ? moment(target) : moment();

    return {
        y: m.year(), m: m.month() + 1, w: m.weekday(), d: m.date(),
        wNo: m.weeks() // 当年第几星期
    };
}


// 获取当前年月第一天
function getMonthFirstDayMoment (monthNum, yearNum) {
    var currentDateNums = null;
    if (!monthNum || !yearNum) {
        currentDateNums = getCurrentDateNum();
    }
    monthNum = monthNum || currentDateNums.m;
    yearNum = yearNum || currentDateNums.y;

    // var monthFirstDayMoment = moment(formatDateStr(yearNum, monthNum, '01'));

    return moment(formatDateStr(yearNum, monthNum)).startOf('month');
}

// 获取当前年月最后一天
function getMonthLastDayMoment (monthNum, yearNum) {
    var currentDateNums = null;
    if (!monthNum || !yearNum) {
        currentDateNums = getCurrentDateNum();
    }
    monthNum = monthNum || currentDateNums.m;
    yearNum = yearNum || currentDateNums.y;

    // var monthFirstDayMoment = moment(formatDateStr(yearNum, monthNum, '01'));

    return moment(formatDateStr(yearNum, monthNum)).endOf('month');
}

function getMonthlyBlockDays (monthNum, yearNum) {
    var startDateMoment = getMonthFirstDayMoment(monthNum, yearNum);

    var startWeekDay = getCurrentDateNum(startDateMoment).w;

    var diffStart = 0 - startWeekDay;

    var monthlyBlockStartDate = startDateMoment.add(diffStart, 'days');

    var endDateMoment = getMonthLastDayMoment(monthNum, yearNum);

    var endWeekDay = getCurrentDateNum(endDateMoment).w;

    var diffEnd = 6 - endWeekDay;

    var monthlyBlockEndDate = endDateMoment.add(diffEnd, 'days');

    // return { monthlyBlockStartDate, monthlyBlockEndDate };
    return { start: monthlyBlockStartDate, end: monthlyBlockEndDate };
}


function getCurrentWeekNum (targetDate) {
    return (targetDate ? moment(targetDate) : moment()).weeks();
}

function getWeeklyRowDateRange (weekNum, yearNum) { // 当年星期序号 最小为 1
    weekNum !== null && weekNum !== undefined && (weekNum = Math.max(1, weekNum));
    var currentMoment = yearNum ? moment(formatDateStr(yearNum)) : moment();
    var targetWeekMoment = weekNum ? currentMoment.weeks(weekNum) : currentMoment;

    var start = targetWeekMoment.startOf('week').format();
    var end = targetWeekMoment.endOf('week').format();

    return { start, end };
}


const ArrToMatrix = function (arr, rowLength) {
    var matrix = [];
    while(arr.length) {
        matrix.push(arr.splice(0, rowLength));
    }
    return matrix;
};

const NumLenghtFormat = function (num, formatLenght) {
    var maxNumLimit = 1;
    for (var i = 0; i < formatLenght; i++) {
        maxNumLimit = maxNumLimit * 10;
    }

    if (num >= maxNumLimit) {
        return num.toString();
    }
    return (maxNumLimit + num).toString().substr(1);
};

const IsToday = function (date) {
    return moment().format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
};

const RegionDateBetween = function (targetDate, startDate, endDate) {
    return moment(targetDate).isBetween(startDate, endDate, null, '[]'); //true
};

const GetDayCountBetween = function (startDate, endDate) {
    return moment(endDate).diff(moment(startDate)) / 24 / 60 / 60 / 1000;
};

const NotCurrentMonth = function (date, currentViewDate) {
    return moment(date).format('YYYY-MM') !== moment(currentViewDate).format('YYYY-MM');
};

// // 0 年份
// // 1 月份
// // 2 日期
// // 3 小时
// // 4 分钟
// // 5 秒钟
// // 6 毫秒
// const DateStrInvalidAtDay = function (dateStr) {
//     return moment(dateStr).invalidAt() == 2;
// }

const DateStrComplete = function (dateStr) {
    if (!moment(dateStr).isValid()) {
        return false;
    }
    var splitArr = dateStr.split('-')
    return splitArr.length == 3 && !!splitArr[2];
}

export default {
    formatDateStr,
    getCurrentDateNum, getMonthFirstDayMoment, getMonthLastDayMoment,getMonthlyBlockDays,
    getCurrentWeekNum, getWeeklyRowDateRange,
    ArrToMatrix, NumLenghtFormat, IsToday, NotCurrentMonth, RegionDateBetween, GetDayCountBetween,
    MonthSimpleZHCNLabelArr,
    // DateStrInvalidAtDay
    DateStrComplete
};
