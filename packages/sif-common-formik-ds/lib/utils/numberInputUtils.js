"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromNumberInputValue = void 0;
const getNumberFromNumberInputValue = (inputValue) => {
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
exports.getNumberFromNumberInputValue = getNumberFromNumberInputValue;
