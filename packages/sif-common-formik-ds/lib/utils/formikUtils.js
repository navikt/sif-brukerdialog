"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetFieldValues = exports.resetFieldValue = void 0;
function resetFieldValue(fieldName, setFieldValue, initialValues) {
    setFieldValue(fieldName, initialValues[fieldName]);
}
exports.resetFieldValue = resetFieldValue;
function resetFieldValues(fieldNames, setFieldValue, initialValues) {
    fieldNames.forEach((fieldName) => resetFieldValue(fieldName, setFieldValue, initialValues));
}
exports.resetFieldValues = resetFieldValues;
