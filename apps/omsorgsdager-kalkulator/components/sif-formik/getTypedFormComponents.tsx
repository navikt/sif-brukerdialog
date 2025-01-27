import { ReactElement } from 'react';
import FormikRadioGroup, { FormikRadioGroupProps } from './formik-radio-group/FormikRadioGroup';
import FormikSelect, { FormikSelectProps } from './formik-select/FormikSelect';
import FormikYesOrNoQuestion, { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import TypedFormikForm, { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import TypedFormikWrapper, { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';

export interface TypedFormComponents<FieldName, FormValues, ErrorType> {
    Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => ReactElement;
    FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => ReactElement;
    RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => ReactElement;
    Select: (props: FormikSelectProps<FieldName, ErrorType>) => ReactElement;
    YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => ReactElement;
}

export function getTypedFormComponents<FieldName, FormValues, ErrorType = string>(): TypedFormComponents<
    FieldName,
    FormValues,
    ErrorType
> {
    return {
        Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => (
            <FormikRadioGroup<FieldName, ErrorType> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldName, ErrorType>) => <FormikSelect<FieldName, ErrorType> {...props} />,
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => (
            <FormikYesOrNoQuestion<FieldName, ErrorType> {...props} />
        ),
    };
}
