"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCheckedError = void 0;
var ValidateCheckedError;
(function (ValidateCheckedError) {
    ValidateCheckedError["notChecked"] = "notChecked";
})(ValidateCheckedError = exports.ValidateCheckedError || (exports.ValidateCheckedError = {}));
const getCheckedValidator = () => (value) => {
    if (value === undefined || value === false || (Array.isArray(value) && value.length === 0)) {
        return ValidateCheckedError.notChecked;
    }
    return undefined;
};
exports.default = getCheckedValidator;
