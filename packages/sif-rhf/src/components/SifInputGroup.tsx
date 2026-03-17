import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<FieldsetProps, 'name' | 'children'> & {
    name: Path<T>;
    children: ReactNode;
    validate?: (value: any) => string | undefined;
};

export function SifInputGroup<T extends FieldValues>({ name, validate, id, children, ...rest }: Props<T>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<T>();

    const { ref } = register(name, { validate: validate ? (v) => validate(v) ?? true : undefined });
    const error = errors[name]?.message as string | undefined;

    return (
        <Fieldset {...rest} id={id || name} ref={ref} error={error} tabIndex={id ? -1 : undefined}>
            {children}
        </Fieldset>
    );
}
