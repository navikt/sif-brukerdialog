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
require("@navikt/ds-datepicker/lib/index.css");
require("./datepicker.css");
const ds_datepicker_1 = require("@navikt/ds-datepicker");
const formik_1 = require("formik");
const react_1 = __importDefault(require("react"));
const SkjemagruppeQuestion_1 = __importDefault(require("../helpers/skjemagruppe-question/SkjemagruppeQuestion"));
const TypedFormikForm_1 = require("../typed-formik-form/TypedFormikForm");
const datepickerUtils_1 = __importDefault(require("./datepickerUtils"));
const typedFormErrorUtils_1 = require("../../utils/typedFormErrorUtils");
const react_intl_1 = require("react-intl");
const react_responsive_1 = require("react-responsive");
const uuid_1 = require("uuid");
const getLocaleToUse = (locale) => {
    switch (locale) {
        case 'nb':
            return 'nb';
        case 'nn':
            return 'nn';
        case 'en':
            return 'en';
        default:
            return undefined;
    }
};
function FormikDatepicker(_a) {
    var { validate, label, name, id, showYearSelector, fullscreenOverlay, fullScreenOnMobile, error, minDate, maxDate, disableWeekend, disabledDateRanges, disabledDaysOfWeek, inputTitle, onChange, description, placeholder, locale, useFastField } = _a, restProps = __rest(_a, ["validate", "label", "name", "id", "showYearSelector", "fullscreenOverlay", "fullScreenOnMobile", "error", "minDate", "maxDate", "disableWeekend", "disabledDateRanges", "disabledDaysOfWeek", "inputTitle", "onChange", "description", "placeholder", "locale", "useFastField"]);
    const context = react_1.default.useContext(TypedFormikForm_1.TypedFormikFormContext);
    const isWide = (0, react_responsive_1.useMediaQuery)({ minWidth: 736 });
    const elementId = id || (0, uuid_1.v4)();
    const position = fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '');
    const intl = (0, react_intl_1.useIntl)();
    const FieldComponent = useFastField ? formik_1.FastField : formik_1.Field;
    return (react_1.default.createElement(FieldComponent, { validate: validate ? (value) => validate(value, name) : undefined, name: name }, ({ field, form }) => {
        const isInvalid = (error || (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error })) !== undefined;
        const handleOnDatepickerChange = (dateString) => {
            if (field.value !== dateString) {
                form.setFieldValue(field.name, dateString);
                if (onChange) {
                    onChange(dateString);
                }
                if (context) {
                    context.onAfterFieldValueSet();
                }
            }
        };
        return (react_1.default.createElement(SkjemagruppeQuestion_1.default, { error: (0, typedFormErrorUtils_1.getErrorPropForFormikInput)({ field, form, context, error }), legend: label, description: description },
            react_1.default.createElement(ds_datepicker_1.Datepicker, Object.assign({ inputId: elementId, inputLabel: label, locale: getLocaleToUse(locale || intl.locale) }, restProps, { inputProps: {
                    name: inputName,
                    placeholder,
                    'aria-invalid': isInvalid,
                    title: inputTitle,
                }, value: field.value, calendarDateStringFilter: (value) => {
                    if (datepickerUtils_1.default.isValidFormattedDateString(value)) {
                        return value;
                    }
                    return undefined;
                }, limitations: datepickerUtils_1.default.parseDateLimitations({
                    minDate,
                    maxDate,
                    disableWeekend,
                    disabledDateRanges,
                    disabledDaysOfWeek,
                }), showYearSelector: showYearSelector, calendarSettings: {
                    position,
                }, onChange: handleOnDatepickerChange }))));
    }));
}
exports.default = FormikDatepicker;
