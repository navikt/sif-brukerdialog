"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntlFormErrorHandler_underscoreKeys = void 0;
const types_1 = require("./types");
const createFieldErrorIntlKey = (error, fieldName, keySeparator, errorPrefix) => `${errorPrefix ? `${errorPrefix}${keySeparator}` : ''}${fieldName}${keySeparator}${error}`;
const getFieldErrorHandler = (intl, keySeparator, errorPrefix) => (error, fieldName) => {
    return (0, types_1.isIntlErrorObject)(error)
        ? intl.formatMessage({
            id: error.keepKeyUnaltered
                ? error.key
                : createFieldErrorIntlKey(error.key, fieldName, keySeparator, errorPrefix),
        }, error.values)
        : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, keySeparator, errorPrefix) });
};
const getIntlFormErrorHandler = (intl, errorPrefix) => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '.', errorPrefix),
    isHandledErrorTypeFunc: types_1.isIntlErrorObject,
});
const getIntlFormErrorHandler_underscoreKeys = (intl, errorPrefix) => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '_', errorPrefix),
    isHandledErrorTypeFunc: types_1.isIntlErrorObject,
});
exports.getIntlFormErrorHandler_underscoreKeys = getIntlFormErrorHandler_underscoreKeys;
exports.default = getIntlFormErrorHandler;
