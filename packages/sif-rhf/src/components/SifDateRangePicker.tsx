import { Fieldset, HStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { DatepickerLimitations, ISODateStringToUTCDate } from '../utils/dateUtils';
import { SifDatepicker } from './SifDatepicker';

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
    legend: string;
    hideLegend?: boolean;
    description?: ReactNode;
    fromInputProps: DatepickerFieldProps<T>;
    toInputProps: DatepickerFieldProps<T>;
};

export function SifDateRangePicker<T extends FieldValues>({
    legend,
    hideLegend,
    description,
    fromInputProps,
    toInputProps,
}: Props<T>) {
    const { watch } = useFormContext<T>();

    const fromValue = watch(fromInputProps.name);
    const toValue = watch(toInputProps.name);

    const fromDate = fromValue ? ISODateStringToUTCDate(fromValue as string) : undefined;
    const toDate = toValue ? ISODateStringToUTCDate(toValue as string) : undefined;

    const resolvedFromMaxDate = minDate(toDate, fromInputProps.maxDate);
    const resolvedToMinDate = maxDate(fromDate, toInputProps.minDate);

    return (
        <Fieldset legend={legend} hideLegend={hideLegend}>
            {description}
            <HStack gap="space-4" wrap>
                <SifDatepicker<T> {...fromInputProps} maxDate={resolvedFromMaxDate} />
                <SifDatepicker<T> {...toInputProps} minDate={resolvedToMinDate} />
            </HStack>
        </Fieldset>
    );
}
