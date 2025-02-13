/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, DatePickerProps, useDatepicker } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { FormError } from '../../../types';
import {
    dateToISODateString,
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateString,
    ISODateStringToUTCDate,
} from '../dateFormatUtils';
import { DatepickerLimitations } from '../FormikDatepicker';
import { usePrevious } from './usePrevious';
import { datepickerUtils, isISODateString } from '../datepickerUtils';

type Props = Omit<DatePickerProps, 'onChange' | 'fromDate' | 'toDate'> &
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
    const [listenForInputValueChange, setListenForInputValueChange] = React.useState(false);

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
            setListenForInputValueChange(true);
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

    const { inputProps, datepickerProps, selectedDay, setSelected } = useDatepicker({
        locale,
        disabled: disabledDates,
        fromDate: restProps.minDate,
        toDate: restProps.maxDate,
        onDateChange: onDateChange,
        ...restProps,
        defaultSelected: ISODateStringToUTCDate(value),
    });

    const previous = usePrevious(value);
    useEffect(() => {
        if (previous !== value && listenForInputValueChange === false) {
            if (isISODateString(value)) {
                setSelected(ISODateStringToUTCDate(value));
            } else {
                setSelected(undefined);
            }
        }
    }, [listenForInputValueChange, value, previous, setSelected]);

    const inputValue = inputProps.value;

    useEffect(() => {
        if (listenForInputValueChange && typeof inputValue === 'string') {
            const isoDateString = InputDateStringToISODateString(inputValue);
            onChange(isoDateString !== INVALID_DATE_VALUE ? isoDateString : inputValue);
            setListenForInputValueChange(false);
        }
    }, [inputValue, listenForInputValueChange, onChange]);

    const { minDate, maxDate, ...dpRestProps } = restProps;

    return (
        <DatePicker
            {...(datepickerProps as any)}
            {...dpRestProps}
            mode="single"
            onSelect={onSelect}
            inputDisabled={inputDisabled}>
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
