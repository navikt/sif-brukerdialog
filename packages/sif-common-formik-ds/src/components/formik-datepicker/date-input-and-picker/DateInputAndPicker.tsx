import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { DatePickerDefaultProps } from '@navikt/ds-react/esm/date/datepicker/DatePicker';
import React from 'react';
import { FormError } from '../../../types';
import {
    dateToISODateString,
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateString,
    ISODateStringToUTCDate,
} from '../dateFormatUtils';
import datepickerUtils, { isISODateString } from '../datepickerUtils';
import { DatepickerLimitations } from '../FormikDatepicker';

type Props = Omit<DatePickerDefaultProps, 'onChange' | 'fromDate' | 'toDate'> &
    DatepickerLimitations & {
        inputId?: string;
        name: string;
        label: string;
        error?: FormError;
        inputDisabled?: boolean;
        description?: React.ReactNode;
        value?: string;
        onChange: (date: ISODateString | string) => void;
    };

const DateInputAndPicker: React.FunctionComponent<Props> = ({
    label,
    name,
    value,
    inputId,
    error,
    inputDisabled,
    disableWeekends,
    disabledDateRanges,
    disabledDaysOfWeek,
    onChange,
    locale,
    ...restProps
}) => {
    const [inputHasFocus, setInputHasFocus] = React.useState(false);

    const disabledDates = datepickerUtils.getDisabledDates({
        minDate: restProps.minDate,
        maxDate: restProps.maxDate,
        disabledDateRanges,
        disabledDaysOfWeek,
        disableWeekends,
    });

    const onInputBlur = (evt) => {
        setInputHasFocus(false);
        if (inputProps.onBlur) {
            inputProps.onBlur(evt);
        }
        if (selectedDay === undefined && typeof inputProps.value === 'string') {
            if (isISODateString(inputProps.value)) {
                onChange(inputProps.value);
                return;
            }
            const isoDateString = InputDateStringToISODateString(inputProps.value);
            onChange(isoDateString !== INVALID_DATE_VALUE ? isoDateString : inputProps.value);
            return;
        }
        if (selectedDay) {
            onChange(dateToISODateString(selectedDay));
        }
    };

    const onInputFocus = (evt) => {
        if (inputProps.onFocus) {
            inputProps.onFocus(evt);
        }
        setInputHasFocus(true);
    };

    const onSelect = (date?: Date) => {
        const isoDateString = date ? dateToISODateString(date) : '';
        if (isoDateString !== value) {
            onChange(isoDateString);
        }
    };

    const onDateChange = (date?: Date) => {
        if (inputHasFocus) {
            return;
        }
        const isoDateString = date ? dateToISODateString(date) : '';
        if (isoDateString !== value) {
            onChange(isoDateString);
        }
    };

    const { inputProps, datepickerProps, selectedDay } = useDatepicker({
        locale,
        disabled: disabledDates,
        fromDate: restProps.minDate,
        toDate: restProps.maxDate,
        onDateChange: onDateChange,
        defaultSelected: ISODateStringToUTCDate(value),
        ...restProps,
    });

    return (
        <DatePicker {...(datepickerProps as any)} mode="single" onSelect={onSelect} inputDisabled={inputDisabled}>
            <DatePicker.Input
                {...inputProps}
                description={restProps.description}
                id={inputId}
                name={name}
                label={label}
                variant="datepicker"
                disabled={inputDisabled}
                onBlur={onInputBlur}
                onFocus={onInputFocus}
                error={error}
            />
        </DatePicker>
    );
};

export default DateInputAndPicker;
