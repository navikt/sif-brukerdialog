"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const FileInput_1 = __importDefault(require("./file-input/FileInput"));
function FormikFileInput({ name, legend, description, buttonLabel, accept, multiple = true, validate, onFilesSelect, error, onClick, }) {
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    return (react_1.default.createElement(formik_1.FieldArray, { name: `${name}`, render: (arrayHelpers) => (react_1.default.createElement(formik_1.Field, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
            return (react_1.default.createElement(FileInput_1.default, { id: field.name, name: field.name, legend: legend, description: description, buttonLabel: buttonLabel, onClick: onClick, onFilesSelect: (files) => onFilesSelect(files, arrayHelpers), multiple: multiple, accept: accept, error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }) }));
        })) }));
}
exports.default = FormikFileInput;
