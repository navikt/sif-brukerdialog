import { BodyShort, Radio, RadioGroup, RadioGroupProps, RadioProps, Stack } from '@navikt/ds-react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type SifRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
};

type Props<T extends FieldValues> = Omit<RadioGroupProps, 'name' | 'onChange' | 'children'> & {
    name: Path<T>;
    radios: SifRadioProp[];
    validate?: (value: string) => string | undefined;
    afterOnChange?: (newValue: string) => void;
    renderHorizontal?: boolean;
};

export function SifRadioGroup<T extends FieldValues>({
    name,
    radios,
    validate,
    afterOnChange,
    renderHorizontal,
    description,
    ...rest
}: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => {
                const radioElements = radios.map((rb, idx) => {
                    const { label, ...radioRest } = rb;
                    return (
                        <Radio
                            key={idx}
                            {...radioRest}
                            name={field.name}
                            onChange={(evt) => {
                                field.onChange(evt.target.value);
                                afterOnChange?.(evt.target.value);
                            }}>
                            {label}
                        </Radio>
                    );
                });

                return (
                    <RadioGroup
                        {...rest}
                        name={field.name}
                        id={name}
                        value={field.value || ''}
                        error={fieldState.error?.message}
                        description={description ? <BodyShort as="div">{description}</BodyShort> : undefined}>
                        {renderHorizontal ? (
                            <Stack gap="space-0 space-24" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                                {radioElements}
                            </Stack>
                        ) : (
                            radioElements
                        )}
                    </RadioGroup>
                );
            }}
        />
    );
}
