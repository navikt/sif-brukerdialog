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
function FormikConfirmationCheckbox(_a) {
    var { children, name, error, validate } = _a, restProps = __rest(_a, ["children", "name", "error", "validate"]);
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    return (react_1.default.createElement(formik_1.Field, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        return (react_1.default.createElement(ds_react_1.ConfirmationPanel, Object.assign({}, restProps, field, { checked: field.value === true, error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), onChange: (evt) => {
                form.setFieldValue(`${name}`, evt.target.checked);
                if (context) {
                    context.onAfterFieldValueSet();
                }
            } }), children));
    }));
}
exports.default = FormikConfirmationCheckbox;
