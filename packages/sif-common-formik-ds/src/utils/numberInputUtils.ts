import { IntlShape } from 'react-intl';

export const getNumberFromNumberInputValue = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number') {
        return inputValue;
    }

    const cleanedValue = (inputValue || '').trim();

    const hasCommas = cleanedValue.includes(',');
    const hasDots = cleanedValue.includes('.');

    if (hasCommas && hasDots) {
        return undefined;
    }

    if (cleanedValue.includes(' ')) {
        const parts = cleanedValue.split(' ');
        if (parts[0].length > 3) {
            return undefined;
        }
        const rest = parts.slice(1);
        if (rest.some((part) => part.length !== 3)) {
            return undefined;
        }
    }

    const value = `${cleanedValue}`.replace(/,/g, '.').replace(/\s/g, '');
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
