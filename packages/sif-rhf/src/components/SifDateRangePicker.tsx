import { HStack } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { datePickerUtils } from '../utils';
import { DatepickerLimitations, SifDatepicker } from './SifDatepicker';
import { SifInputGroup } from './SifInputGroup';
import { ISODate } from '@sif/utils';
import { getDateRangeMaxDate, getDateRangeMinDate } from '../utils/dateRangePickerUtils';

type DatepickerFieldProps<T extends FieldValues> = DatepickerLimitations & {
    name: Path<T>;
    label: string;
    validate?: (value: string) => string | undefined;
    inputId?: string;
    inputDisabled?: boolean;
    description?: ReactNode;
};

type Props<T extends FieldValues> = {
    name: string;
    legend: string;
    hideLegend?: boolean;
    description?: ReactNode;
    fromInputProps: DatepickerFieldProps<T>;
    toInputProps: DatepickerFieldProps<T>;
    validate?: ({
        fromDate,
        toDate,
    }: {
        fromDate: ISODate | undefined;
        toDate: ISODate | undefined;
    }) => string | undefined;
};

export function SifDateRangePicker<T extends FieldValues>({
    name,
    legend,
    hideLegend,
    description,
    fromInputProps,
    toInputProps,
    validate,
}: Props<T>) {
    const { watch, setError, clearErrors } = useFormContext<T>();
    const validateRef = useRef(validate);
    validateRef.current = validate;

    const fromValue = watch(fromInputProps.name);
    const toValue = watch(toInputProps.name);

    const fromDate = fromValue ? datePickerUtils.parseDatePickerValueToISODate(fromValue as string) : undefined;
    const toDate = toValue ? datePickerUtils.parseDatePickerValueToISODate(toValue as string) : undefined;

    const resolvedFromMaxDate: ISODate | undefined = getDateRangeMaxDate(fromInputProps.maxDate, toDate);
    const resolvedToMinDate: ISODate | undefined = getDateRangeMinDate(toInputProps.minDate, fromDate);

    useEffect(() => {
        if (!validateRef.current) return;
        const currentFromDate = fromValue
            ? datePickerUtils.parseDatePickerValueToISODate(fromValue as string)
            : undefined;
        const currentToDate = toValue ? datePickerUtils.parseDatePickerValueToISODate(toValue as string) : undefined;
        const message = validateRef.current({ fromDate: currentFromDate, toDate: currentToDate });
        if (message) {
            setError(name as any, { type: 'manual', message });
        } else {
            clearErrors(name as any);
        }
    }, [fromValue, toValue, name, setError, clearErrors]);

    return (
        <SifInputGroup name={name} legend={legend} hideLegend={hideLegend}>
            {description}
            <HStack gap="space-16" wrap>
                <SifDatepicker<T> {...fromInputProps} maxDate={resolvedFromMaxDate} />
                <SifDatepicker<T> {...toInputProps} minDate={resolvedToMinDate} />
            </HStack>
        </SifInputGroup>
    );
}
