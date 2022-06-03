"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypedFormComponents = void 0;
const react_1 = __importDefault(require("react"));
const FormikCheckboxGroup_1 = __importDefault(require("./formik-checkbox-group/FormikCheckboxGroup"));
const FormikCheckbox_1 = __importDefault(require("./formik-checkbox/FormikCheckbox"));
const FormikConfirmationCheckbox_1 = __importDefault(require("./formik-confirmation-checkbox/FormikConfirmationCheckbox"));
const FormikCountrySelect_1 = __importDefault(require("./formik-country-select/FormikCountrySelect"));
const FormikDateIntervalPicker_1 = __importDefault(require("./formik-date-interval-picker/FormikDateIntervalPicker"));
const FormikDateRangePicker_1 = __importDefault(require("./formik-date-range-picker/FormikDateRangePicker"));
const FormikDatepicker_1 = __importDefault(require("./formik-datepicker/FormikDatepicker"));
const FormikFileInput_1 = __importDefault(require("./formik-file-input/FormikFileInput"));
const FormikInputGroup_1 = __importDefault(require("./formik-input-group/FormikInputGroup"));
const FormikRadioGroup_1 = __importDefault(require("./formik-radio-group/FormikRadioGroup"));
const FormikSelect_1 = __importDefault(require("./formik-select/FormikSelect"));
const FormikTextField_1 = __importDefault(require("./formik-text-field/FormikTextField"));
const FormikTextarea_1 = __importDefault(require("./formik-textarea/FormikTextarea"));
const FormikTimeInput_1 = __importDefault(require("./formik-time-input/FormikTimeInput"));
const FormikYesOrNoQuestion_1 = __importDefault(require("./formik-yes-or-no-question/FormikYesOrNoQuestion"));
const TypedFormikForm_1 = __importDefault(require("./typed-formik-form/TypedFormikForm"));
const TypedFormikWrapper_1 = __importDefault(require("./typed-formik-wrapper/TypedFormikWrapper"));
function getTypedFormComponents() {
    return {
        Checkbox: (props) => (react_1.default.createElement(FormikCheckbox_1.default, Object.assign({}, props))),
        CheckboxGroup: (props) => (react_1.default.createElement(FormikCheckboxGroup_1.default, Object.assign({}, props))),
        ConfirmationCheckbox: (props) => (react_1.default.createElement(FormikConfirmationCheckbox_1.default, Object.assign({}, props))),
        CountrySelect: (props) => (react_1.default.createElement(FormikCountrySelect_1.default, Object.assign({}, props))),
        DatePicker: (props) => (react_1.default.createElement(FormikDatepicker_1.default, Object.assign({}, props))),
        DateIntervalPicker: (props) => (react_1.default.createElement(FormikDateIntervalPicker_1.default, Object.assign({}, props))),
        DateRangePicker: (props) => (react_1.default.createElement(FormikDateRangePicker_1.default, Object.assign({}, props))),
        FileInput: (props) => react_1.default.createElement(FormikFileInput_1.default, Object.assign({}, props)),
        Form: (props) => react_1.default.createElement(TypedFormikForm_1.default, Object.assign({}, props)),
        FormikWrapper: (props) => react_1.default.createElement(TypedFormikWrapper_1.default, Object.assign({}, props)),
        TextField: (props) => (react_1.default.createElement(FormikTextField_1.default, Object.assign({}, props))),
        InputGroup: (props) => (react_1.default.createElement(FormikInputGroup_1.default, Object.assign({}, props))),
        RadioGroup: (props) => (react_1.default.createElement(FormikRadioGroup_1.default, Object.assign({}, props))),
        Select: (props) => react_1.default.createElement(FormikSelect_1.default, Object.assign({}, props)),
        Textarea: (props) => (react_1.default.createElement(FormikTextarea_1.default, Object.assign({}, props))),
        TimeInput: (props) => (react_1.default.createElement(FormikTimeInput_1.default, Object.assign({}, props))),
        YesOrNoQuestion: (props) => (react_1.default.createElement(FormikYesOrNoQuestion_1.default, Object.assign({}, props))),
    };
}
exports.getTypedFormComponents = getTypedFormComponents;
