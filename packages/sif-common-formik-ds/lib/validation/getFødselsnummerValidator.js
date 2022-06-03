"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFødselsnummerError = void 0;
const fnrvalidator_1 = __importDefault(require("@navikt/fnrvalidator"));
const validationUtils_1 = require("./validationUtils");
var ValidateFødselsnummerError;
(function (ValidateFødselsnummerError) {
    ValidateFødselsnummerError["f\u00F8dselsnummerHasNoValue"] = "f\u00F8dselsnummerHasNoValue";
    ValidateFødselsnummerError["f\u00F8dselsnummerIsNot11Chars"] = "f\u00F8dselsnummerIsNot11Chars";
    ValidateFødselsnummerError["f\u00F8dselsnummerIsInvalid"] = "f\u00F8dselsnummerIsInvalid";
    ValidateFødselsnummerError["f\u00F8dselsnummerAsHnrIsNotAllowed"] = "f\u00F8dselsnummerAsHnrIsNotAllowed";
    ValidateFødselsnummerError["f\u00F8dselsnummerIsNotAllowed"] = "f\u00F8dselsnummerIsNotAllowed";
})(ValidateFødselsnummerError = exports.ValidateFødselsnummerError || (exports.ValidateFødselsnummerError = {}));
const getFødselsnummerValidator = (options = {}) => (value) => {
    const { required, disallowedValues, allowHnr } = options;
    if ((0, validationUtils_1.hasValue)(value) === false && required === false) {
        return undefined;
    }
    if (required && (0, validationUtils_1.hasValue)(value) === false) {
        return ValidateFødselsnummerError.fødselsnummerHasNoValue;
    }
    if ((0, validationUtils_1.hasValue)(value)) {
        const result = fnrvalidator_1.default.fnr(value);
        if (result.status === 'valid' && result.type === 'hnr' && allowHnr !== true) {
            return ValidateFødselsnummerError.fødselsnummerAsHnrIsNotAllowed;
        }
        if (result.status === 'invalid') {
            const LENGTH_ERROR = 'fnr, dnr or hnr must consist of 11 digits';
            const { reasons } = result;
            if (reasons.includes(LENGTH_ERROR)) {
                return ValidateFødselsnummerError.fødselsnummerIsNot11Chars;
            }
            return ValidateFødselsnummerError.fødselsnummerIsInvalid;
        }
        if (disallowedValues) {
            const equalsDisallowedValue = disallowedValues.some((f) => f === value);
            if (equalsDisallowedValue) {
                return ValidateFødselsnummerError.fødselsnummerIsNotAllowed;
            }
        }
    }
    return undefined;
};
exports.default = getFødselsnummerValidator;
