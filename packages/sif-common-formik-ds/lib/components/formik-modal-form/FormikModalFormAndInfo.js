"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const ModalFormAndInfo_1 = __importDefault(require("./modal-form-and-info/ModalFormAndInfo"));
function FormikModalFormAndInfo({ name, labels, defaultValue, infoRenderer, formRenderer, onAfterChange, shouldCloseOnOverlayClick, renderEditButtons, renderDeleteButton, dialogWidth, dialogClassName, wrapInfoInPanel, wrapInfoInFieldset, error, validate, useFastField, }) {
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { name: name, validate: validate ? (value) => validate(value, name) : undefined }, ({ field, form }) => {
        return (react_1.default.createElement(ModalFormAndInfo_1.default, { labels: labels, data: field.value || defaultValue, dialogClassName: dialogClassName, dialogWidth: dialogWidth, renderEditButtons: renderEditButtons, renderDeleteButton: renderDeleteButton, wrapInfoInPanel: wrapInfoInPanel, wrapInfoInFieldset: wrapInfoInFieldset, shouldCloseOnOverlayClick: shouldCloseOnOverlayClick, error: error || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined), onDelete: () => form.setFieldValue(field.name, undefined), onChange: (value) => {
                form.setFieldValue(field.name, value, false);
                if (onAfterChange) {
                    onAfterChange(value);
                }
                if (context) {
                    context.onAfterFieldValueSet();
                }
            }, formRenderer: formRenderer, infoRenderer: ({ onEdit, onDelete }) => infoRenderer({ data: field.value, onDelete, onEdit }) }));
    }));
}
exports.default = FormikModalFormAndInfo;
