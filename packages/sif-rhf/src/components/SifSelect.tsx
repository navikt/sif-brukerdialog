import { Select, SelectProps } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<SelectProps, 'name'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
    children: ReactNode;
};

export function SifSelect<T extends FieldValues>({ name, validate, children, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <Select
                    {...rest}
                    {...field}
                    id={name}
                    value={field.value ?? ''}
                    error={fieldState.error?.message}
                    autoComplete="off">
                    {children}
                </Select>
            )}
        />
    );
}
