"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormikDatepicker_1 = __importDefault(require("../formik-datepicker/FormikDatepicker"));
const FormikInputGroup_1 = __importDefault(require("../formik-input-group/FormikInputGroup"));
require("./dateIntervalPicker.scss");
function FormikDateIntervalPicker({ legend, fromDatepickerProps, toDatepickerProps, description, useFastField, error, validate, }) {
    const name = `${fromDatepickerProps.name}_${toDatepickerProps.name}`;
    return (react_1.default.createElement(FormikInputGroup_1.default, { name: name, validate: validate ? (value) => validate(value, name) : undefined, error: error, legend: legend, description: description, className: "dateIntervalPicker" },
        react_1.default.createElement("div", { className: "dateIntervalPicker__flexContainer" },
            react_1.default.createElement(FormikDatepicker_1.default, Object.assign({}, fromDatepickerProps, { useFastField: useFastField })),
            react_1.default.createElement(FormikDatepicker_1.default, Object.assign({}, toDatepickerProps, { useFastField: useFastField })))));
}
exports.default = FormikDateIntervalPicker;
