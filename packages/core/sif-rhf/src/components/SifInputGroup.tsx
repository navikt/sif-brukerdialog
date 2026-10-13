import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { FieldValues, get, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<FieldsetProps, 'name' | 'children'> & {
    name: Path<T>;
    children: ReactNode;
};

export function SifInputGroup<T extends FieldValues>({ name, id, children, ...rest }: Props<T>) {
    const {
        formState: { errors },
    } = useFormContext<T>();

    const error = get(errors, name)?.message as string | undefined;

    return (
        <Fieldset {...rest} id={id || String(name)} error={error} tabIndex={id ? -1 : undefined}>
            {children}
        </Fieldset>
    );
}
