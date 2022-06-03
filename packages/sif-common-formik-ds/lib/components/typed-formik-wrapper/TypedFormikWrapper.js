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
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
function TypedFormikWrapper(props) {
    const { onSubmit, initialValues, renderForm: renderFormContent } = props, restProps = __rest(props, ["onSubmit", "initialValues", "renderForm"]);
    return (react_1.default.createElement(formik_1.Formik, Object.assign({ initialValues: initialValues, onSubmit: (values, { setSubmitting, setTouched }) => {
            setSubmitting(false);
            setTouched({});
            setTimeout(() => {
                onSubmit(values);
            });
        } }, restProps), (formik) => renderFormContent(formik)));
}
exports.default = TypedFormikWrapper;
