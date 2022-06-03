"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanityConfigIsValid = exports.getMessage = exports.getLocaleBlockContent = exports.getOptionalLocaleString = exports.getOptionalLocaleValue = exports.getLocaleString = exports.getLocaleObject = void 0;
var types_1 = require("../types");
var hasLocaleValue = function (obj, locale) {
    if (locale === void 0) { locale = types_1.sanityDefaultLocale; }
    return obj !== undefined &&
        ((obj[locale] !== undefined && obj[locale] !== '') ||
            (obj[types_1.sanityDefaultLocale] !== undefined && obj[types_1.sanityDefaultLocale] !== ''));
};
var getLocaleObject = function (obj, locale) {
    if (locale === void 0) { locale = types_1.sanityDefaultLocale; }
    return obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[types_1.sanityDefaultLocale] : undefined;
};
exports.getLocaleObject = getLocaleObject;
var getLocaleString = function (obj, locale) {
    if (locale === void 0) { locale = types_1.sanityDefaultLocale; }
    return obj[locale] || obj[types_1.sanityDefaultLocale] || '';
};
exports.getLocaleString = getLocaleString;
var getOptionalLocaleValue = function (obj, locale) {
    return (0, types_1.isValidLocaleObject)(obj) ? (0, exports.getLocaleObject)(obj, locale) : undefined;
};
exports.getOptionalLocaleValue = getOptionalLocaleValue;
var getOptionalLocaleString = function (_a) {
    var obj = _a.obj, locale = _a.locale;
    return (0, types_1.isValidLocaleStringObject)(obj) ? (0, exports.getLocaleString)(obj, locale) : undefined;
};
exports.getOptionalLocaleString = getOptionalLocaleString;
var getLocaleBlockContent = function (obj, locale) {
    if (locale === void 0) { locale = types_1.sanityDefaultLocale; }
    return (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[types_1.sanityDefaultLocale] : []);
};
exports.getLocaleBlockContent = getLocaleBlockContent;
var getMessage = function (messages) {
    return messages && messages.length === 1 ? messages[0] : undefined;
};
exports.getMessage = getMessage;
var sanityConfigIsValid = function (config) {
    var sanityConfigPropIsValid = function (prop) { return prop !== undefined && typeof prop === 'string' && prop.length > 5; };
    try {
        return (config !== undefined &&
            sanityConfigPropIsValid(config['projectId']) &&
            sanityConfigPropIsValid(config['dataset']));
    }
    catch (_a) {
        return false;
    }
};
exports.sanityConfigIsValid = sanityConfigIsValid;
