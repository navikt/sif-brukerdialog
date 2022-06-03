"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.durationUtils = exports.getDateRangeFromDateDurationMap = exports.getNumberDurationOrUndefined = exports.durationIsGreatherThanZero = exports.getDateDurationDiff = exports.removeDatesFromDateDurationMap = exports.getDurationsInDateRange = exports.getDatesWithDurationLongerThanZero = exports.summarizeDateDurationMap = exports.getValidDurations = exports.getDurationsDiff = exports.isValidDuration = exports.durationToDecimalDuration = exports.decimalDurationToISODuration = exports.decimalDurationToDuration = exports.decimalDurationToNumberDuration = exports.getPercentageOfDuration = exports.getPercentageOfISODuration = exports.getPercentageOfDecimalDuration = exports.ISODurationToDecimalDuration = exports.ISODurationToDuration = exports.ISODurationToMaybeDuration = exports.ISODurationToNumberDuration = exports.summarizeDurations = exports.durationsAreEqual = exports.durationToISODuration = exports.durationIsZero = exports.ensureDuration = exports.ensureNumberDuration = exports.durationAsNumberDuration = exports.numberDurationAsDuration = exports.getPositiveNumberValue = void 0;
const iso8601_duration_1 = require("iso8601-duration");
const lodash_1 = require("lodash");
const _1 = require(".");
const dateUtils_1 = require("./dateUtils");
const getPositiveNumberValue = (value) => {
    if (typeof value === 'number' && value >= 0) {
        return value;
    }
    if (typeof value === 'string') {
        if ((0, lodash_1.trim)(value).length === 0) {
            return undefined;
        }
        const numberValue = parseInt(value, 10);
        if (!isNaN(numberValue) && numberValue >= 0) {
            return numberValue;
        }
    }
    if (typeof value === 'undefined') {
        return undefined;
    }
    return 'invalidNumberValue';
};
exports.getPositiveNumberValue = getPositiveNumberValue;
const numberDurationAsDuration = (duration) => {
    const d = (0, exports.ensureNumberDuration)(duration);
    return {
        hours: `${d.hours}`,
        minutes: `${d.minutes}`,
    };
};
exports.numberDurationAsDuration = numberDurationAsDuration;
const durationAsNumberDuration = (duration) => (0, exports.ensureNumberDuration)(duration);
exports.durationAsNumberDuration = durationAsNumberDuration;
const ensureNumberDuration = (duration) => {
    const hours = (0, exports.getPositiveNumberValue)(duration.hours);
    const minutes = (0, exports.getPositiveNumberValue)(duration.minutes);
    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return { hours: 0, minutes: 0 };
    }
    return {
        hours: hours || 0,
        minutes: minutes || 0,
    };
};
exports.ensureNumberDuration = ensureNumberDuration;
const ensureDuration = (duration) => {
    const d = (0, exports.ensureNumberDuration)(duration);
    return {
        hours: `${d.hours}`,
        minutes: `${d.minutes}`,
    };
};
exports.ensureDuration = ensureDuration;
const durationIsZero = (duration) => {
    return (0, exports.durationToISODuration)(duration) === 'PT0H0M';
};
exports.durationIsZero = durationIsZero;
const durationToISODuration = (duration) => {
    const { hours, minutes } = (0, exports.ensureNumberDuration)(duration);
    return `PT${hours}H${minutes}M`;
};
exports.durationToISODuration = durationToISODuration;
const durationsAreEqual = (duration1, duration2) => {
    if (duration1 === undefined && duration2 === undefined) {
        return true;
    }
    if (duration1 === undefined || duration2 === undefined) {
        return false;
    }
    return (0, exports.durationToISODuration)(duration1) === (0, exports.durationToISODuration)(duration2);
};
exports.durationsAreEqual = durationsAreEqual;
const summarizeDurations = (durations) => {
    let minutes = 0;
    durations.forEach((duration) => {
        if (duration) {
            const dur = (0, exports.ensureNumberDuration)(duration);
            minutes += dur.hours * 60 + dur.minutes;
        }
    });
    return {
        hours: Math.floor(minutes / 60),
        minutes: minutes % 60,
    };
};
exports.summarizeDurations = summarizeDurations;
const ISODurationToNumberDuration = (duration) => {
    try {
        const parts = (0, iso8601_duration_1.parse)(duration);
        return {
            hours: parts.hours || 0,
            minutes: parts.minutes || 0,
        };
    }
    catch (e) {
        return undefined;
    }
};
exports.ISODurationToNumberDuration = ISODurationToNumberDuration;
const ISODurationToMaybeDuration = (duration) => {
    try {
        return (0, exports.ISODurationToDuration)(duration);
    }
    catch (e) {
        return undefined;
    }
};
exports.ISODurationToMaybeDuration = ISODurationToMaybeDuration;
const ISODurationToDuration = (validDuration) => {
    const parts = (0, iso8601_duration_1.parse)(validDuration);
    return {
        hours: `${parts.hours}`,
        minutes: `${parts.minutes}`,
    };
};
exports.ISODurationToDuration = ISODurationToDuration;
const ISODurationToDecimalDuration = (isoDuration) => {
    const duration = (0, exports.ISODurationToMaybeDuration)(isoDuration);
    return duration ? (0, exports.durationToDecimalDuration)(duration) : undefined;
};
exports.ISODurationToDecimalDuration = ISODurationToDecimalDuration;
const getPercentageOfDecimalDuration = (decimalDuration, percentage) => {
    return (decimalDuration / 100) * percentage;
};
exports.getPercentageOfDecimalDuration = getPercentageOfDecimalDuration;
const getPercentageOfISODuration = (isoDuration, percentage) => {
    const decimalDuration = (0, exports.ISODurationToDecimalDuration)(isoDuration);
    if (decimalDuration) {
        return (0, exports.decimalDurationToISODuration)((0, exports.getPercentageOfDecimalDuration)(decimalDuration, percentage));
    }
    return undefined;
};
exports.getPercentageOfISODuration = getPercentageOfISODuration;
const getPercentageOfDuration = (duration, percentage) => {
    return (0, exports.decimalDurationToDuration)((0, exports.getPercentageOfDecimalDuration)((0, exports.durationToDecimalDuration)(duration), percentage));
};
exports.getPercentageOfDuration = getPercentageOfDuration;
const decimalDurationToNumberDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return {
        hours,
        minutes,
    };
};
exports.decimalDurationToNumberDuration = decimalDurationToNumberDuration;
const decimalDurationToDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return (0, exports.numberDurationAsDuration)((0, exports.ensureNumberDuration)({
        hours,
        minutes,
    }));
};
exports.decimalDurationToDuration = decimalDurationToDuration;
const decimalDurationToISODuration = (duraction) => {
    return (0, exports.durationToISODuration)((0, exports.decimalDurationToDuration)(duraction));
};
exports.decimalDurationToISODuration = decimalDurationToISODuration;
const durationToDecimalDuration = (duration) => {
    const { hours, minutes } = (0, exports.ensureNumberDuration)(duration);
    const decimalTime = hours + ((100 / 60) * minutes) / 100;
    return Math.round(decimalTime * 100) / 100;
};
exports.durationToDecimalDuration = durationToDecimalDuration;
const isValidDuration = (duration) => {
    if (!duration) {
        return false;
    }
    const hours = (0, exports.getPositiveNumberValue)(duration.hours);
    const minutes = (0, exports.getPositiveNumberValue)(duration.minutes);
    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return false;
    }
    if (hours === undefined && minutes === undefined) {
        return false;
    }
    const dur = (0, exports.ensureNumberDuration)({ hours, minutes });
    return dur.hours >= 0 && dur.minutes >= 0 && dur.minutes < 60;
};
exports.isValidDuration = isValidDuration;
const getDurationsDiff = (durations1, durations2) => {
    const resultMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && (0, exports.durationsAreEqual)(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};
exports.getDurationsDiff = getDurationsDiff;
const getValidDurations = (durationMap) => {
    const cleanMap = {};
    Object.keys(durationMap).forEach((key) => {
        const duration = durationMap[key];
        if ((0, exports.isValidDuration)(duration)) {
            cleanMap[key] = Object.assign({}, duration);
        }
    });
    return cleanMap;
};
exports.getValidDurations = getValidDurations;
const summarizeDateDurationMap = (durationMap) => {
    const durations = Object.keys(durationMap).map((key) => (0, exports.ensureNumberDuration)(durationMap[key]));
    return (0, exports.summarizeDurations)(durations);
};
exports.summarizeDateDurationMap = summarizeDateDurationMap;
const getDatesWithDurationLongerThanZero = (duration) => Object.keys(duration).filter((key) => {
    const d = duration[key];
    return (0, exports.isValidDuration)(d) && (0, exports.durationIsZero)((0, exports.ensureDuration)(d)) === false;
});
exports.getDatesWithDurationLongerThanZero = getDatesWithDurationLongerThanZero;
const getDurationsInDateRange = (dateDurationMap, dateRange) => {
    const returnMap = {};
    Object.keys(dateDurationMap).forEach((isoDate) => {
        const date = (0, _1.ISODateToDate)(isoDate);
        if (date && (0, _1.isDateInDateRange)(date, dateRange)) {
            returnMap[isoDate] = dateDurationMap[isoDate];
        }
        return false;
    });
    return returnMap;
};
exports.getDurationsInDateRange = getDurationsInDateRange;
const removeDatesFromDateDurationMap = (dateDurationMap, datesToRemove) => {
    const cleanedMap = {};
    Object.keys(dateDurationMap).forEach((key) => {
        const date = (0, _1.ISODateToDate)(key);
        if (date && (0, dateUtils_1.isDateInDates)(date, datesToRemove) === false) {
            cleanedMap[key] = dateDurationMap[key];
        }
    });
    return cleanedMap;
};
exports.removeDatesFromDateDurationMap = removeDatesFromDateDurationMap;
const getDateDurationDiff = (durations1, durations2) => {
    const resultMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && (0, exports.durationsAreEqual)(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};
exports.getDateDurationDiff = getDateDurationDiff;
const durationIsGreatherThanZero = (duration) => {
    if (!duration) {
        return false;
    }
    const dur = (0, exports.durationToDecimalDuration)(duration);
    return dur > 0;
};
exports.durationIsGreatherThanZero = durationIsGreatherThanZero;
const getNumberDurationOrUndefined = (duration) => {
    if (duration && (0, exports.durationIsGreatherThanZero)(duration)) {
        return (0, exports.durationAsNumberDuration)(duration);
    }
    return undefined;
};
exports.getNumberDurationOrUndefined = getNumberDurationOrUndefined;
const getDateRangeFromDateDurationMap = (dateDurationMap) => {
    const unsortedDates = Object.keys(dateDurationMap).map((key) => (0, _1.ISODateToDate)(key));
    const sortedDates = (0, dateUtils_1.sortDateArray)(unsortedDates);
    return {
        from: sortedDates[0],
        to: sortedDates[sortedDates.length - 1],
    };
};
exports.getDateRangeFromDateDurationMap = getDateRangeFromDateDurationMap;
exports.durationUtils = {
    decimalDurationToDuration: exports.decimalDurationToDuration,
    decimalDurationToNumberDuration: exports.decimalDurationToNumberDuration,
    decimalDurationToISODuration: exports.decimalDurationToISODuration,
    durationAsNumberDuration: exports.durationAsNumberDuration,
    durationIsZero: exports.durationIsZero,
    durationsAreEqual: exports.durationsAreEqual,
    durationToDecimalDuration: exports.durationToDecimalDuration,
    durationToISODuration: exports.durationToISODuration,
    durationIsGreatherThanZero: exports.durationIsGreatherThanZero,
    ensureDuration: exports.ensureDuration,
    ensureNumberDuration: exports.ensureNumberDuration,
    getDateDurationDiff: exports.getDateDurationDiff,
    getDateRangeFromDateDurationMap: exports.getDateRangeFromDateDurationMap,
    getDatesWithDurationLongerThanZero: exports.getDatesWithDurationLongerThanZero,
    getDurationsDiff: exports.getDurationsDiff,
    getDurationsInDateRange: exports.getDurationsInDateRange,
    getNumberDurationOrUndefined: exports.getNumberDurationOrUndefined,
    getPercentageOfISODuration: exports.getPercentageOfISODuration,
    getPercentageOfDuration: exports.getPercentageOfDuration,
    getPercentageOfDecimalDuration: exports.getPercentageOfDecimalDuration,
    getValidDurations: exports.getValidDurations,
    ISODurationToDuration: exports.ISODurationToMaybeDuration,
    ISODurationToNumberDuration: exports.ISODurationToNumberDuration,
    ISODurationToDecimalDuration: exports.ISODurationToDecimalDuration,
    isValidDuration: exports.isValidDuration,
    numberDurationAsDuration: exports.numberDurationAsDuration,
    summarizeDateDurationMap: exports.summarizeDateDurationMap,
    summarizeDurations: exports.summarizeDurations,
};
