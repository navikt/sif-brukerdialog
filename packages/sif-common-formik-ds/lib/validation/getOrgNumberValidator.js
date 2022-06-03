"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOrgNumberError = void 0;
const validationUtils_1 = require("./validationUtils");
var ValidateOrgNumberError;
(function (ValidateOrgNumberError) {
    ValidateOrgNumberError["orgNumberHasNoValue"] = "orgNumberHasNoValue";
    ValidateOrgNumberError["orgNumberHasInvalidFormat"] = "orgNumberHasInvalidFormat";
})(ValidateOrgNumberError = exports.ValidateOrgNumberError || (exports.ValidateOrgNumberError = {}));
const getMod11 = (strValue) => {
    let checkNbr = 2;
    let mod = 0;
    for (let i = strValue.length - 2; i >= 0; --i) {
        mod += parseInt(strValue.charAt(i), 10) * checkNbr;
        if (++checkNbr > 7) {
            checkNbr = 2;
        }
    }
    const result = 11 - (mod % 11);
    return result === 11 ? 0 : result;
};
const isValidOrgNumber = (value) => {
    if (value &&
        typeof value === 'string' &&
        value.length === 9 &&
        /^[0-9]*$/.test(value) &&
        (value.charAt(0) === '8' || value.charAt(0) === '9')) {
        return getMod11(value) === parseInt(value.charAt(8), 10);
    }
    return false;
};
const getOrgNumberValidator = (options = {}) => (value) => {
    const { required } = options;
    if (required && (0, validationUtils_1.hasValue)(value) === false) {
        return ValidateOrgNumberError.orgNumberHasNoValue;
    }
    const isValidFormat = isValidOrgNumber(value);
    if ((0, validationUtils_1.hasValue)(value) && isValidFormat === false) {
        return ValidateOrgNumberError.orgNumberHasInvalidFormat;
    }
    return undefined;
};
exports.default = getOrgNumberValidator;
