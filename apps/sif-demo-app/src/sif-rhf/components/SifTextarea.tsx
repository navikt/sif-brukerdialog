import { Textarea, TextareaProps } from '@navikt/ds-react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<TextareaProps, 'name' | 'defaultValue'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
};

export function SifTextarea<T extends FieldValues>({ name, validate, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <Textarea
                    {...rest}
                    {...field}
                    id={name}
                    value={field.value || ''}
                    error={fieldState.error?.message}
                    autoComplete="off"
                    onChange={(evt) => field.onChange(evt.target.value)}
                />
            )}
        />
    );
}
