import { HStack } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { datePickerUtils } from '../utils';
import { DatepickerLimitations, SifDatepicker } from './SifDatepicker';
import { SifInputGroup } from './SifInputGroup';

export const minDate = (a?: Date, b?: Date): Date | undefined => {
    if (!a) return b;
    if (!b) return a;
    return a < b ? a : b;
};

export const maxDate = (a?: Date, b?: Date): Date | undefined => {
    if (!a) return b;
    if (!b) return a;
    return a > b ? a : b;
};

type DatepickerFieldProps<T extends FieldValues> = DatepickerLimitations & {
    name: Path<T>;
    label: string;
    validate?: (value: string) => string | undefined;
    inputId?: string;
    description?: ReactNode;
};

type Props<T extends FieldValues> = {
    name: string;
    legend: string;
    hideLegend?: boolean;
    description?: ReactNode;
    fromInputProps: DatepickerFieldProps<T>;
    toInputProps: DatepickerFieldProps<T>;
    validate?: ({ fromDate, toDate }: { fromDate: Date | undefined; toDate: Date | undefined }) => string | undefined;
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

    const fromDate = fromValue ? datePickerUtils.ISODateStringToUTCDate(fromValue as string) : undefined;
    const toDate = toValue ? datePickerUtils.ISODateStringToUTCDate(toValue as string) : undefined;

    const resolvedFromMaxDate = minDate(toDate, fromInputProps.maxDate);
    const resolvedToMinDate = maxDate(fromDate, toInputProps.minDate);

    useEffect(() => {
        if (!validateRef.current) return;
        const currentFromDate = fromValue ? datePickerUtils.ISODateStringToUTCDate(fromValue as string) : undefined;
        const currentToDate = toValue ? datePickerUtils.ISODateStringToUTCDate(toValue as string) : undefined;
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
