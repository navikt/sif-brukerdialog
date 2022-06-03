"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateStringError = void 0;
const validationUtils_1 = require("./validationUtils");
var ValidateStringError;
(function (ValidateStringError) {
    ValidateStringError["stringHasNoValue"] = "stringHasNoValue";
    ValidateStringError["stringIsNotAString"] = "stringIsNotAString";
    ValidateStringError["stringIsTooShort"] = "stringIsTooShort";
    ValidateStringError["stringIsTooLong"] = "stringIsTooLong";
    ValidateStringError["stringHasInvalidFormat"] = "stringHasInvalidFormat";
})(ValidateStringError = exports.ValidateStringError || (exports.ValidateStringError = {}));
const getStringValidator = (options = {}) => (value) => {
    const { required, minLength, maxLength, formatRegExp } = options;
    if (required) {
        if ((0, validationUtils_1.hasValue)(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
            return ValidateStringError.stringHasNoValue;
        }
    }
    if ((0, validationUtils_1.hasValue)(value)) {
        if (typeof value !== 'string') {
            return ValidateStringError.stringIsNotAString;
        }
        if (minLength !== undefined && value.trim().length < minLength) {
            return ValidateStringError.stringIsTooShort;
        }
        if (maxLength !== undefined && value.length > maxLength) {
            return ValidateStringError.stringIsTooLong;
        }
        if (formatRegExp !== undefined) {
            if (formatRegExp.test(value) === false) {
                return ValidateStringError.stringHasInvalidFormat;
            }
        }
    }
    return undefined;
};
exports.default = getStringValidator;
