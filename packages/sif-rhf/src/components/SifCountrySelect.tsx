import { Select, SelectProps } from '@navikt/ds-react';
import { useMemo } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getCountries } from '../utils/countryUtils';

type Props<T extends FieldValues> = Omit<SelectProps, 'name' | 'children'> & {
    name: Path<T>;
    validate?: (value: string) => string | undefined;
    showOnlyEuAndEftaCountries?: boolean;
};

const getLangToUse = (locale: string) => {
    if (locale === 'en') return 'nb';
    if (locale === 'nn') return 'nn';
    return 'nb';
};

export function SifCountrySelect<T extends FieldValues>({
    name,
    validate,
    showOnlyEuAndEftaCountries = false,
    ...rest
}: Props<T>) {
    const { control } = useFormContext<T>();
    const intl = useIntl();

    const options = useMemo(() => {
        return getCountries(showOnlyEuAndEftaCountries, getLangToUse(intl.locale));
    }, [intl.locale, showOnlyEuAndEftaCountries]);

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
                    autoComplete="off"
                    onChange={(evt) => field.onChange(evt.target.value)}>
                    <option value="" />
                    {options.map((country) => (
                        <option key={country.alpha3} value={country.alpha3}>
                            {country.name}
                        </option>
                    ))}
                </Select>
            )}
        />
    );
}
