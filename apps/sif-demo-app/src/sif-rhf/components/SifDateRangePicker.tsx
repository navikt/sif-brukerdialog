import { Fieldset, HStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { DatepickerLimitations, ISODateStringToUTCDate } from '../utils/dateUtils';
import { SifDatepicker } from './SifDatepicker';

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
    allowRangesToStartAndStopOnSameDate?: boolean;
};

export function SifDateRangePicker<T extends FieldValues>({
    legend,
    hideLegend,
    description,
    fromInputProps,
    toInputProps,
    allowRangesToStartAndStopOnSameDate,
}: Props<T>) {
    const { watch } = useFormContext<T>();

    const fromValue = watch(fromInputProps.name);
    const toValue = watch(toInputProps.name);

    const fromDate = fromValue ? ISODateStringToUTCDate(fromValue as string) : undefined;
    const toDate = toValue ? ISODateStringToUTCDate(toValue as string) : undefined;

    const toMinDate =
        fromDate && !allowRangesToStartAndStopOnSameDate ? fromDate : fromInputProps.minDate || toInputProps.minDate;
    const fromMaxDate =
        toDate && !allowRangesToStartAndStopOnSameDate ? toDate : fromInputProps.maxDate || toInputProps.maxDate;

    return (
        <Fieldset legend={legend} hideLegend={hideLegend}>
            {description}
            <HStack gap="space-4" wrap>
                <SifDatepicker<T> {...fromInputProps} maxDate={fromMaxDate || fromInputProps.maxDate} />
                <SifDatepicker<T> {...toInputProps} minDate={toMinDate || toInputProps.minDate} />
            </HStack>
        </Fieldset>
    );
}
