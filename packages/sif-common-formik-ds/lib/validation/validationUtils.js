"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromStringInput = exports.validateAll = exports.hasValue = void 0;
const hasValue = (value) => value !== '' && value !== undefined && value !== null;
exports.hasValue = hasValue;
const validateAll = (validations) => {
    let result;
    validations.some((validateFunc) => {
        const validationResult = validateFunc();
        if (validationResult) {
            result = validationResult;
            return true;
        }
        return false;
    });
    return result;
};
exports.validateAll = validateAll;
const getNumberFromStringInput = (inputValue) => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/\,/g, '.').trim();
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
exports.getNumberFromStringInput = getNumberFromStringInput;
