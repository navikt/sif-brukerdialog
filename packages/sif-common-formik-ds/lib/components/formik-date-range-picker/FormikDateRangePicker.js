"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const datepickerUtils_1 = require("../formik-datepicker/datepickerUtils");
const FormikDatepicker_1 = __importDefault(require("../formik-datepicker/FormikDatepicker"));
const FormikInputGroup_1 = __importDefault(require("../formik-input-group/FormikInputGroup"));
require("./dateRangePicker.scss");
const dateRangePickerUtils_1 = require("./dateRangePickerUtils");
function FormikDateRangePicker({ legend, fromInputProps, toInputProps, description, minDate, maxDate, disableWeekend, disabledDateRanges, showYearSelector, fullScreenOnMobile, fullscreenOverlay, allowRangesToStartAndStopOnSameDate, useFastField, locale, }) {
    const { values } = (0, formik_1.useFormikContext)();
    const fromDate = (0, datepickerUtils_1.ISOStringToDate)(values[fromInputProps.name]);
    const toDate = (0, datepickerUtils_1.ISOStringToDate)(values[toInputProps.name]);
    const { fromDateLimitations, toDateLimitations } = (0, dateRangePickerUtils_1.getDateRangePickerLimitations)({
        fromDate,
        toDate,
        minDate,
        maxDate,
        dateRanges: disabledDateRanges,
        disableWeekend,
        allowRangesToStartAndStopOnSameDate,
    });
    const name = `${fromInputProps.name}_${toInputProps.name}`;
    return (react_1.default.createElement(FormikInputGroup_1.default, { name: name, legend: legend, description: description, className: "dateRangePicker" },
        react_1.default.createElement("div", { className: "dateRangePicker__flexContainer" },
            react_1.default.createElement(FormikDatepicker_1.default, Object.assign({}, fromInputProps, { fullscreenOverlay, fullScreenOnMobile, showYearSelector }, fromDateLimitations, { locale: locale, useFastField: useFastField })),
            react_1.default.createElement(FormikDatepicker_1.default, Object.assign({}, toInputProps, { fullscreenOverlay, fullScreenOnMobile, showYearSelector }, toDateLimitations, { locale: locale, useFastField: useFastField })))));
}
exports.default = FormikDateRangePicker;
