"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequiredFieldError = void 0;
const validationUtils_1 = require("./validationUtils");
var ValidateRequiredFieldError;
(function (ValidateRequiredFieldError) {
    ValidateRequiredFieldError["noValue"] = "noValue";
})(ValidateRequiredFieldError = exports.ValidateRequiredFieldError || (exports.ValidateRequiredFieldError = {}));
const getRequiredFieldValidator = () => (value) => {
    if ((0, validationUtils_1.hasValue)(value) === false) {
        return ValidateRequiredFieldError.noValue;
    }
    return undefined;
};
exports.default = getRequiredFieldValidator;
