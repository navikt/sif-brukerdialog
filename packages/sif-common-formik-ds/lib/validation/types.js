"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntlErrorObject = void 0;
const isIntlErrorObject = (error) => {
    return typeof error === 'object' && typeof error.key === 'string';
};
exports.isIntlErrorObject = isIntlErrorObject;
