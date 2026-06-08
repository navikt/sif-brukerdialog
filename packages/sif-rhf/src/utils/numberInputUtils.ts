import { IntlShape } from 'react-intl';

import { TextFieldFormatter } from '../components/SifTextField';

export const getNumberFromNumberInputValue = (
    inputValue: string | undefined,
    integerValue?: boolean,
): number | undefined => {
    if (inputValue === undefined || inputValue === '') {
        return undefined;
    }
    if (inputValue.includes('e')) {
        return undefined;
    }

    const cleanedValue = inputValue.trim();
    const containsCommas = cleanedValue.includes(',');
    const containsDots = cleanedValue.includes('.');

    if (containsCommas && containsDots) {
        return undefined;
    }
    if (integerValue && (containsDots || containsCommas)) {
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
    return isNaN(numValue) ? undefined : numValue;
};

const getStringForNumberInputValue = (value?: number): string => {
    return value === undefined ? '' : `${value}`.replace(/\./g, ',');
};

export const getNumberInputFormatter = (isIntegerValue: boolean, intl?: IntlShape): TextFieldFormatter => ({
    applyFormatting: (value: string): string => {
        const numValue = getNumberFromNumberInputValue(value, isIntegerValue);
        if (intl) {
            return numValue !== undefined ? intl.formatNumber(numValue).replace(/\s/g, '') : value;
        }
        return numValue !== undefined ? `${numValue}`.replace(/\./g, ',') : value;
    },
    clearFormatting: (value: string): string => {
        const numValue = getNumberFromNumberInputValue(value, isIntegerValue);
        return numValue !== undefined ? getStringForNumberInputValue(numValue) : value;
    },
});
