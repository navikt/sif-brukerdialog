"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFieldsWithErrors = exports.isValidationErrorsVisible = exports.getErrorForField = exports.getErrorPropForFormikInput = void 0;
const formik_1 = require("formik");
const getErrorPropForFormikInput = ({ error, field, form, context, }) => {
    return error || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined);
};
exports.getErrorPropForFormikInput = getErrorPropForFormikInput;
const getErrorForField = (elementName, errors) => {
    const fieldErrors = (0, formik_1.getIn)(errors, elementName);
    if (fieldErrors === null) {
        return undefined;
    }
    if (Array.isArray(fieldErrors)) {
        if (fieldErrors.length === 1 && fieldErrors[0] === null) {
            return undefined;
        }
        if (fieldErrors.length >= 1) {
            return fieldErrors[0];
        }
    }
    else {
        return fieldErrors;
    }
};
exports.getErrorForField = getErrorForField;
const isValidationErrorsVisible = (formik) => {
    var _a;
    return ((_a = formik === null || formik === void 0 ? void 0 : formik.status) === null || _a === void 0 ? void 0 : _a.showErrors) === true;
};
exports.isValidationErrorsVisible = isValidationErrorsVisible;
const getAllFieldsWithErrors = (allErrors, errorObjectChecker) => {
    const getFieldsWithErrors = (errors, keys = [], parentKey) => {
        const createFieldKey = (fieldName) => {
            return parentKey ? `${parentKey}.${fieldName}` : fieldName;
        };
        if (errors) {
            if ((parentKey && (0, formik_1.isObject)(errors) && errorObjectChecker && errorObjectChecker(errors)) ||
                (parentKey && typeof errors === 'string')) {
                keys.push(parentKey);
                return keys;
            }
            Object.keys(errors).forEach((key) => {
                const error = errors[key];
                if (Array.isArray(error)) {
                    error.forEach((err, idx) => {
                        getFieldsWithErrors(err, keys, createFieldKey(`${key}.${idx}`));
                    });
                }
                else {
                    if ((0, formik_1.isObject)(error)) {
                        if (errorObjectChecker && errorObjectChecker(error)) {
                            keys.push(createFieldKey(key));
                            return;
                        }
                        return getFieldsWithErrors(error, keys, createFieldKey(`${key}`));
                    }
                    keys.push(createFieldKey(key));
                }
                return undefined;
            });
        }
        return keys;
    };
    return getFieldsWithErrors(allErrors, []);
};
exports.getAllFieldsWithErrors = getAllFieldsWithErrors;
