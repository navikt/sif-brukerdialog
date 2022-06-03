"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const ModalFormAndList_1 = __importDefault(require("./modal-form-and-list/ModalFormAndList"));
require("./formikModalForm.scss");
function FormikModalFormAndList({ name, labels, listRenderer, formRenderer, sortFunc, onAfterChange, dialogWidth, shouldCloseOnOverlayClick, error, maxItems, useFastField, validate, }) {
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { name: name, validate: validate ? (value) => validate(value, name) : undefined }, ({ field, form }) => {
        return (react_1.default.createElement(ModalFormAndList_1.default, { labels: labels, items: field.value, error: error || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined), maxItems: maxItems, dialogWidth: dialogWidth, shouldCloseOnOverlayClick: shouldCloseOnOverlayClick, onChange: (values) => {
                const updatedValues = sortFunc ? values.sort(sortFunc) : values;
                form.setFieldValue(field.name, updatedValues);
                if (onAfterChange) {
                    onAfterChange(updatedValues);
                }
                if (context) {
                    context.onAfterFieldValueSet();
                }
            }, formRenderer: formRenderer, listRenderer: ({ onEdit, onDelete }) => listRenderer({ items: field.value, onDelete, onEdit }) }));
    }));
}
exports.default = FormikModalFormAndList;
