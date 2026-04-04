import { DatePicker, DatePickerProps, useDatepicker } from '@navikt/ds-react';
import { FocusEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DayOfWeek } from 'react-day-picker';

export interface DatepickerLimitations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: Array<{ from: Date; to: Date }>;
    disableWeekends?: boolean;
    disabledDaysOfWeek?: DayOfWeek;
}

import { datePickerUtils } from '../utils/datePickerUtils';

const {
    ISODateStringToUTCDate,
    getDisabledDates,
    INVALID_DATE,
    InputDateStringToISODateString,
    dateToISODateString,
    isISODateString,
} = datePickerUtils;

type Props<T extends FieldValues> = Omit<DatePickerProps, 'onChange' | 'fromDate' | 'toDate' | 'children'> &
    DatepickerLimitations & {
        name: Path<T>;
        label: string;
        inputId?: string;
        description?: ReactNode;
        inputDisabled?: boolean;
        validate?: (value: string) => string | undefined;
        onChange?: (date: string) => void;
    };

type ControllerProps<T extends FieldValues> = Props<T> & {
    value: string;
    onFieldChange: (v: string) => void;
    error?: string;
};

function DatepickerController<T extends FieldValues>({
    name,
    onChange: onChangeProp,
    label,
    inputId,
    description,
    inputDisabled,
    minDate,
    maxDate,
    disabledDateRanges,
    disableWeekends,
    disabledDaysOfWeek,
    value,
    onFieldChange,
    error,
    ...restProps
}: Omit<ControllerProps<T>, 'validate'>) {
    const [inputHasFocus, setInputHasFocus] = useState(false);
    const [listenForInputChange, setListenForInputChange] = useState(false);

    const disabledDates = getDisabledDates({
        minDate,
        maxDate,
        disabledDateRanges,
        disableWeekends,
        disabledDaysOfWeek,
    });

    const handleChange = useCallback(
        (dateString: string) => {
            onFieldChange(dateString);
            onChangeProp?.(dateString);
        },
        [onFieldChange, onChangeProp],
    );

    const { inputProps, datepickerProps, selectedDay, setSelected } = useDatepicker({
        ...restProps,
        disabled: disabledDates,
        fromDate: minDate,
        toDate: maxDate,
        onDateChange: (date) => {
            if (!inputHasFocus) {
                handleChange(date ? dateToISODateString(date) : '');
            }
        },
        defaultSelected: ISODateStringToUTCDate(value),
    });

    const prevValue = useRef(value);
    useEffect(() => {
        if (prevValue.current !== value && !listenForInputChange) {
            setSelected(isISODateString(value) ? ISODateStringToUTCDate(value) : undefined);
        }
        prevValue.current = value;
    }, [value, listenForInputChange, setSelected]);

    const inputValue = inputProps.value;
    useEffect(() => {
        if (listenForInputChange && typeof inputValue === 'string') {
            const iso = InputDateStringToISODateString(inputValue);
            handleChange(iso !== INVALID_DATE ? iso : inputValue);
            setListenForInputChange(false);
        }
    }, [inputValue, listenForInputChange, handleChange]);

    const onBlur = (evt: FocusEvent<HTMLInputElement>) => {
        setInputHasFocus(false);
        inputProps.onBlur?.(evt as any);
        if (selectedDay === undefined && typeof inputProps.value === 'string') {
            if (isISODateString(inputProps.value)) {
                handleChange(inputProps.value);
            } else {
                const iso = InputDateStringToISODateString(inputProps.value as string);
                handleChange(iso !== INVALID_DATE ? iso : (inputProps.value as string));
                setListenForInputChange(true);
            }
            return;
        }
        if (selectedDay) {
            handleChange(dateToISODateString(selectedDay));
        }
    };

    return (
        <DatePicker {...(datepickerProps as any)} {...restProps} mode="single" inputDisabled={inputDisabled}>
            <DatePicker.Input
                {...inputProps}
                id={inputId || (name as string)}
                name={name as string}
                label={label}
                description={description}
                variant="datepicker"
                disabled={inputDisabled}
                error={error}
                onBlur={onBlur}
                onFocus={(evt) => {
                    setInputHasFocus(true);
                    inputProps.onFocus?.(evt as any);
                }}
            />
        </DatePicker>
    );
}

export function SifDatepicker<T extends FieldValues>({ name, validate, onChange, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <DatepickerController
                    {...rest}
                    name={name}
                    onChange={onChange}
                    value={field.value || ''}
                    onFieldChange={field.onChange}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
}
