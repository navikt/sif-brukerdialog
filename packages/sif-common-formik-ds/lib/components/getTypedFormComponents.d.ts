/// <reference types="react" />
import { FormikCheckboxGroupProps } from './formik-checkbox-group/FormikCheckboxGroup';
import { FormikCheckboxProps } from './formik-checkbox/FormikCheckbox';
import { FormikConfirmationCheckboxProps } from './formik-confirmation-checkbox/FormikConfirmationCheckbox';
import { FormikCountrySelectProps } from './formik-country-select/FormikCountrySelect';
import { DateIntervalPickerProps } from './formik-date-interval-picker/FormikDateIntervalPicker';
import { FormikDateRangePickerProps } from './formik-date-range-picker/FormikDateRangePicker';
import { FormikDatepickerProps } from './formik-datepicker/FormikDatepicker';
import { FormikFileInputProps } from './formik-file-input/FormikFileInput';
import { FormikInputGroupProps } from './formik-input-group/FormikInputGroup';
import { FormikRadioGroupProps } from './formik-radio-group/FormikRadioGroup';
import { FormikSelectProps } from './formik-select/FormikSelect';
import { FormikTextFieldProps } from './formik-text-field/FormikTextField';
import { FormikTextareaProps } from './formik-textarea/FormikTextarea';
import { FormikTimeInputProps } from './formik-time-input/FormikTimeInput';
import { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';
export interface TypedFormComponents<FieldName, FormValues, ErrorType> {
    Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => JSX.Element;
    CheckboxGroup: (props: FormikCheckboxGroupProps<FieldName, ErrorType>) => JSX.Element;
    ConfirmationCheckbox: (props: FormikConfirmationCheckboxProps<FieldName, ErrorType>) => JSX.Element;
    CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => JSX.Element;
    DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => JSX.Element;
    DateIntervalPicker: (props: DateIntervalPickerProps<FieldName, ErrorType>) => JSX.Element;
    DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => JSX.Element;
    FileInput: (props: FormikFileInputProps<FieldName>) => JSX.Element;
    Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => JSX.Element;
    FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => JSX.Element;
    TextField: (props: FormikTextFieldProps<FieldName, ErrorType>) => JSX.Element;
    InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => JSX.Element;
    RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => JSX.Element;
    Select: (props: FormikSelectProps<FieldName, ErrorType>) => JSX.Element;
    Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => JSX.Element;
    TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => JSX.Element;
    YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => JSX.Element;
}
export declare function getTypedFormComponents<FieldName, FormValues, ErrorType = string>(): TypedFormComponents<FieldName, FormValues, ErrorType>;
//# sourceMappingURL=getTypedFormComponents.d.ts.map