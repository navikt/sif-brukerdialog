"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangePickerLimitations = exports.getMinDateForRangeEnd = exports.getMinDateForRangeStart = exports.getMaxDateForRangeEnd = exports.getMaxDateForRangeStart = exports.getClosestDateRangeAfterDate = exports.getClosestDateRangeBeforeDate = exports.findClosestDateBeforeOrEqualDate = exports.findClosestDateBeforeDate = exports.findClosestDateAfterDate = exports.getRangesEndingBeforeDate = exports.getRangesStartingAfterDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const minMax_1 = __importDefault(require("dayjs/plugin/minMax"));
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(minMax_1.default);
const sortDateRange = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};
const sortDateRangeByToDate = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.to).isSameOrBefore(d2.to)) {
        return -1;
    }
    return 1;
};
const getRangesStartingAfterDate = (date, dateRanges = []) => {
    return dateRanges.filter((dateRange) => (0, dayjs_1.default)(dateRange.from).isAfter(date, 'day'));
};
exports.getRangesStartingAfterDate = getRangesStartingAfterDate;
const getRangesEndingBeforeDate = (date, dateRanges = []) => {
    return dateRanges.filter((dateRange) => (0, dayjs_1.default)(dateRange.to).isBefore(date, 'day'));
};
exports.getRangesEndingBeforeDate = getRangesEndingBeforeDate;
const findClosestDateAfterDate = (fromDate, dates) => {
    const dayjss = dates.map((d) => (0, dayjs_1.default)(d)).filter((m) => m.isAfter(fromDate, 'day'));
    return dayjss.length > 0 ? dayjs_1.default.min(dayjss).toDate() : undefined;
};
exports.findClosestDateAfterDate = findClosestDateAfterDate;
const findClosestDateBeforeDate = (fromDate, dates) => {
    const dayjss = dates.map((d) => (0, dayjs_1.default)(d)).filter((m) => m.isBefore(fromDate, 'day'));
    const maxDate = dayjss.length > 0 ? dayjs_1.default.max(dayjss).toDate() : undefined;
    return maxDate;
};
exports.findClosestDateBeforeDate = findClosestDateBeforeDate;
const findClosestDateBeforeOrEqualDate = (fromDate, dates) => {
    const dayjss = dates.map((d) => (0, dayjs_1.default)(d)).filter((m) => m.isSameOrBefore(fromDate, 'day'));
    const maxDate = dayjss.length > 0 ? dayjs_1.default.max(dayjss).toDate() : undefined;
    return maxDate;
};
exports.findClosestDateBeforeOrEqualDate = findClosestDateBeforeOrEqualDate;
const getClosestDateRangeBeforeDate = (date, ranges) => {
    const rangesBeforeDate = (0, exports.getRangesEndingBeforeDate)(date, ranges).sort(sortDateRangeByToDate).reverse();
    return rangesBeforeDate.length === 0 ? undefined : rangesBeforeDate[0];
};
exports.getClosestDateRangeBeforeDate = getClosestDateRangeBeforeDate;
const getClosestDateRangeAfterDate = (date, ranges) => {
    const rangesAfterDate = (0, exports.getRangesStartingAfterDate)(date, ranges).sort(sortDateRange);
    return rangesAfterDate.length === 0 ? undefined : rangesAfterDate[0];
};
exports.getClosestDateRangeAfterDate = getClosestDateRangeAfterDate;
const getFollowingDate = (dateRange, allowRangesToStartAndStopOnSameDate) => {
    if (!dateRange) {
        return undefined;
    }
    return allowRangesToStartAndStopOnSameDate ? dateRange.from : (0, dayjs_1.default)(dateRange.from).subtract(1, 'day').toDate();
};
const getMaxDateForRangeStart = ({ fromDate, toDate, maxDate, otherRanges: dateRanges = [], allowRangesToStartAndStopOnSameDate, }) => {
    if (!fromDate) {
        return toDate || maxDate;
    }
    const follwingDateRange = (0, exports.getClosestDateRangeAfterDate)(fromDate, dateRanges);
    const followingRangeeDate = getFollowingDate(follwingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates = [
        ...(toDate ? [toDate] : []),
        ...(maxDate ? [maxDate] : []),
        ...(followingRangeeDate ? [followingRangeeDate] : []),
    ];
    return (0, exports.findClosestDateAfterDate)(fromDate, dates);
};
exports.getMaxDateForRangeStart = getMaxDateForRangeStart;
const getMaxDateForRangeEnd = ({ fromDate, toDate, maxDate, dateRanges = [], allowRangesToStartAndStopOnSameDate, }) => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return maxDate;
    }
    const follwingDateRange = (0, exports.getClosestDateRangeAfterDate)(baseDate, dateRanges);
    const followingDate = getFollowingDate(follwingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates = [...(maxDate ? [maxDate] : []), ...(followingDate ? [followingDate] : [])];
    return (0, exports.findClosestDateAfterDate)(baseDate, dates) || maxDate;
};
exports.getMaxDateForRangeEnd = getMaxDateForRangeEnd;
const getPreceedingDate = (dateRange, allowRangesToStartAndStopOnSameDate) => {
    if (!dateRange) {
        return undefined;
    }
    return allowRangesToStartAndStopOnSameDate ? dateRange.to : (0, dayjs_1.default)(dateRange.to).add(1, 'day').toDate();
};
const getMinDateForRangeStart = ({ toDate, minDate, dateRanges = [], allowRangesToStartAndStopOnSameDate, }) => {
    if (!toDate) {
        return minDate;
    }
    const preceedingDateRange = (0, exports.getClosestDateRangeBeforeDate)(toDate, dateRanges);
    const preceedingDate = getPreceedingDate(preceedingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates = [...(minDate ? [minDate] : []), ...(preceedingDate ? [preceedingDate] : [])];
    return (0, exports.findClosestDateBeforeDate)(toDate, dates);
};
exports.getMinDateForRangeStart = getMinDateForRangeStart;
const getMinDateForRangeEnd = ({ fromDate, toDate, minDate, dateRanges: otherRanges = [], allowRangesToStartAndStopOnSameDate, }) => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return minDate;
    }
    const preceedingDateRange = (0, exports.getClosestDateRangeBeforeDate)(baseDate, otherRanges);
    const preceedingDate = getPreceedingDate(preceedingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates = [
        ...(fromDate ? [fromDate] : []),
        ...(minDate ? [minDate] : []),
        ...(preceedingDate ? [preceedingDate] : []),
    ];
    return (0, exports.findClosestDateBeforeOrEqualDate)(baseDate, dates);
};
exports.getMinDateForRangeEnd = getMinDateForRangeEnd;
const getDateRangePickerLimitations = (props) => {
    return {
        fromDateLimitations: {
            minDate: (0, exports.getMinDateForRangeStart)(props),
            maxDate: (0, exports.getMaxDateForRangeStart)(props),
            disabledDateRanges: props.dateRanges,
            disableWeekend: props.disableWeekend,
        },
        toDateLimitations: {
            minDate: (0, exports.getMinDateForRangeEnd)(props),
            maxDate: (0, exports.getMaxDateForRangeEnd)(props),
            disabledDateRanges: props.dateRanges,
            disableWeekend: props.disableWeekend,
        },
    };
};
exports.getDateRangePickerLimitations = getDateRangePickerLimitations;
