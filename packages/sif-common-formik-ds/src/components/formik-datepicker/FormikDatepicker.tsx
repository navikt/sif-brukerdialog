import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import { CalendarPlacement, Datepicker, DatepickerChange } from '@navikt/ds-datepicker';
import { FastField, Field, FieldProps } from 'formik';
import { v4 as uuid } from 'uuid';
import { DateRange, FormError, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import '@navikt/ds-datepicker/lib/index.css';
import './datepicker.css';
import { DatepickerLocales } from '@navikt/ds-datepicker/lib/types';

export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
    disabledDaysOfWeek?: number[];
}

export interface DatePickerBaseProps<FieldName, ErrorType>
    extends TestProps,
        TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    error?: FormError;
    inputTitle?: string;
    placeholder?: string;
    dayPickerProps?: Omit<DayPickerProps, 'disabledDays'>;
    invalidFormatError?: string;
    locale?: DatepickerLocales;
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

export type FormikDatepickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    DatePickerPresentationProps &
    DatepickerLimitiations &
    UseFastFieldProps;

const getLocaleToUse = (locale: string): DatepickerLocales | undefined => {
    switch (locale) {
        case 'nn':
            return 'nn';
        case 'en':
            return 'en';
        default:
            return 'nb';
    }
};

function FormikDatepicker<FieldName, ErrorType>({
    validate,
    label,
    name,
    id,
    showYearSelector,
    fullscreenOverlay,
    fullScreenOnMobile,
    error,
    minDate,
    maxDate,
    disableWeekend,
    disabledDateRanges,
    disabledDaysOfWeek,
    inputTitle,
    onChange,
    description,
    placeholder,
    locale,
    useFastField,
    ...restProps
}: FormikDatepickerProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMediaQuery({ minWidth: 736 });
    const elementId = id || uuid();
    const position: CalendarPlacement | undefined =
        fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '') as string;
    const intl = useIntl();
    const FieldComponent = useFastField ? FastField : Field;

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps<string>) => {
                const isInvalid = (error || getErrorPropForFormikInput({ field, form, context, error })) !== undefined;
                const handleOnDatepickerChange: DatepickerChange = (dateString) => {
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

                return (
                    <Datepicker
                        id={elementId}
                        label={label}
                        inputName={inputName}
                        locale={getLocaleToUse(locale || intl.locale)}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        description={description}
                        {...restProps}
                        inputProps={{
                            placeholder,
                            'aria-invalid': isInvalid,
                            title: inputTitle,
                        }}
                        value={field.value}
                        calendarDateStringFilter={(value) => {
                            if (datepickerUtils.isValidFormattedDateString(value)) {
                                return value;
                            }
                            // Date is not valid, open calendar with no date specified
                            return undefined;
                        }}
                        limitations={datepickerUtils.parseDateLimitations({
                            minDate,
                            maxDate,
                            disableWeekend,
                            disabledDateRanges,
                            disabledDaysOfWeek,
                        })}
                        showYearSelector={showYearSelector}
                        calendarSettings={{
                            position,
                        }}
                        onChange={handleOnDatepickerChange}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikDatepicker;
