import '@navikt/ds-datepicker/lib/index.css';
import './datepicker.css';
import { DateRange, FormError, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { DayPickerProps } from 'react-day-picker';
import React from 'react';
export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
    disabledDaysOfWeek?: number[];
}
export interface DatePickerBaseProps<FieldName, ErrorType> extends TestProps, TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    error?: FormError;
    inputTitle?: string;
    placeholder?: string;
    dayPickerProps?: Omit<DayPickerProps, 'disabledDays'>;
    invalidFormatError?: string;
    locale?: 'nb' | 'nn' | 'en';
    onChange?: (date: string) => void;
}
export interface DatePickerPresentationProps {
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
}
interface OwnProps<FieldName, ErrorType> extends DatePickerBaseProps<FieldName, ErrorType> {
    id?: string;
    description?: React.ReactNode;
}
export declare type FormikDatepickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> & DatePickerPresentationProps & DatepickerLimitiations & UseFastFieldProps;
declare function FormikDatepicker<FieldName, ErrorType>({ validate, label, name, id, showYearSelector, fullscreenOverlay, fullScreenOnMobile, error, minDate, maxDate, disableWeekend, disabledDateRanges, disabledDaysOfWeek, inputTitle, onChange, description, placeholder, locale, useFastField, ...restProps }: FormikDatepickerProps<FieldName, ErrorType>): JSX.Element;
export default FormikDatepicker;
//# sourceMappingURL=FormikDatepicker.d.ts.map