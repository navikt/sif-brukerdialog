import { BodyShort, Radio, RadioGroup, RadioGroupProps, RadioProps } from '@navikt/ds-react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type SifRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
};

type Props<T extends FieldValues> = Omit<RadioGroupProps, 'name' | 'onChange' | 'children'> & {
    name: Path<T>;
    radios: SifRadioProp[];
    validate?: (value: string) => string | undefined;
};

export function SifRadioGroup<T extends FieldValues>({ name, radios, validate, description, ...rest }: Props<T>) {
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
                    error={fieldState.error?.message}
                    description={description ? <BodyShort as="div">{description}</BodyShort> : undefined}>
                    {radios.map((rb, idx) => {
                        const { label, ...radioRest } = rb;
                        return (
                            <Radio
                                key={idx}
                                {...radioRest}
                                name={field.name}
                                onChange={(evt) => field.onChange(evt.target.value)}>
                                {label}
                            </Radio>
                        );
                    })}
                </RadioGroup>
            )}
        />
    );
}
