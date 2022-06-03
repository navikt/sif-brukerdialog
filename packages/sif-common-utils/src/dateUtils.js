"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateUtils = exports.sortDateArray = exports.getLastOfTwoDates = exports.getFirstOfTwoDates = exports.getYearMonthKey = exports.isDateInDates = exports.isDateWeekDay = exports.getWeeksInMonth = exports.getFirstWeekdayOnOrAfterDate = exports.getLastWeekdayOnOrBeforeDate = exports.getLastWeekDayInMonth = exports.getWeekFromDate = exports.getFirstWeekDayInMonth = exports.getDatesInMonth = exports.getISOWeekdayFromISODate = exports.ISODateToDate = exports.dateToISODate = exports.dateToday = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const _1 = require(".");
const dateRangeUtils_1 = require("./dateRangeUtils");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(isoWeek_1.default);
const ISODateFormat = 'YYYY-MM-DD';
exports.dateToday = (0, dayjs_1.default)().toDate();
const dateToISODate = (date) => (0, dayjs_1.default)(date).format(ISODateFormat);
exports.dateToISODate = dateToISODate;
const ISODateToDate = (isoDate) => {
    return (0, dayjs_1.default)(isoDate).toDate();
};
exports.ISODateToDate = ISODateToDate;
const getISOWeekdayFromISODate = (isoDate) => {
    return (0, dayjs_1.default)((0, exports.ISODateToDate)(isoDate)).isoWeekday();
};
exports.getISOWeekdayFromISODate = getISOWeekdayFromISODate;
const getDatesInMonth = (month, onlyWeekDays = false) => {
    return (0, dateRangeUtils_1.getDatesInDateRange)((0, dateRangeUtils_1.getMonthDateRange)(month, onlyWeekDays), onlyWeekDays);
};
exports.getDatesInMonth = getDatesInMonth;
const getFirstWeekDayInMonth = (month) => {
    const firstDay = (0, dayjs_1.default)(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').toDate();
    }
    return firstDay.toDate();
};
exports.getFirstWeekDayInMonth = getFirstWeekDayInMonth;
const getWeekFromDate = (date, withinSameMonth = false) => {
    const from = (0, dayjs_1.default)(date).startOf('isoWeek').toDate();
    const to = (0, dayjs_1.default)(date).endOf('isoWeek').toDate();
    if (withinSameMonth === false || ((0, dayjs_1.default)(date).isSame(from, 'month') && (0, dayjs_1.default)(date).isSame(to, 'month'))) {
        return {
            from,
            to,
        };
    }
    return {
        from: (0, exports.getLastOfTwoDates)(from, (0, dayjs_1.default)(date).startOf('month').toDate()),
        to: (0, exports.getFirstOfTwoDates)(to, (0, dayjs_1.default)(date).endOf('month').toDate()),
    };
};
exports.getWeekFromDate = getWeekFromDate;
const getLastWeekDayInMonth = (month) => {
    return (0, exports.getLastWeekdayOnOrBeforeDate)((0, dayjs_1.default)(month).endOf('month').toDate());
};
exports.getLastWeekDayInMonth = getLastWeekDayInMonth;
const getLastWeekdayOnOrBeforeDate = (date) => {
    const isoWeekDay = (0, dayjs_1.default)(date).isoWeekday();
    return isoWeekDay <= 5 ? date : (0, dayjs_1.default)(date).startOf('isoWeek').add(4, 'days').toDate();
};
exports.getLastWeekdayOnOrBeforeDate = getLastWeekdayOnOrBeforeDate;
const getFirstWeekdayOnOrAfterDate = (date) => {
    const isoWeekDay = (0, dayjs_1.default)(date).isoWeekday();
    return isoWeekDay <= 5 ? date : (0, dayjs_1.default)(date).endOf('isoWeek').add(1, 'days').toDate();
};
exports.getFirstWeekdayOnOrAfterDate = getFirstWeekdayOnOrAfterDate;
const getWeeksInMonth = (month, includeWholeWeeks = false) => {
    const range = (0, dateRangeUtils_1.getMonthDateRange)(month);
    return (0, _1.getWeeksInDateRange)({
        from: includeWholeWeeks === false
            ? range.from
            : (0, exports.getFirstOfTwoDates)(range.from, (0, dayjs_1.default)(range.from).startOf('isoWeek').toDate()),
        to: includeWholeWeeks === false
            ? range.to
            : (0, exports.getLastOfTwoDates)(range.to, (0, dayjs_1.default)(range.to).endOf('isoWeek').toDate()),
    });
};
exports.getWeeksInMonth = getWeeksInMonth;
const isDateWeekDay = (date) => {
    return (0, dayjs_1.default)(date).isoWeekday() <= 5;
};
exports.isDateWeekDay = isDateWeekDay;
const isDateInDates = (date, dates) => {
    if (!dates) {
        return false;
    }
    return dates.some((d) => (0, dayjs_1.default)(date).isSame(d, 'day'));
};
exports.isDateInDates = isDateInDates;
const getYearMonthKey = (date) => (0, dayjs_1.default)(date).format('YYYY-MM');
exports.getYearMonthKey = getYearMonthKey;
const getFirstOfTwoDates = (date1, date2) => {
    return (0, dayjs_1.default)(date1).isAfter(date2, 'day') ? date2 : date1;
};
exports.getFirstOfTwoDates = getFirstOfTwoDates;
const getLastOfTwoDates = (date1, date2) => {
    return (0, dayjs_1.default)(date1).isBefore(date2, 'day') ? date2 : date1;
};
exports.getLastOfTwoDates = getLastOfTwoDates;
const sortDateArray = (dates) => dates.sort((d1, d2) => {
    return d1.getTime() - d2.getTime();
});
exports.sortDateArray = sortDateArray;
exports.dateUtils = {
    dateToday: exports.dateToday,
    dateToISODate: exports.dateToISODate,
    getDatesInMonth: exports.getDatesInMonth,
    getFirstOfTwoDates: exports.getFirstOfTwoDates,
    getFirstWeekDayInMonth: exports.getFirstWeekDayInMonth,
    getLastOfTwoDates: exports.getLastOfTwoDates,
    getISOWeekdayFromISODate: exports.getISOWeekdayFromISODate,
    getLastWeekDayInMonth: exports.getLastWeekDayInMonth,
    getYearMonthKey: exports.getYearMonthKey,
    isDateInDates: exports.isDateInDates,
    isDateWeekDay: exports.isDateWeekDay,
    ISODateToDate: exports.ISODateToDate,
};
