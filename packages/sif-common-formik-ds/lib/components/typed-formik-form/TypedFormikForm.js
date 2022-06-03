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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedFormikFormContext = void 0;
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const FormikValidationErrorSummary_1 = __importDefault(require("../formik-validation-error-summary/FormikValidationErrorSummary"));
const ButtonRow_1 = __importDefault(require("../helpers/button-row/ButtonRow"));
const userHasSubmittedValidForm = (oldProps, currentProps) => oldProps.isSubmitting === true && currentProps.isSubmitting === false && currentProps.isValid === true;
exports.TypedFormikFormContext = (0, react_1.createContext)(undefined);
function TypedFormikForm({ children, resetFormOnCancel, className, includeValidationSummary, submitButtonLabel, cancelButtonLabel, id, includeButtons = true, runDelayedFormValidation, cancelButtonType, formErrorHandler, formFooter, errorSummaryTitle, onCancel, onValidSubmit, noButtonsContentRenderer, cleanup, }) {
    var _a, _b;
    const formik = (0, formik_1.useFormikContext)();
    const { handleSubmit, submitCount, setStatus, resetForm, isSubmitting, isValid } = formik;
    const [formSubmitCount, setFormSubmitCout] = (0, react_1.useState)(submitCount);
    const [cleanupState, setCleanupState] = (0, react_1.useState)({ hasCleanedUp: false, counter: 0 });
    const ref = (0, react_1.useRef)({ isSubmitting, isValid });
    const showErrors = ((_a = formik === null || formik === void 0 ? void 0 : formik.status) === null || _a === void 0 ? void 0 : _a.showErrors) === true || ((_b = formik === null || formik === void 0 ? void 0 : formik.initialStatus) === null || _b === void 0 ? void 0 : _b.showErrors) === true;
    (0, react_1.useEffect)(() => {
        ref.current = {
            isSubmitting,
            isValid,
        };
        if (!isSubmitting) {
            if (submitCount > formSubmitCount) {
                if (isValid) {
                    setFormSubmitCout(submitCount);
                }
                else {
                    setStatus({ showErrors: true });
                }
            }
            else {
                if (showErrors) {
                    setStatus({ showErrors: false });
                }
            }
        }
    }, [submitCount, showErrors, setStatus, formSubmitCount, isSubmitting, isValid]);
    (0, react_1.useEffect)(() => {
        cleanupState.hasCleanedUp && handleSubmit();
    }, [cleanupState, handleSubmit]);
    if (userHasSubmittedValidForm(ref.current, { isValid, isSubmitting })) {
        if (onValidSubmit) {
            onValidSubmit();
        }
    }
    const runCleanup = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        formik.setValues(cleanup ? cleanup(formik.values) : formik.values);
        setCleanupState({ hasCleanedUp: true, counter: cleanupState.counter + 1 });
    };
    const onSubmit = (evt) => {
        setCleanupState(Object.assign(Object.assign({}, cleanupState), { hasCleanedUp: false }));
        if (cleanup !== undefined) {
            runCleanup(evt);
        }
        else {
            handleSubmit(evt);
        }
    };
    const createTypedFormikFormContext = () => {
        const showErrors = (0, typedFormErrorUtils_1.isValidationErrorsVisible)(formik);
        return {
            showErrors,
            fieldErrorHandler: (error, fieldName) => {
                return formErrorHandler ? formErrorHandler.fieldErrorHandler(error, fieldName) : error;
            },
            isHandledErrorTypeChecker: formErrorHandler === null || formErrorHandler === void 0 ? void 0 : formErrorHandler.isHandledErrorTypeFunc,
            getAndRenderFieldErrorMessage: (field, form) => {
                if (showErrors) {
                    const error = (0, typedFormErrorUtils_1.getErrorForField)(field.name, form.errors);
                    if (error) {
                        return formErrorHandler ? formErrorHandler.fieldErrorHandler(error, field.name) : error;
                    }
                }
                return undefined;
            },
            onAfterFieldValueSet: () => {
                if (runDelayedFormValidation && formik.status && formik.status.showErrors) {
                    setTimeout(() => {
                        formik.validateForm();
                    });
                }
            },
        };
    };
    return (react_1.default.createElement("form", { onSubmit: onSubmit, noValidate: true, className: className, id: id, autoComplete: "off" },
        react_1.default.createElement(exports.TypedFormikFormContext.Provider, { value: createTypedFormikFormContext() },
            children,
            includeValidationSummary && !formik.isValid && (0, typedFormErrorUtils_1.isValidationErrorsVisible)(formik) && (react_1.default.createElement("div", { style: { marginTop: '2rem' } },
                react_1.default.createElement(FormikValidationErrorSummary_1.default, { heading: errorSummaryTitle }))),
            includeButtons && (react_1.default.createElement("div", { style: { marginTop: '2rem' } },
                react_1.default.createElement(ButtonRow_1.default, { layout: onCancel ? 'stretch' : 'normal' },
                    react_1.default.createElement(ds_react_1.Button, { variant: "primary", type: "submit" }, submitButtonLabel || 'Ok'),
                    onCancel && (react_1.default.createElement(ds_react_1.Button, { type: "button", variant: cancelButtonType || 'tertiary', onClick: () => {
                            if (resetFormOnCancel) {
                                resetForm();
                            }
                            onCancel();
                        } }, cancelButtonLabel || 'Avbryt'))))),
            includeButtons === false && noButtonsContentRenderer && (react_1.default.createElement("div", { style: { marginTop: '2rem' } }, noButtonsContentRenderer())),
            formFooter && react_1.default.createElement("div", { style: { marginTop: '2rem' } }, formFooter))));
}
exports.default = TypedFormikForm;
