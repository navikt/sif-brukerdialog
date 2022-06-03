"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatter = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
require('dayjs/locale/nb');
dayjs_1.default.locale('nb');
const compactFormat = 'DD.MM.YYYY';
exports.dateFormatter = {
    compact: (date) => (0, dayjs_1.default)(date).format(compactFormat),
    dateShortMonthYear: (date) => (0, dayjs_1.default)(date).format('D. MMM YYYY'),
    full: (date) => (0, dayjs_1.default)(date).format('D. MMMM YYYY'),
    day: (date) => `${(0, dayjs_1.default)(date).format('dddd')}`,
    dayCompactDate: (date) => `${exports.dateFormatter.day(date)} ${exports.dateFormatter.compact(date)}`,
    dayDateShortMonthYear: (date) => `${exports.dateFormatter.day(date)} ${exports.dateFormatter.dateShortMonthYear(date)}`,
    dayDateMonthYear: (date) => `${exports.dateFormatter.day(date)} ${exports.dateFormatter.full(date)}`,
    dayDateMonth: (date) => (0, dayjs_1.default)(date).format('dddd D. MMMM'),
    dayDateShortMonth: (date) => (0, dayjs_1.default)(date).format('dddd D. MMM'),
};
