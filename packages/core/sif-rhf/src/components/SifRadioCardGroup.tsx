import { HGrid, RadioGroupProps, RadioProps } from '@navikt/ds-react';
import { RadioCard, RadioCardGroup } from '@navikt/ds-react/PREVIEW';
import { ReactNode } from 'react';
import { Controller, ControllerRenderProps, FieldValues, Path, useFormContext } from 'react-hook-form';

export type SifRadioCardProp = Omit<RadioProps, 'children' | 'name'> & {
    label: ReactNode;
};

type Props<T extends FieldValues> = Omit<RadioGroupProps, 'name' | 'onChange' | 'children'> & {
    name: Path<T>;
    radios: SifRadioCardProp[];
    horizontal?: boolean;
    validate?: (value: string) => string | undefined;
};

export function SifRadioCardGroup<T extends FieldValues>({ name, radios, validate, horizontal, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    const renderRadios = (field: ControllerRenderProps<T, Path<T>>) =>
        radios.map(({ label, value, onChange, onBlur, ...radioRest }) => (
            <RadioCard
                data-color="info"
                key={value as string}
                {...radioRest}
                value={value}
                name={field.name}
                onChange={(evt) => {
                    field.onChange(evt.target.value);
                    onChange?.(evt);
                }}
                onBlur={(evt) => {
                    field.onBlur();
                    onBlur?.(evt);
                }}>
                {label}
            </RadioCard>
        ));

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <RadioCardGroup
                    {...rest}
                    name={field.name}
                    id={name}
                    value={field.value || ''}
                    error={fieldState.error?.message}>
                    {horizontal ? (
                        <HGrid marginBlock="space-4 space-16" columns={{ xs: 1, md: 2 }}>
                            {renderRadios(field)}
                        </HGrid>
                    ) : (
                        <>{renderRadios(field)}</>
                    )}
                </RadioCardGroup>
            )}
        />
    );
}
