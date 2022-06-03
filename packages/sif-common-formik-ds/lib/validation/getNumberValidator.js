"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateNumberError = void 0;
const validationUtils_1 = require("./validationUtils");
var ValidateNumberError;
(function (ValidateNumberError) {
    ValidateNumberError["numberHasNoValue"] = "numberHasNoValue";
    ValidateNumberError["numberHasInvalidFormat"] = "numberHasInvalidFormat";
    ValidateNumberError["numberIsTooSmall"] = "numberIsTooSmall";
    ValidateNumberError["numberIsTooLarge"] = "numberIsTooLarge";
    ValidateNumberError["numberHasDecimals"] = "numberHasDecimals";
})(ValidateNumberError = exports.ValidateNumberError || (exports.ValidateNumberError = {}));
const getNumberValidator = (options = {}) => (value) => {
    const { required, min, max, allowDecimals = true } = options;
    const numberValue = (0, validationUtils_1.getNumberFromStringInput)(value);
    if (required) {
        if ((0, validationUtils_1.hasValue)(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
            return ValidateNumberError.numberHasNoValue;
        }
    }
    if ((0, validationUtils_1.hasValue)(value)) {
        if (numberValue === undefined) {
            return ValidateNumberError.numberHasInvalidFormat;
        }
        if (allowDecimals === false && Math.round(numberValue) !== numberValue) {
            return ValidateNumberError.numberHasDecimals;
        }
        if (min !== undefined && numberValue < min) {
            return ValidateNumberError.numberIsTooSmall;
        }
        if (max !== undefined && numberValue > max) {
            return ValidateNumberError.numberIsTooLarge;
        }
    }
    return undefined;
};
exports.default = getNumberValidator;
