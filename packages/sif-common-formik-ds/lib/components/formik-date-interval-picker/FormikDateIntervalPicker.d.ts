import React from 'react';
import { FormError, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import './dateIntervalPicker.scss';
export interface DateIntervalPickerProps<FieldName, ErrorType> extends TypedFormInputValidationProps<FieldName, ErrorType>, UseFastFieldProps {
    legend: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName, ErrorType>;
    toDatepickerProps: FormikDatepickerProps<FieldName, ErrorType>;
    description?: React.ReactNode;
    error?: FormError;
}
declare function FormikDateIntervalPicker<FieldName, ErrorType>({ legend, fromDatepickerProps, toDatepickerProps, description, useFastField, error, validate, }: DateIntervalPickerProps<FieldName, ErrorType>): JSX.Element;
export default FormikDateIntervalPicker;
//# sourceMappingURL=FormikDateIntervalPicker.d.ts.map