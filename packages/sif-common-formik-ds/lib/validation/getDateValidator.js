"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateDateError = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const datepickerUtils_1 = __importDefault(require("../components/formik-datepicker/datepickerUtils"));
const validationUtils_1 = require("./validationUtils");
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isoWeek_1.default);
var ValidateDateError;
(function (ValidateDateError) {
    ValidateDateError["dateHasNoValue"] = "dateHasNoValue";
    ValidateDateError["dateHasInvalidFormat"] = "dateHasInvalidFormat";
    ValidateDateError["dateIsBeforeMin"] = "dateIsBeforeMin";
    ValidateDateError["dateIsAfterMax"] = "dateIsAfterMax";
    ValidateDateError["dateIsNotWeekday"] = "dateIsNotWeekday";
})(ValidateDateError = exports.ValidateDateError || (exports.ValidateDateError = {}));
const getDateValidator = (options = {}) => (value) => {
    const { required, min, max, onlyWeekdays } = options;
    const date = datepickerUtils_1.default.getDateFromDateString(value);
    if (required && (0, validationUtils_1.hasValue)(value) === false) {
        return ValidateDateError.dateHasNoValue;
    }
    if ((0, validationUtils_1.hasValue)(value)) {
        if (date === undefined) {
            return ValidateDateError.dateHasInvalidFormat;
        }
        if (min && (0, dayjs_1.default)(date).isBefore(min, 'day')) {
            return ValidateDateError.dateIsBeforeMin;
        }
        if (max && (0, dayjs_1.default)(date).isAfter(max, 'day')) {
            return ValidateDateError.dateIsAfterMax;
        }
        if (onlyWeekdays && (0, dayjs_1.default)(date).isoWeekday() > 5) {
            return ValidateDateError.dateIsNotWeekday;
        }
    }
    return undefined;
};
exports.default = getDateValidator;
