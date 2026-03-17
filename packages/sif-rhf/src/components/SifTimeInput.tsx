import { BodyShort, Fieldset, HStack, TextField } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export interface InputTime {
    hours: string;
    minutes: string;
}

type TimeInputLabels = {
    hours?: string;
    minutes?: string;
};

type TimeInputPlaceholders = {
    hours: string;
    minutes: string;
};

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
    validate?: (value: Partial<InputTime>) => string | undefined;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLabels?: TimeInputLabels;
    placeholders?: TimeInputPlaceholders;
};

const defaultLabels: Required<TimeInputLabels> = {
    hours: 'Timer',
    minutes: 'Minutter',
};

export function SifTimeInput<T extends FieldValues>({
    name,
    label,
    description,
    disabled,
    validate,
    maxHours = 24,
    maxMinutes = 59,
    timeInputLabels,
    placeholders,
}: Props<T>) {
    const { control } = useFormContext<T>();
    const labels = { ...defaultLabels, ...timeInputLabels };

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v as Partial<InputTime>) ?? true : undefined }}
            render={({ field, fieldState }) => {
                const value = (field.value || {}) as Partial<InputTime>;

                return (
                    <Fieldset legend={label} id={name} error={fieldState.error?.message}>
                        <HStack gap="space-4" align="start">
                            <TextField
                                id={`${name}-hours`}
                                label={labels.hours}
                                size="small"
                                type="text"
                                autoComplete="off"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                min={0}
                                max={maxHours}
                                maxLength={2}
                                value={value.hours || ''}
                                disabled={disabled}
                                placeholder={placeholders?.hours}
                                onBlur={field.onBlur}
                                onChange={(evt) => field.onChange({ ...value, hours: evt.target.value })}
                            />
                            <TextField
                                id={`${name}-minutes`}
                                label={labels.minutes}
                                size="small"
                                type="text"
                                autoComplete="off"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                min={0}
                                max={maxMinutes}
                                maxLength={2}
                                value={value.minutes || ''}
                                disabled={disabled}
                                placeholder={placeholders?.minutes}
                                onBlur={field.onBlur}
                                onChange={(evt) => field.onChange({ ...value, minutes: evt.target.value })}
                            />
                        </HStack>
                        {description ? <BodyShort spacing>{description}</BodyShort> : null}
                    </Fieldset>
                );
            }}
        />
    );
}
