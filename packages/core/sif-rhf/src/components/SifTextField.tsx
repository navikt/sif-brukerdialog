import { TextField, TextFieldProps } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type TextFieldFormatter = {
    applyFormatting: (value: string) => string;
    clearFormatting: (value: string) => string;
};

type Props<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
    formatter?: TextFieldFormatter;
};

export function SifTextField<T extends FieldValues>({ name, validate, formatter, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();
    const [hasFocus, setHasFocus] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <TextField
                    {...rest}
                    {...field}
                    id={name}
                    value={formatter && !hasFocus ? formatter.applyFormatting(field.value || '') : (field.value ?? '')}
                    error={fieldState.error?.message}
                    onBlur={(e) => {
                        if (formatter) {
                            field.onChange(formatter.applyFormatting(field.value || ''));
                        }
                        setHasFocus(false);
                        field.onBlur();
                        rest.onBlur?.(e);
                    }}
                    onFocus={(e) => {
                        if (formatter) {
                            field.onChange(formatter.clearFormatting(field.value || ''));
                        }
                        setHasFocus(true);
                        rest.onFocus?.(e);
                    }}
                />
            )}
        />
    );
}
