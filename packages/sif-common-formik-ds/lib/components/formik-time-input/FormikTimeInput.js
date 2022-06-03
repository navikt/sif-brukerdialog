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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const TimeInput_1 = __importDefault(require("./TimeInput"));
const focusUtils_1 = require("../../utils/focusUtils");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const SkjemagruppeQuestion_1 = __importDefault(require("../helpers/skjemagruppe-question/SkjemagruppeQuestion"));
const bem = (0, bemUtils_1.default)('formikTimeInput');
function FormikTimeInput(_a) {
    var { label, name, validate, error, timeInputLayout, useFastField, description } = _a, restProps = __rest(_a, ["label", "name", "validate", "error", "timeInputLayout", "useFastField", "description"]);
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const ref = (0, react_1.useRef)();
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        return (react_1.default.createElement(SkjemagruppeQuestion_1.default, { className: bem.classNames(bem.block, bem.modifierConditional(timeInputLayout === null || timeInputLayout === void 0 ? void 0 : timeInputLayout.direction, (timeInputLayout === null || timeInputLayout === void 0 ? void 0 : timeInputLayout.direction) !== undefined)), ref: ref, error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), id: name, onFocus: (evt) => {
                if (evt.target.id === ref.current.props.id) {
                    (0, focusUtils_1.focusFirstElement)(evt.target);
                }
            }, legend: label, description: description },
            react_1.default.createElement(TimeInput_1.default, Object.assign({}, restProps, field, timeInputLayout, { justifyContent: "left", time: field.value || undefined, onChange: (time) => {
                    form.setFieldValue(field.name, time);
                    if (context) {
                        context.onAfterFieldValueSet();
                    }
                } }))));
    }));
}
exports.default = FormikTimeInput;
