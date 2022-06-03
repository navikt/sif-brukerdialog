"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateListError = void 0;
var ValidateListError;
(function (ValidateListError) {
    ValidateListError["listIsEmpty"] = "listIsEmpty";
    ValidateListError["listHasTooFewItems"] = "listHasTooFewItems";
    ValidateListError["listHasTooManyItems"] = "listHastooManyItems";
})(ValidateListError = exports.ValidateListError || (exports.ValidateListError = {}));
const getListValidator = (options) => (value) => {
    const { required = false, minItems = undefined, maxItems = undefined } = options;
    if (Array.isArray(value)) {
        const numItems = value.length;
        if (required && numItems === 0) {
            return ValidateListError.listIsEmpty;
        }
        if (minItems !== undefined && minItems > numItems) {
            return ValidateListError.listHasTooFewItems;
        }
        if (maxItems !== undefined && maxItems < numItems) {
            return ValidateListError.listHasTooManyItems;
        }
    }
    if (required && !Array.isArray(value)) {
        return ValidateListError.listIsEmpty;
    }
    return undefined;
};
exports.default = getListValidator;
