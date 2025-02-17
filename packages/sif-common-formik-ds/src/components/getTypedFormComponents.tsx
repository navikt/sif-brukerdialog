import { ReactElement } from 'react';
import FormikCheckboxGroup, { FormikCheckboxGroupProps } from './formik-checkbox-group/FormikCheckboxGroup';
import FormikCheckbox, { FormikCheckboxProps } from './formik-checkbox/FormikCheckbox';
import FormikConfirmationCheckbox, {
    FormikConfirmationCheckboxProps,
} from './formik-confirmation-checkbox/FormikConfirmationCheckbox';
import FormikCountrySelect, { FormikCountrySelectProps } from './formik-country-select/FormikCountrySelect';
import FormikDateRangePicker, { FormikDateRangePickerProps } from './formik-date-range-picker/FormikDateRangePicker';
import FormikDatepicker, { FormikDatepickerProps } from './formik-datepicker/FormikDatepicker';
import FormikInputGroup, { FormikInputGroupProps } from './formik-input-group/FormikInputGroup';
import FormikNumberInput, { FormikNumberInputProps } from './formik-number-input/FormikNumberInput';
import FormikRadioGroup, { FormikRadioGroupProps } from './formik-radio-group/FormikRadioGroup';
import FormikSelect, { FormikSelectProps } from './formik-select/FormikSelect';
import FormikTextField, { FormikTextFieldProps } from './formik-text-field/FormikTextField';
import FormikTextarea, { FormikTextareaProps } from './formik-textarea/FormikTextarea';
import FormikTimeInput, { FormikTimeInputProps } from './formik-time-input/FormikTimeInput';
import FormikYesOrNoQuestion, { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import TypedFormikForm, { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import TypedFormikWrapper, { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';
import FormikCombobox, { FormikComboboxProps } from './formik-combobox/FormikCombobox';

export interface TypedFormComponents<FieldName, FormValues, ErrorType> {
    Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => ReactElement;
    CheckboxGroup: (props: FormikCheckboxGroupProps<FieldName, ErrorType>) => ReactElement;
    Combobox: (props: FormikComboboxProps<FieldName, ErrorType>) => ReactElement;
    ConfirmationCheckbox: (props: FormikConfirmationCheckboxProps<FieldName, ErrorType>) => ReactElement;
    CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => ReactElement;
    DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => ReactElement;
    DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => ReactElement;
    Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => ReactElement;
    FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => ReactElement;
    TextField: (props: FormikTextFieldProps<FieldName, ErrorType>) => ReactElement;
    NumberInput: (props: FormikNumberInputProps<FieldName, ErrorType>) => ReactElement;
    InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => ReactElement;
    RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => ReactElement;
    Select: (props: FormikSelectProps<FieldName, ErrorType>) => ReactElement;
    Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => ReactElement;
    TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => ReactElement;
    YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => ReactElement;
}

export function getTypedFormComponents<FieldName, FormValues, ErrorType = string>(): TypedFormComponents<
    FieldName,
    FormValues,
    ErrorType
> {
    return {
        Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => (
            <FormikCheckbox<FieldName, ErrorType> {...props} />
        ),
        CheckboxGroup: (props: FormikCheckboxGroupProps<FieldName, ErrorType>) => (
            <FormikCheckboxGroup<FieldName, ErrorType> {...props} />
        ),
        ConfirmationCheckbox: (props: FormikConfirmationCheckboxProps<FieldName, ErrorType>) => (
            <FormikConfirmationCheckbox<FieldName, ErrorType> {...props} />
        ),
        Combobox: (props: FormikComboboxProps<FieldName, ErrorType>) => (
            <FormikCombobox<FieldName, ErrorType> {...props} />
        ),
        CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => (
            <FormikCountrySelect<FieldName, ErrorType> {...props} />
        ),
        DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => (
            <FormikDatepicker<FieldName, ErrorType> {...props} />
        ),
        DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => (
            <FormikDateRangePicker<FieldName, ErrorType> {...props} />
        ),
        Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        TextField: (props: FormikTextFieldProps<FieldName, ErrorType>) => (
            <FormikTextField<FieldName, ErrorType> {...props} />
        ),
        NumberInput: (props: FormikNumberInputProps<FieldName, ErrorType>) => (
            <FormikNumberInput<FieldName, ErrorType> {...props} />
        ),
        InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => (
            <FormikInputGroup<ErrorType, FieldName> {...props} />
        ),
        RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => (
            <FormikRadioGroup<FieldName, ErrorType> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldName, ErrorType>) => <FormikSelect<FieldName, ErrorType> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => (
            <FormikTextarea<FieldName, ErrorType> {...props} />
        ),
        TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => (
            <FormikTimeInput<FieldName, ErrorType> {...props} />
        ),
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => (
            <FormikYesOrNoQuestion<FieldName, ErrorType> {...props} />
        ),
    };
}
