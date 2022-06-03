"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISOStringToDate = exports.dateToISOString = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const ds_datepicker_1 = require("@navikt/ds-datepicker");
const isoStringFormat = 'YYYY-MM-DD';
const dateToISOString = (date) => (date ? (0, dayjs_1.default)(date).format(isoStringFormat) : '');
exports.dateToISOString = dateToISOString;
const ISOStringToDate = (dateString = '') => getDateFromDateString(dateString);
exports.ISOStringToDate = ISOStringToDate;
const parseDateLimitations = ({ minDate, maxDate, disabledDateRanges = [], disableWeekend, disabledDaysOfWeek, }) => {
    const invalidDateRanges = disabledDateRanges.map((d) => ({
        from: (0, exports.dateToISOString)(d.from),
        to: (0, exports.dateToISOString)(d.to),
    }));
    return {
        minDate: minDate ? (0, exports.dateToISOString)(minDate) : undefined,
        maxDate: maxDate ? (0, exports.dateToISOString)(maxDate) : undefined,
        weekendsNotSelectable: disableWeekend,
        invalidDateRanges,
        disabledDaysOfWeek: disabledDaysOfWeek ? { daysOfWeek: disabledDaysOfWeek } : undefined,
    };
};
const getDateStringFromValue = (value) => {
    let date;
    if (value && typeof value === 'string') {
        if ((0, ds_datepicker_1.isISODateString)(value) === false) {
            return value;
        }
        if ((0, dayjs_1.default)(value, isoStringFormat, true).isValid()) {
            date = new Date(value);
        }
    }
    else if (typeof value === 'object') {
        date = value;
    }
    return date ? (0, exports.dateToISOString)(date) : undefined;
};
const getDateFromDateString = (dateString) => {
    if (dateString === undefined) {
        return undefined;
    }
    if ((0, ds_datepicker_1.isISODateString)(dateString) && (0, dayjs_1.default)(dateString, 'YYYY-MM-DD', true).isValid()) {
        return new Date(dateString);
    }
    return undefined;
};
const isValidFormattedDateString = (dateString = '') => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};
const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
    isValidFormattedDateString,
};
exports.default = datepickerUtils;
