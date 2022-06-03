"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRangeUtils = exports.ISODateToISODateRange = exports.getISODatesInISODateRange = exports.dateRangeToISODateRange = exports.ISODateRangeToISODates = exports.ISODateRangeToDateRange = exports.getDatesInMonthOutsideDateRange = exports.getDateRangesBetweenDateRanges = exports.getDateRangeFromDateRanges = exports.getNumberOfDaysInDateRange = exports.getYearsInDateRanges = exports.getDatesInDateRange = exports.getWeeksInDateRange = exports.getWeekDateRange = exports.getMonthDateRange = exports.getMonthsInDateRange = exports.isDateInsideDateRange = exports.isDateInDateRange = exports.isDateInMaybeDateRange = exports.datesCollideWithDateRanges = exports.dateRangesCollide = exports.sortDateRangeByToDate = exports.sortDateRange = exports.isDateRange = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const minMax_1 = __importDefault(require("dayjs/plugin/minMax"));
const lodash_1 = require("lodash");
const _1 = require(".");
const dateUtils_1 = require("./dateUtils");
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(minMax_1.default);
const isDateRange = (dateRange) => {
    return dateRange.from && dateRange.to;
};
exports.isDateRange = isDateRange;
const sortDateRange = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};
exports.sortDateRange = sortDateRange;
const sortDateRangeByToDate = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.to).isSameOrBefore(d2.to, 'day')) {
        return -1;
    }
    return 1;
};
exports.sortDateRangeByToDate = sortDateRangeByToDate;
const dateRangesCollide = (dateRanges, fromDateCanBeSameAsPreviousToDate = false) => {
    if (dateRanges.length > 0) {
        const sortedDates = dateRanges.sort(exports.sortDateRange);
        const hasOverlap = dateRanges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                if (fromDateCanBeSameAsPreviousToDate) {
                    return (0, dayjs_1.default)(d.to).isAfter(sortedDates[idx + 1].from, 'day');
                }
                else {
                    return (0, dayjs_1.default)(d.to).isSameOrAfter(sortedDates[idx + 1].from, 'day');
                }
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};
exports.dateRangesCollide = dateRangesCollide;
const datesCollideWithDateRanges = (dates, dateRanges) => {
    if (dateRanges.length > 0 && dates.length > 0) {
        return dates.some((d) => {
            return dateRanges.some((range) => (0, exports.isDateInDateRange)(d, range));
        });
    }
    return false;
};
exports.datesCollideWithDateRanges = datesCollideWithDateRanges;
const isDateInMaybeDateRange = (date, dateRange) => {
    if ((0, exports.isDateRange)(dateRange)) {
        return (0, exports.isDateInDateRange)(date, dateRange);
    }
    if (dateRange.from) {
        return (0, dayjs_1.default)(date).isSameOrAfter(dateRange.from);
    }
    if (dateRange.to) {
        return (0, dayjs_1.default)(date).isSameOrBefore(dateRange.to);
    }
    return false;
};
exports.isDateInMaybeDateRange = isDateInMaybeDateRange;
const isDateInDateRange = (date, dateRange) => {
    return (0, dayjs_1.default)(date).isBetween(dateRange.from, dateRange.to, 'day', '[]');
};
exports.isDateInDateRange = isDateInDateRange;
const isDateInsideDateRange = (date, dateRange) => {
    return (0, dayjs_1.default)(date).isBetween(dateRange.from, dateRange.to, 'day', '()');
};
exports.isDateInsideDateRange = isDateInsideDateRange;
const getMonthsInDateRange = (dateRange, returnFullMonths = false) => {
    const months = [];
    let current = (0, dayjs_1.default)(dateRange.from);
    do {
        const from = returnFullMonths ? current.startOf('month').toDate() : current.toDate();
        const endOfMonth = (0, dayjs_1.default)(from).endOf('month').toDate();
        const to = (0, dayjs_1.default)(endOfMonth).isAfter(dateRange.to, 'day') && returnFullMonths === false ? dateRange.to : endOfMonth;
        months.push({ from, to });
        current = current.add(1, 'month').startOf('month');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return months;
};
exports.getMonthsInDateRange = getMonthsInDateRange;
const getMonthDateRange = (date, onlyWeekDays = false) => ({
    from: onlyWeekDays ? (0, dateUtils_1.getFirstWeekDayInMonth)(date) : (0, dayjs_1.default)(date).startOf('month').toDate(),
    to: onlyWeekDays ? (0, dateUtils_1.getLastWeekDayInMonth)(date) : (0, dayjs_1.default)(date).endOf('month').toDate(),
});
exports.getMonthDateRange = getMonthDateRange;
const getWeekDateRange = (date, onlyWeekDays = false) => {
    return {
        from: (0, dayjs_1.default)(date).startOf('isoWeek').toDate(),
        to: (0, dayjs_1.default)(date)
            .endOf('isoWeek')
            .subtract(onlyWeekDays ? 2 : 0, 'days')
            .toDate(),
    };
};
exports.getWeekDateRange = getWeekDateRange;
const getWeeksInDateRange = (dateRange) => {
    const weeks = [];
    let current = (0, dayjs_1.default)(dateRange.from);
    do {
        const weekDateRange = { from: current.toDate(), to: current.endOf('isoWeek').toDate() };
        const rangeToPush = {
            from: weekDateRange.from,
            to: (0, _1.getFirstOfTwoDates)(weekDateRange.to, dateRange.to),
        };
        weeks.push(rangeToPush);
        current = current.add(1, 'week').startOf('isoWeek');
    } while (current.isBefore(dateRange.to, 'day'));
    if (current.isSame(dateRange.to, 'day')) {
        weeks.push({ from: dateRange.to, to: dateRange.to });
    }
    return weeks;
};
exports.getWeeksInDateRange = getWeeksInDateRange;
const getDatesInDateRange = (dateRange, onlyWeekDays = false) => {
    const dates = [];
    let current = (0, dayjs_1.default)(dateRange.from);
    do {
        const date = current.toDate();
        if (onlyWeekDays === false || (0, dateUtils_1.isDateWeekDay)(date)) {
            dates.push(date);
        }
        current = current.add(1, 'day');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return dates;
};
exports.getDatesInDateRange = getDatesInDateRange;
const getYearsInDateRanges = (dateRanges) => (0, lodash_1.uniq)(dateRanges.map((d) => d.from.getFullYear()));
exports.getYearsInDateRanges = getYearsInDateRanges;
const getNumberOfDaysInDateRange = (dateRange, onlyWeekDays = false) => onlyWeekDays
    ? (0, exports.getDatesInDateRange)(dateRange, onlyWeekDays).length
    : Math.abs((0, dayjs_1.default)(dateRange.to).diff(dateRange.from, 'days')) + 1;
exports.getNumberOfDaysInDateRange = getNumberOfDaysInDateRange;
const getDateRangeFromDateRanges = (dateRanges) => {
    return {
        from: dayjs_1.default.min(dateRanges.map((range) => (0, dayjs_1.default)(range.from))).toDate(),
        to: dayjs_1.default.max(dateRanges.map((range) => (0, dayjs_1.default)(range.to))).toDate(),
    };
};
exports.getDateRangeFromDateRanges = getDateRangeFromDateRanges;
const getDateRangesBetweenDateRanges = (dateRanges) => {
    const rangesInBetween = [];
    dateRanges.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        const rangeInBetween = {
            from: (0, dayjs_1.default)(dateRanges[index - 1].to)
                .add(1, 'day')
                .toDate(),
            to: (0, dayjs_1.default)(periode.from).subtract(1, 'day').toDate(),
        };
        if ((0, dayjs_1.default)(rangeInBetween.from).isSameOrBefore(rangeInBetween.to, 'day')) {
            rangesInBetween.push(rangeInBetween);
        }
    });
    return rangesInBetween;
};
exports.getDateRangesBetweenDateRanges = getDateRangesBetweenDateRanges;
const getDatesInMonthOutsideDateRange = (month, dateRange) => {
    const monthDateRange = (0, exports.getMonthDateRange)(month);
    const dates = [];
    if ((0, dayjs_1.default)(dateRange.from).isAfter(monthDateRange.from, 'day')) {
        dates.push(...(0, exports.getDatesInDateRange)({
            from: monthDateRange.from,
            to: (0, dayjs_1.default)(dateRange.from).subtract(1, 'day').toDate(),
        }));
    }
    if ((0, dayjs_1.default)(dateRange.to).isBefore(monthDateRange.to, 'day')) {
        dates.push(...(0, exports.getDatesInDateRange)({
            from: (0, dayjs_1.default)(dateRange.to).add(1, 'day').toDate(),
            to: monthDateRange.to,
        }));
    }
    return dates;
};
exports.getDatesInMonthOutsideDateRange = getDatesInMonthOutsideDateRange;
const ISODateRangeToDateRange = (isoDateRange) => {
    const parts = isoDateRange.split('/');
    return {
        from: (0, dateUtils_1.ISODateToDate)(parts[0]),
        to: (0, dateUtils_1.ISODateToDate)(parts[1]),
    };
};
exports.ISODateRangeToDateRange = ISODateRangeToDateRange;
const ISODateRangeToISODates = (isoDateRange) => {
    const parts = isoDateRange.split('/');
    return {
        from: parts[0],
        to: parts[1],
    };
};
exports.ISODateRangeToISODates = ISODateRangeToISODates;
const dateRangeToISODateRange = (dateRange) => {
    return `${(0, dateUtils_1.dateToISODate)(dateRange.from)}/${(0, dateUtils_1.dateToISODate)(dateRange.to)}`;
};
exports.dateRangeToISODateRange = dateRangeToISODateRange;
const getISODatesInISODateRange = (range, onlyWeekDays = false) => {
    const dateRange = (0, exports.ISODateRangeToDateRange)(range);
    return (0, exports.getDatesInDateRange)(dateRange)
        .filter((date) => (onlyWeekDays ? (0, dateUtils_1.isDateWeekDay)(date) : true))
        .map((date) => (0, dateUtils_1.dateToISODate)(date));
};
exports.getISODatesInISODateRange = getISODatesInISODateRange;
const ISODateToISODateRange = (isoDate) => {
    return `${isoDate}/${isoDate}`;
};
exports.ISODateToISODateRange = ISODateToISODateRange;
exports.dateRangeUtils = {
    dateRangesCollide: exports.dateRangesCollide,
    dateRangeToISODateRange: exports.dateRangeToISODateRange,
    datesCollideWithDateRanges: exports.datesCollideWithDateRanges,
    getDateRangeFromDateRanges: exports.getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges: exports.getDateRangesBetweenDateRanges,
    getMonthDateRange: exports.getMonthDateRange,
    getMonthsInDateRange: exports.getMonthsInDateRange,
    getNumberOfDaysInDateRange: exports.getNumberOfDaysInDateRange,
    getWeekDateRange: exports.getWeekDateRange,
    isDateInDateRange: exports.isDateInDateRange,
    isDateInMaybeDateRange: exports.isDateInMaybeDateRange,
    isDateInsideDateRange: exports.isDateInsideDateRange,
    isDateRange: exports.isDateRange,
    ISODateRangeToDateRange: exports.ISODateRangeToDateRange,
    ISODateRangeToISODates: exports.ISODateRangeToISODates,
    ISODateToISODateRange: exports.ISODateToISODateRange,
    sortDateRange: exports.sortDateRange,
    sortDateRangeByToDate: exports.sortDateRangeByToDate,
};
