import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type SifCheckboxProp = Omit<CheckboxProps, 'children' | 'name' | 'checked'> & {
    label: ReactNode;
};

type Props<T extends FieldValues> = Omit<CheckboxGroupProps, 'name' | 'onChange' | 'value' | 'children'> & {
    name: Path<T>;
    checkboxes: SifCheckboxProp[];
    validate?: (value: string[]) => string | undefined;
};

export const toArray = (value: unknown): string[] => {
    if (value === undefined || value === null) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    return [];
};

export function SifCheckboxGroup<T extends FieldValues>({ name, checkboxes, validate, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(toArray(v)) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <CheckboxGroup
                    {...rest}
                    id={name}
                    value={toArray(field.value)}
                    error={fieldState.error?.message}
                    onChange={(value) => field.onChange(value)}>
                    {checkboxes.map(({ value, label, ...cbRest }, index) => (
                        <Checkbox key={`${name}_${value || index}`} {...cbRest} name={name} value={value}>
                            {label}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            )}
        />
    );
}
