import { Checkbox, CheckboxProps, ErrorMessage } from '@navikt/ds-react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<CheckboxProps, 'name' | 'checked' | 'onChange'> & {
    name: Path<T>;
    validate?: (value: boolean) => string | undefined;
    afterOnChange?: (value: boolean) => void;
};

export function SifCheckbox<T extends FieldValues>({ name, validate, afterOnChange, children, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(!!v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <>
                    <Checkbox
                        {...rest}
                        name={field.name}
                        id={name}
                        checked={!!field.value}
                        error={!!fieldState.error}
                        onChange={(evt) => {
                            field.onChange(evt.target.checked);
                            afterOnChange?.(evt.target.checked);
                        }}>
                        {children}
                    </Checkbox>
                    {fieldState.error?.message && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
                </>
            )}
        />
    );
}
