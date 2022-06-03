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
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const CountrySelect_1 = __importDefault(require("./CountrySelect"));
function FormikCountrySelect(_a) {
    var { name, error, validate, useAlpha3Code = true, showOnlyEuAndEftaCountries } = _a, restProps = __rest(_a, ["name", "error", "validate", "useAlpha3Code", "showOnlyEuAndEftaCountries"]);
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const testKey = restProps['data-testid'];
    return (react_1.default.createElement(formik_1.Field, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        return (react_1.default.createElement(CountrySelect_1.default, Object.assign({}, restProps, field, { "data-testid": testKey, error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), onChange: (value) => {
                form.setFieldValue(field.name, value);
                if (context) {
                    context.onAfterFieldValueSet();
                }
            }, showOnlyEuAndEftaCountries: showOnlyEuAndEftaCountries, useAlpha3Code: useAlpha3Code })));
    }));
}
exports.default = FormikCountrySelect;
