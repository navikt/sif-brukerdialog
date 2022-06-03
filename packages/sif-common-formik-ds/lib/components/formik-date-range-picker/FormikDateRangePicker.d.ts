import React from 'react';
import { UseFastFieldProps } from '../../types';
import { DatePickerBaseProps, DatepickerLimitiations, DatePickerPresentationProps } from '../formik-datepicker/FormikDatepicker';
import './dateRangePicker.scss';
interface OwnProps<FieldName, ErrorType> {
    legend: string;
    description?: React.ReactNode;
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    locale?: string;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName, ErrorType>;
    toInputProps: DatePickerBaseProps<FieldName, ErrorType>;
}
export declare type FormikDateRangePickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> & DatePickerPresentationProps & DatepickerLimitiations & UseFastFieldProps;
declare function FormikDateRangePicker<FieldName, ErrorType>({ legend, fromInputProps, toInputProps, description, minDate, maxDate, disableWeekend, disabledDateRanges, showYearSelector, fullScreenOnMobile, fullscreenOverlay, allowRangesToStartAndStopOnSameDate, useFastField, locale, }: FormikDateRangePickerProps<FieldName, ErrorType>): JSX.Element;
export default FormikDateRangePicker;
//# sourceMappingURL=FormikDateRangePicker.d.ts.map