"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
function FormikRadioGroup(_a) {
    var { name, validate, radios, error, useFastField } = _a, restProps = __rest(_a, ["name", "validate", "radios", "error", "useFastField"]);
    const context = (0, react_1.useContext)(TypedFormikForm_1.TypedFormikFormContext);
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        return (react_1.default.createElement(ds_react_1.RadioGroup, Object.assign({}, restProps, { name: field.name, error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), value: field.value }), radios.map((rb, idx) => {
            console.log(field.name);
            return (react_1.default.createElement(ds_react_1.Radio, Object.assign({ key: idx }, rb, { name: field.name, onChange: (evt) => {
                    form.setFieldValue(field.name, evt.target.value);
                    if (context) {
                        context.onAfterFieldValueSet();
                    }
                } }), rb.label));
        })));
    }));
}
exports.default = FormikRadioGroup;
