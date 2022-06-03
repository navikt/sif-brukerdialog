import React from 'react';
import { TestProps } from '../../types';
import { SelectProps } from '@navikt/ds-react';
interface Props extends TestProps, Omit<SelectProps, 'onChange' | 'children'> {
    label: React.ReactNode;
    name: string;
    locale?: string;
    onChange: (countryCode: string) => void;
    showOnlyEuAndEftaCountries?: boolean;
    useAlpha3Code?: boolean;
}
export declare type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;
interface CountryOptionsCache {
    locale: string;
    options: React.ReactNode[];
}
declare class CountrySelect extends React.Component<Props> {
    countryOptionsCache: CountryOptionsCache | undefined;
    constructor(props: Props);
    updateCache(locale: string): void;
    getCountryOptions(locale: string): React.ReactNode[];
    render(): JSX.Element;
}
export default CountrySelect;
//# sourceMappingURL=CountrySelect.d.ts.map