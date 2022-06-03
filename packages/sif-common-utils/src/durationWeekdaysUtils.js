"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateDurationMapFromDurationWeekdaysInDateRange = exports.removeDurationWeekdaysWithNoDuration = exports.removeDurationWeekdaysNotInDurationWeekdays = exports.hasWeekdaysWithoutDuration = exports.getAllWeekdaysWithoutDuration = exports.ensureCompleteDurationWeekdays = exports.getWeekdaysWithDuration = exports.durationWeekdaysFromHoursPerWeek = exports.getPercentageOfDurationWeekdays = exports.durationWeekdaysToISODurationWeekdays = exports.getNumberDurationForWeekday = exports.getDurationForISOWeekdayNumber = exports.summarizeDurationInDurationWeekdays = exports.getISOWeekdaysFromDurationWeekdays = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const _1 = require("./");
const dateUtils_1 = require("./dateUtils");
const durationUtils_1 = require("./durationUtils");
const types_1 = require("./types");
dayjs_1.default.extend(isoWeek_1.default);
const getISOWeekdaysFromDurationWeekdays = (durationWeekdays) => {
    const isoWeekdays = [];
    if (durationWeekdays.monday) {
        isoWeekdays.push(1);
    }
    if (durationWeekdays.tuesday) {
        isoWeekdays.push(2);
    }
    if (durationWeekdays.wednesday) {
        isoWeekdays.push(3);
    }
    if (durationWeekdays.thursday) {
        isoWeekdays.push(4);
    }
    if (durationWeekdays.friday) {
        isoWeekdays.push(5);
    }
    return isoWeekdays;
};
exports.getISOWeekdaysFromDurationWeekdays = getISOWeekdaysFromDurationWeekdays;
const summarizeDurationInDurationWeekdays = (weekdays) => {
    return (0, _1.summarizeDurations)([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};
exports.summarizeDurationInDurationWeekdays = summarizeDurationInDurationWeekdays;
const getDurationForISOWeekdayNumber = (durationWeekdays, isoWeekday) => {
    switch (isoWeekday) {
        case 1:
            return durationWeekdays.monday;
        case 2:
            return durationWeekdays.tuesday;
        case 3:
            return durationWeekdays.wednesday;
        case 4:
            return durationWeekdays.thursday;
        case 5:
            return durationWeekdays.friday;
    }
    return undefined;
};
exports.getDurationForISOWeekdayNumber = getDurationForISOWeekdayNumber;
const getNumberDurationForWeekday = (fasteDager, weekday) => {
    switch (weekday) {
        case 'monday':
            return (0, durationUtils_1.getNumberDurationOrUndefined)(fasteDager.monday);
        case 'tuesday':
            return (0, durationUtils_1.getNumberDurationOrUndefined)(fasteDager.tuesday);
        case 'wednesday':
            return (0, durationUtils_1.getNumberDurationOrUndefined)(fasteDager.wednesday);
        case 'thursday':
            return (0, durationUtils_1.getNumberDurationOrUndefined)(fasteDager.thursday);
        case 'friday':
            return (0, durationUtils_1.getNumberDurationOrUndefined)(fasteDager.friday);
        default:
            return undefined;
    }
};
exports.getNumberDurationForWeekday = getNumberDurationForWeekday;
const durationWeekdaysToISODurationWeekdays = ({ monday, tuesday, wednesday, thursday, friday, }) => {
    return {
        monday: monday ? (0, durationUtils_1.durationToISODuration)(monday) : undefined,
        tuesday: tuesday ? (0, durationUtils_1.durationToISODuration)(tuesday) : undefined,
        wednesday: wednesday ? (0, durationUtils_1.durationToISODuration)(wednesday) : undefined,
        thursday: thursday ? (0, durationUtils_1.durationToISODuration)(thursday) : undefined,
        friday: friday ? (0, durationUtils_1.durationToISODuration)(friday) : undefined,
    };
};
exports.durationWeekdaysToISODurationWeekdays = durationWeekdaysToISODurationWeekdays;
const allWeekdays = [types_1.Weekday.monday, types_1.Weekday.tuesday, types_1.Weekday.wednesday, types_1.Weekday.thursday, types_1.Weekday.friday];
const getPercentageOfDurationWeekdays = (percentage, weekdays) => ({
    monday: weekdays.monday ? (0, durationUtils_1.getPercentageOfDuration)(weekdays.monday, percentage) : undefined,
    tuesday: weekdays.tuesday ? (0, durationUtils_1.getPercentageOfDuration)(weekdays.tuesday, percentage) : undefined,
    wednesday: weekdays.wednesday ? (0, durationUtils_1.getPercentageOfDuration)(weekdays.wednesday, percentage) : undefined,
    thursday: weekdays.thursday ? (0, durationUtils_1.getPercentageOfDuration)(weekdays.thursday, percentage) : undefined,
    friday: weekdays.friday ? (0, durationUtils_1.getPercentageOfDuration)(weekdays.friday, percentage) : undefined,
});
exports.getPercentageOfDurationWeekdays = getPercentageOfDurationWeekdays;
const durationWeekdaysFromHoursPerWeek = (timer) => {
    const tidPerDag = (0, durationUtils_1.decimalDurationToDuration)(timer / 5);
    return {
        monday: tidPerDag,
        tuesday: tidPerDag,
        wednesday: tidPerDag,
        thursday: tidPerDag,
        friday: tidPerDag,
    };
};
exports.durationWeekdaysFromHoursPerWeek = durationWeekdaysFromHoursPerWeek;
const getWeekdaysWithDuration = (durationWeekdays) => {
    return Object.keys(durationWeekdays)
        .filter((key) => {
        const duration = durationWeekdays[key];
        return duration ? (0, durationUtils_1.durationToDecimalDuration)(duration) > 0 : false;
    })
        .map((key) => key);
};
exports.getWeekdaysWithDuration = getWeekdaysWithDuration;
const ensureCompleteDurationWeekdays = (durationWeekdays) => {
    return {
        [types_1.Weekday.monday]: (0, durationUtils_1.ensureDuration)(durationWeekdays[types_1.Weekday.monday] || {}),
        [types_1.Weekday.tuesday]: (0, durationUtils_1.ensureDuration)(durationWeekdays[types_1.Weekday.tuesday] || {}),
        [types_1.Weekday.wednesday]: (0, durationUtils_1.ensureDuration)(durationWeekdays[types_1.Weekday.wednesday] || {}),
        [types_1.Weekday.thursday]: (0, durationUtils_1.ensureDuration)(durationWeekdays[types_1.Weekday.thursday] || {}),
        [types_1.Weekday.friday]: (0, durationUtils_1.ensureDuration)(durationWeekdays[types_1.Weekday.friday] || {}),
    };
};
exports.ensureCompleteDurationWeekdays = ensureCompleteDurationWeekdays;
const getAllWeekdaysWithoutDuration = (durationWeekdays) => {
    const days = [];
    allWeekdays.forEach((weekday) => {
        if ((0, durationUtils_1.durationIsGreatherThanZero)(durationWeekdays[weekday]) === false) {
            days.push(weekday);
        }
    });
    return days;
};
exports.getAllWeekdaysWithoutDuration = getAllWeekdaysWithoutDuration;
const hasWeekdaysWithoutDuration = (durationWeekdays) => allWeekdays.some((weekday) => (0, durationUtils_1.durationIsGreatherThanZero)(durationWeekdays[weekday]) === false);
exports.hasWeekdaysWithoutDuration = hasWeekdaysWithoutDuration;
const removeDurationWeekdaysNotInDurationWeekdays = (weekdays1, weekdays2) => {
    return {
        [types_1.Weekday.monday]: weekdays2.monday ? weekdays1.monday : undefined,
        [types_1.Weekday.tuesday]: weekdays2.tuesday ? weekdays1.tuesday : undefined,
        [types_1.Weekday.wednesday]: weekdays2.wednesday ? weekdays1.wednesday : undefined,
        [types_1.Weekday.thursday]: weekdays2.thursday ? weekdays1.thursday : undefined,
        [types_1.Weekday.friday]: weekdays2.friday ? weekdays1.friday : undefined,
    };
};
exports.removeDurationWeekdaysNotInDurationWeekdays = removeDurationWeekdaysNotInDurationWeekdays;
const getDurationOrUndefinedIfZeroDuration = (duration) => {
    if (duration === undefined) {
        return undefined;
    }
    if ((0, durationUtils_1.isValidDuration)(duration) === false) {
        return duration;
    }
    return (0, durationUtils_1.durationIsGreatherThanZero)(duration) ? duration : undefined;
};
const removeDurationWeekdaysWithNoDuration = ({ monday, tuesday, wednesday, thursday, friday, }) => {
    return {
        [types_1.Weekday.monday]: getDurationOrUndefinedIfZeroDuration(monday),
        [types_1.Weekday.tuesday]: getDurationOrUndefinedIfZeroDuration(tuesday),
        [types_1.Weekday.wednesday]: getDurationOrUndefinedIfZeroDuration(wednesday),
        [types_1.Weekday.thursday]: getDurationOrUndefinedIfZeroDuration(thursday),
        [types_1.Weekday.friday]: getDurationOrUndefinedIfZeroDuration(friday),
    };
};
exports.removeDurationWeekdaysWithNoDuration = removeDurationWeekdaysWithNoDuration;
const getDateDurationMapFromDurationWeekdaysInDateRange = (dateRange, durationWeekdays) => {
    const resultMap = {};
    const weekdays = (0, exports.getISOWeekdaysFromDurationWeekdays)(durationWeekdays);
    (0, _1.getDatesInDateRange)(dateRange)
        .filter((d) => weekdays.includes((0, dayjs_1.default)(d).isoWeekday()))
        .forEach((d) => {
        const isoDate = (0, dateUtils_1.dateToISODate)(d);
        const duration = (0, exports.getDurationForISOWeekdayNumber)(durationWeekdays, (0, dayjs_1.default)(d).isoWeekday());
        if (duration) {
            resultMap[isoDate] = duration;
        }
    });
    return resultMap;
};
exports.getDateDurationMapFromDurationWeekdaysInDateRange = getDateDurationMapFromDurationWeekdaysInDateRange;
