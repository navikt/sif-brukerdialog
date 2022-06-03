"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const ValidationSummary_1 = __importDefault(require("../helpers/ValidationSummary"));
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const FormikValidationErrorSummary = ({ heading, wrapper }) => {
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const formik = (0, formik_1.useFormikContext)();
    if (formik && context && context.showErrors) {
        const fieldsWithErrors = !formik.isValid && (0, typedFormErrorUtils_1.getAllFieldsWithErrors)(formik.errors, context.isHandledErrorTypeChecker);
        const errors = fieldsWithErrors
            ? fieldsWithErrors.map((fieldName) => {
                const fieldError = (0, typedFormErrorUtils_1.getErrorForField)(fieldName, formik.errors);
                const error = {
                    errorMessage: context.fieldErrorHandler
                        ? context.fieldErrorHandler(fieldError, fieldName)
                        : fieldError,
                    fieldName,
                };
                return error;
            })
            : undefined;
        if (errors) {
            if (wrapper) {
                return wrapper(react_1.default.createElement(ValidationSummary_1.default, { errors: errors }));
            }
            return react_1.default.createElement(ValidationSummary_1.default, { heading: heading || 'Feil i skjema', errors: errors });
        }
    }
    return null;
};
exports.default = FormikValidationErrorSummary;
