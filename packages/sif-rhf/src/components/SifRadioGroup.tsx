import { Radio, RadioGroup, RadioGroupProps, RadioProps } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type SifRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: ReactNode;
};

type Props<T extends FieldValues> = Omit<RadioGroupProps, 'name' | 'onChange' | 'children'> & {
    name: Path<T>;
    radios: SifRadioProp[];
    validate?: (value: string) => string | undefined;
};

export function SifRadioGroup<T extends FieldValues>({ name, radios, validate, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <RadioGroup
                    {...rest}
                    name={field.name}
                    id={name}
                    value={field.value || ''}
                    error={fieldState.error?.message}>
                    {radios.map(({ label, value, ...radioRest }) => (
                        <Radio
                            key={value as string}
                            {...radioRest}
                            value={value}
                            name={field.name}
                            onChange={(evt) => field.onChange(evt.target.value)}>
                            {label}
                        </Radio>
                    ))}
                </RadioGroup>
            )}
        />
    );
}
