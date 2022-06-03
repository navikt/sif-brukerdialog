import React from 'react';
import { getCountries } from '../../utils/countryUtils';
import { TestProps } from '../../types';
import { Select, SelectProps } from '@navikt/ds-react';

interface Props extends TestProps, Omit<SelectProps, 'onChange' | 'children'> {
    label: React.ReactNode;
    name: string;
    locale?: string;
    onChange: (countryCode: string) => void;
    showOnlyEuAndEftaCountries?: boolean;
    useAlpha3Code?: boolean;
}

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface CountryOptionsCache {
    locale: string;
    options: React.ReactNode[];
}

const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
            case 'BE':
            case 'BG':
            case 'DK':
            case 'EE':
            case 'FI':
            case 'FR':
            case 'GR':
            case 'IE':
            case 'IS':
            case 'IT':
            case 'HR':
            case 'CY':
            case 'LV':
            case 'LI':
            case 'LT':
            case 'LU':
            case 'MT':
            case 'NL':
            case 'PL':
            case 'PT':
            case 'RO':
            case 'SK':
            case 'SI':
            case 'ES':
            case 'GB':
            case 'SE':
            case 'CZ':
            case 'DE':
            case 'HU':
            case 'AT':
            case 'CH':
                return true;
            default:
                return false;
        }
    } else {
        // Filter ut Antarktis
        return countryOptionValue !== 'AQ';
    }
};

const createCountryOptions = (
    onluEuAndEftaCountries: boolean,
    locale: string,
    useAlpha3Code = true
): React.ReactNode[] => {
    const lang = locale === 'en' ? 'nn' : 'nb';
    const countries = getCountries();

    const names: [string, any][] = Object.entries(countries.getNames(lang));
    return names
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], lang))
        .filter((countryOptionValue: string[]) =>
            filteredListEØSCountries(countryOptionValue[0], onluEuAndEftaCountries)
        )
        .map((countryOptionValue: string[]) => (
            <option
                key={countryOptionValue[0]}
                value={useAlpha3Code ? countries.alpha2ToAlpha3(countryOptionValue[0]) : countryOptionValue[0]}>
                {countryOptionValue[1]}
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
                this.props.useAlpha3Code
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
        const { onChange, name, showOnlyEuAndEftaCountries, locale, useAlpha3Code, ...restProps } = this.props;
        return (
            <Select name={name} {...restProps} onChange={(e) => onChange(e.target.value)} autoComplete="off">
                <option value="" />
                {this.getCountryOptions(locale || 'nb')}
            </Select>
        );
    }
}

export default CountrySelect;
