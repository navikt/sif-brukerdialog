"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTimeError = void 0;
const validationUtils_1 = require("./validationUtils");
var ValidateTimeError;
(function (ValidateTimeError) {
    ValidateTimeError["timeHasNoValue"] = "timeHasNoValue";
    ValidateTimeError["hoursAreInvalid"] = "hoursAreInvalid";
    ValidateTimeError["hoursAreNegative"] = "hoursAreNegative";
    ValidateTimeError["minutesAreInvalid"] = "minutesAreInvalid";
    ValidateTimeError["minutesAreNegative"] = "minutesAreNegative";
    ValidateTimeError["tooManyHours"] = "tooManyHours";
    ValidateTimeError["tooManyMinutes"] = "tooManyMinutes";
    ValidateTimeError["durationIsTooLong"] = "durationIsTooLong";
    ValidateTimeError["durationIsTooShort"] = "durationIsTooShort";
})(ValidateTimeError = exports.ValidateTimeError || (exports.ValidateTimeError = {}));
const getMinutes = (hours, minutes) => hours * 60 + minutes;
const valueIsValidNumber = (value) => {
    if (value) {
        const containsNumbers = value.match(/^[\-0-9]+$/) !== null;
        if (containsNumbers) {
            return (0, validationUtils_1.getNumberFromStringInput)(value) !== undefined;
        }
    }
    return false;
};
const getTimeValidator = (options = {}) => (value) => {
    const { required, max, min } = options;
    const { hours: inputHours, minutes: inputMinutes } = value || {};
    if ((0, validationUtils_1.hasValue)(inputHours) && valueIsValidNumber(inputHours) === false) {
        return ValidateTimeError.hoursAreInvalid;
    }
    if ((0, validationUtils_1.hasValue)(inputMinutes) && valueIsValidNumber(inputMinutes) === false) {
        return ValidateTimeError.minutesAreInvalid;
    }
    const hours = (0, validationUtils_1.getNumberFromStringInput)(inputHours);
    const minutes = (0, validationUtils_1.getNumberFromStringInput)(inputMinutes);
    if (hours === undefined && minutes === undefined && required) {
        return ValidateTimeError.timeHasNoValue;
    }
    if (hours !== undefined) {
        if (hours > 24) {
            return ValidateTimeError.tooManyHours;
        }
        if (hours < 0) {
            return ValidateTimeError.hoursAreNegative;
        }
    }
    if (minutes !== undefined) {
        if (minutes > 59) {
            return ValidateTimeError.tooManyMinutes;
        }
        if (minutes < 0) {
            return ValidateTimeError.minutesAreNegative;
        }
    }
    if (max) {
        if (getMinutes(hours || 0, minutes || 0) > getMinutes(max.hours, max.minutes)) {
            return ValidateTimeError.durationIsTooLong;
        }
    }
    if (min) {
        if (getMinutes(hours || 0, minutes || 0) < getMinutes(min.hours, min.minutes)) {
            return ValidateTimeError.durationIsTooShort;
        }
    }
    return undefined;
};
exports.default = getTimeValidator;
