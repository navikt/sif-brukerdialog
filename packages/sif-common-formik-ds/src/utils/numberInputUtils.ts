import { IntlShape } from 'react-intl';

export const getNumberFromNumberInputValue = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    if (inputValue.includes('.')) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/,/g, '.').replace(/\s/g, '');
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};

export const getStringForNumberInputValue = (value?: number): string => {
    return value === undefined ? '' : `${value}`.replace(/\./g, ',');
};

export const getNumberInputFormatter =
    (intl: IntlShape) =>
    (value: string): string => {
        const numValue = getNumberFromNumberInputValue(value);
        return numValue !== undefined ? intl.formatNumber(numValue) : value;
    };

export const getNumberInputUnformatter =
    () =>
    (value: string): string => {
        console.log('sdf');
        const numValue = getNumberFromNumberInputValue(value);
        return numValue !== undefined ? `${numValue}`.replace('.', ',').replace(' ', '') : value;
    };
