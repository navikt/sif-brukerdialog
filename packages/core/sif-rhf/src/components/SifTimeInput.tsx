import './SifTimeInput.css';

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

export type TimeInputLayout = 'vertical' | 'horizontal';

type TimeInputLayoutProps = {
    direction?: TimeInputLayout;
    compact?: boolean;
    wide?: boolean;
    justifyContent?: 'left' | 'center' | 'right';
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
    timeInputLayout?: TimeInputLayoutProps;
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
    maxHours = 23,
    maxMinutes = 59,
    timeInputLabels,
    placeholders,
    timeInputLayout,
}: Props<T>) {
    const { control } = useFormContext<T>();
    const labels = { ...defaultLabels, ...timeInputLabels };
    const direction = timeInputLayout?.direction ?? 'vertical';
    const compact = timeInputLayout?.compact === true;
    const wide = timeInputLayout?.wide === true;
    const justifyContent = timeInputLayout?.justifyContent ?? 'center';

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v as Partial<InputTime>) ?? true : undefined }}
            render={({ field, fieldState }) => {
                const value = (field.value || {}) as Partial<InputTime>;

                const rootClassName = `sif-time-input sif-time-input--${direction}${compact ? ' sif-time-input--compact' : ''}${wide ? ' sif-time-input--wide' : ''} sif-time-input--content-${justifyContent}`;

                return (
                    <Fieldset legend={label} id={name} error={fieldState.error?.message} className={rootClassName}>
                        <HStack
                            gap={compact ? 'space-0' : 'space-4'}
                            align="start"
                            className="sif-time-input__content-wrapper">
                            <div className="sif-time-input__input-wrapper">
                                <TextField
                                    id={`${name}-hours`}
                                    label={labels.hours}
                                    hideLabel
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
                                <span className="sif-time-input__label" aria-hidden="true">
                                    {labels.hours}
                                </span>
                            </div>
                            <div className="sif-time-input__input-wrapper">
                                <TextField
                                    id={`${name}-minutes`}
                                    label={labels.minutes}
                                    hideLabel
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
                                <span className="sif-time-input__label" aria-hidden="true">
                                    {labels.minutes}
                                </span>
                            </div>
                        </HStack>
                        {description ? <BodyShort spacing>{description}</BodyShort> : null}
                    </Fieldset>
                );
            }}
        />
    );
}
