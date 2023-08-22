import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { DatePickerDefaultProps } from '@navikt/ds-react/esm/date/datepicker/DatePicker';
import React from 'react';
import { FormError } from '../../../types';
import { dateToISODateString } from '../dateFormatUtils';
import datepickerUtils from '../datepickerUtils';
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
        onChange: (date: string) => void;
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
    const disabledDates = datepickerUtils.getDisabledDates({
        minDate: restProps.minDate,
        maxDate: restProps.maxDate,
        disabledDateRanges,
        disabledDaysOfWeek,
        disableWeekends,
    });

    const { inputProps, datepickerProps } = useDatepicker({
        openOnFocus: false,
        locale,
        disabled: disabledDates,
        fromDate: restProps.minDate,
        toDate: restProps.maxDate,
        ...restProps,
    });

    const onSelect = (date?: Date) => {
        const dateString = date ? dateToISODateString(date) : '';
        if (dateString !== value) {
            onChange(dateString);
        }
    };

    return (
        <DatePicker {...(datepickerProps as any)} mode="single" onSelect={onSelect} inputDisabled={inputDisabled}>
            <DatePicker.Input
                {...inputProps}
                id={inputId}
                name={name}
                label={label}
                variant="datepicker"
                disabled={inputDisabled}
                onChange={(evt) => {
                    if (inputProps.onChange) {
                        inputProps.onChange(evt);
                    }
                    onChange(evt.target.value);
                }}
                error={error}
            />
        </DatePicker>
    );
};

export default DateInputAndPicker;
