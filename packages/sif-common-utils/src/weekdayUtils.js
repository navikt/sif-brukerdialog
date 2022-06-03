"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateInWeekdays = exports.getWeekdayFromDate = exports.getWeekdayDOW = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const types_1 = require("./types");
dayjs_1.default.extend(isoWeek_1.default);
const getWeekdayDOW = (weekday) => {
    switch (weekday) {
        case types_1.Weekday.monday:
            return 1;
        case types_1.Weekday.tuesday:
            return 2;
        case types_1.Weekday.wednesday:
            return 3;
        case types_1.Weekday.thursday:
            return 4;
        case types_1.Weekday.friday:
            return 5;
    }
};
exports.getWeekdayDOW = getWeekdayDOW;
const getWeekdayFromDate = (date) => {
    const dow = (0, dayjs_1.default)(date).isoWeekday();
    switch (dow) {
        case 1:
            return types_1.Weekday.monday;
        case 2:
            return types_1.Weekday.tuesday;
        case 3:
            return types_1.Weekday.wednesday;
        case 4:
            return types_1.Weekday.thursday;
        case 5:
            return types_1.Weekday.friday;
        default:
            return undefined;
    }
};
exports.getWeekdayFromDate = getWeekdayFromDate;
const isDateInWeekdays = (date, weekdays) => {
    if (!weekdays || weekdays.length === 0) {
        return false;
    }
    return weekdays.some((weekday) => weekday === (0, exports.getWeekdayFromDate)(date));
};
exports.isDateInWeekdays = isDateInWeekdays;
