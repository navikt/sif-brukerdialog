import React from 'react';
import { getCountries } from '../../utils/countryUtils';
import { TestProps } from '../../types';
import { Select, SelectProps } from '@navikt/ds-react';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';

interface Props extends TestProps, Omit<SelectProps, 'onChange' | 'children'> {
    label: React.ReactNode;
    name: string;
    locale?: string;
    onChange: (countryCode: string) => void;
    showOnlyEuAndEftaCountries?: boolean;
}

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface CountryOptionsCache {
    locale: string;
    options: React.ReactNode[];
}

const createCountryOptions = (onlyEuAndEftaCountries: boolean, locale: string): React.ReactNode[] => {
    const lang = locale === 'en' ? 'nn' : 'nb';
    return getCountries(onlyEuAndEftaCountries, lang).map((country) => (
        <option key={country.alpha3} value={country.alpha3}>
            {country.name}
        </option>
    ));
};

class CountrySelect extends React.Component<Props> {
    countryOptionsCache: CountryOptionsCache | undefined;
    constructor(props: Props) {
        super(props);
        this.getCountryOptions = this.getCountryOptions.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }

    updateCache(locale: string) {
        this.countryOptionsCache = {
            locale,
            options: createCountryOptions(
                this.props.showOnlyEuAndEftaCountries ? this.props.showOnlyEuAndEftaCountries : false,
                locale,
            ),
        };
    }

    getCountryOptions(locale: string): React.ReactNode[] {
        if (!this.countryOptionsCache || locale !== this.countryOptionsCache.locale) {
            this.updateCache(locale);
        }
        return this.countryOptionsCache && this.countryOptionsCache.options ? this.countryOptionsCache.options : [];
    }

    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { onChange, name, showOnlyEuAndEftaCountries, locale, ...restProps } = this.props;
        return (
            <Select
                name={name}
                {...restProps}
                {...inputPropsToRemove}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off">
                <option value="" />
                {this.getCountryOptions(locale || 'nb')}
            </Select>
        );
    }
}

export default CountrySelect;
