import React from 'react';
import { useFormikContext } from 'formik';
import { UseFastFieldProps } from '../../types';
import { ISOStringToDate } from '../formik-datepicker/datepickerUtils';
import FormikDatepicker, {
    DatePickerBaseProps,
    DatePickerPresentationProps,
} from '../formik-datepicker/FormikDatepicker';
import { FormikDatepickerLimitations } from '../formik-datepicker/formikDatepickerTypes';
import FormikInputGroup from '../formik-input-group/FormikInputGroup';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';
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

export type FormikDateRangePickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    DatePickerPresentationProps &
    FormikDatepickerLimitations &
    UseFastFieldProps;

function FormikDateRangePicker<FieldName, ErrorType>({
    legend,
    fromInputProps,
    toInputProps,
    description,
    minDate,
    maxDate,
    disableWeekend,
    disabledDateRanges,
    showYearSelector,
    fullScreenOnMobile,
    fullscreenOverlay,
    allowRangesToStartAndStopOnSameDate,
    useFastField,
    locale,
}: FormikDateRangePickerProps<FieldName, ErrorType>) {
    const { values } = useFormikContext<any>();
    const fromDate = ISOStringToDate(values[fromInputProps.name]);
    const toDate = ISOStringToDate(values[toInputProps.name]);
    const { fromDateLimitations, toDateLimitations } = getDateRangePickerLimitations({
        fromDate,
        toDate,
        minDate,
        maxDate,
        dateRanges: disabledDateRanges,
        disableWeekend,
        allowRangesToStartAndStopOnSameDate,
    });
    const name = `${fromInputProps.name}_${toInputProps.name}` as any;
    return (
        <FormikInputGroup name={name} legend={legend} description={description} className="dateRangePicker">
            <div className="dateRangePicker__flexContainer">
                <div className="dateRangePicker__from">
                    <FormikDatepicker<FieldName, ErrorType>
                        {...fromInputProps}
                        {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                        {...fromDateLimitations}
                        locale={locale as any}
                        useFastField={useFastField}
                    />
                </div>
                <div className="dateRangePicker__to">
                    <FormikDatepicker<FieldName, ErrorType>
                        {...toInputProps}
                        {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                        {...toDateLimitations}
                        locale={locale as any}
                        useFastField={useFastField}
                    />
                </div>
            </div>
        </FormikInputGroup>
    );
}

export default FormikDateRangePicker;
