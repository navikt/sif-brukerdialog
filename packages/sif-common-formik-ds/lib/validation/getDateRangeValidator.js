"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateDateRangeError = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const datepickerUtils_1 = __importDefault(require("../components/formik-datepicker/datepickerUtils"));
const getDateValidator_1 = __importDefault(require("./getDateValidator"));
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
var ValidateDateRangeError;
(function (ValidateDateRangeError) {
    ValidateDateRangeError["toDateIsBeforeFromDate"] = "toDateIsBeforeFromDate";
    ValidateDateRangeError["fromDateIsAfterToDate"] = "fromDateIsAfterToDate";
})(ValidateDateRangeError = exports.ValidateDateRangeError || (exports.ValidateDateRangeError = {}));
const getFromDateValidator = (options) => (value) => {
    const dateError = (0, getDateValidator_1.default)(options)(value);
    if (dateError) {
        return dateError;
    }
    const { toDate } = options;
    const date = datepickerUtils_1.default.getDateFromDateString(value);
    if (!date || !toDate) {
        return undefined;
    }
    if ((0, dayjs_1.default)(date).isAfter(toDate, 'day')) {
        return ValidateDateRangeError.fromDateIsAfterToDate;
    }
    return undefined;
};
const getToDateValidator = (options) => (value) => {
    const dateError = (0, getDateValidator_1.default)(options)(value);
    if (dateError) {
        return dateError;
    }
    const { fromDate } = options;
    const date = datepickerUtils_1.default.getDateFromDateString(value);
    if (!date || !fromDate) {
        return undefined;
    }
    if ((0, dayjs_1.default)(date).isBefore(fromDate, 'day')) {
        return ValidateDateRangeError.toDateIsBeforeFromDate;
    }
    return undefined;
};
const getDateRangeValidator = (options) => ({
    validateFromDate: getFromDateValidator(options),
    validateToDate: getToDateValidator(options),
});
exports.default = getDateRangeValidator;
