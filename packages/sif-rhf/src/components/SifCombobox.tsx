import { ComboboxProps, UNSAFE_Combobox } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<ComboboxProps, 'name' | 'selectedOptions' | 'onToggleSelected'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
};

export function SifCombobox<T extends FieldValues>({ name, validate, ...rest }: Props<T>) {
    const { control } = useFormContext<T>();
    const [inputValue, setInputValue] = useState('');

    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: validate ? (v) => validate(v) ?? true : undefined }}
            render={({ field, fieldState }) => (
                <UNSAFE_Combobox
                    {...rest}
                    id={name}
                    error={fieldState.error?.message}
                    selectedOptions={field.value ? [field.value] : []}
                    onToggleSelected={(val) => {
                        if (field.value === val) {
                            setInputValue('');
                            field.onChange('');
                        } else {
                            setInputValue(val);
                            field.onChange(val);
                        }
                    }}
                    onChange={(val) => setInputValue(val)}
                    value={inputValue}
                />
            )}
        />
    );
}
