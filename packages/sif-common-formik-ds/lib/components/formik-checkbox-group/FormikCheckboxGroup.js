"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const getFieldValueArray = (value) => {
    if (value === undefined) {
        return [];
    }
    if (typeof value === 'string') {
        return [value];
    }
    return value;
};
function FormikCheckboxGroup(_a) {
    var { name, validate, afterOnChange, legend, error, checkboxes, useFastField } = _a, restProps = __rest(_a, ["name", "validate", "afterOnChange", "legend", "error", "checkboxes", "useFastField"]);
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        return (react_1.default.createElement(ds_react_1.CheckboxGroup, Object.assign({}, restProps, { value: getFieldValueArray(field.value), legend: legend, className: "focusableFieldset", error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), onChange: (value) => {
                form.setFieldValue(field.name, value);
                if (afterOnChange) {
                    afterOnChange(value);
                }
            } }), checkboxes.map((_a, index) => {
            var { value, label } = _a, cbRestProps = __rest(_a, ["value", "label"]);
            return (react_1.default.createElement(ds_react_1.Checkbox, Object.assign({ key: `${name}_${value || index}` }, cbRestProps, { name: name, value: value }), label));
        })));
    }));
}
exports.default = FormikCheckboxGroup;
