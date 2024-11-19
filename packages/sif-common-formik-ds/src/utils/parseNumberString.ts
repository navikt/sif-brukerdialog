export enum ParseNumberStringError {
    INVALID_NUMBER_FORMAT = 'INVALID_NUMBER_FORMAT',
    INDECISIVE_NUMBER_STRING = 'INDECISIVE_NUMBER_STRING',
}

export const parseNumberString = (value: string | number = '', valueIsBelow1000: boolean = false): number => {
    if (typeof value === 'number') {
        return value;
    }

    // Remove leading and trailing space
    let cleanedValue = value.trim(); //.replace(/\s+/g, '');

    // Contains other characters than digits, commas, spaces and dots
    if (/[^0-9.,\s\-]/.test(cleanedValue)) {
        throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    }

    // Determine if both separators are used
    const hasComma = cleanedValue.includes(',');
    const hasDot = cleanedValue.includes('.');
    const hasSpace = cleanedValue.includes(' ');

    if (hasComma && hasDot) {
        // Determine which character is the decimal separator
        const lastCommaIndex = cleanedValue.lastIndexOf(',');
        const lastDotIndex = cleanedValue.lastIndexOf('.');
        const decimalSeparator = lastCommaIndex > lastDotIndex ? ',' : '.';
        const thousandSeparator = decimalSeparator === ',' ? '.' : ',';
        const integerValue = cleanedValue.split(decimalSeparator)[0];

        if (hasSpace) {
            if (!verifyThousandsSeparatorIsValid(integerValue, ' ')) {
                throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
            }
            cleanedValue = cleanedValue.replace(/\s+/g, '');
        }

        // Verify that all the thousands separators are in the right place
        if (!verifyThousandsSeparatorIsValid(integerValue, thousandSeparator)) {
            throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
        }

        // Replace the thousands separators and convert to number
        const normalizedValue = cleanedValue
            .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
            .replace(decimalSeparator, '.');

        return Number(normalizedValue);
    }

    // If only one separator is present
    if (hasComma || hasDot) {
        const separator = hasComma ? ',' : '.';
        const parts = cleanedValue.split(separator);

        // Remove space from cleanedValue if it's used as a thousands separator
        cleanedValue =
            parts.length === 2 && // only two parts
            cleanedValue.indexOf(' ') < cleanedValue.indexOf(separator) && // Space is before the separator
            verifyThousandsSeparatorIsValid(cleanedValue.split(separator)[0], ' ') // Space is a thousands separator
                ? cleanedValue.replace(/\s+/g, '')
                : cleanedValue;

        if (cleanedValue.includes(' ')) {
            throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
        }

        // More than one separator of the same type, it's probaly a thousands separator
        if (parts.length > 2) {
            if (!verifyThousandsSeparatorIsValid(cleanedValue, separator)) {
                throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
            }
            const normalizedValue = cleanedValue.replace(new RegExp(`\\${separator}`, 'g'), '');
            return Number(normalizedValue);
        }

        // Only one separator of the same type
        const fractionalPart = parts[parts.length - 1];

        // It's a decimal separator since the fractional part has 2 or less digits,
        // or more than 3 digits
        // 100.0, 100.00, 100.1231
        if (fractionalPart.length <= 2 || fractionalPart.length > 3) {
            const normalizedValue = cleanedValue.replace(separator, '.');
            return Number(normalizedValue);
        }
        if (fractionalPart.length === 3 && valueIsBelow1000) {
            const normalizedValue = cleanedValue.replace(separator, '.');
            return Number(normalizedValue);
        }
        // When the deciaml has 3 digits is indecisive if it's a decimal
        // separator or a thousands separator
        throw new Error(ParseNumberStringError.INDECISIVE_NUMBER_STRING);
    }

    // Check if space is used as thoursands separator
    if (cleanedValue.includes(' ')) {
        if (!verifyThousandsSeparatorIsValid(cleanedValue, ' ')) {
            throw new Error(ParseNumberStringError.INVALID_NUMBER_FORMAT);
        }
        cleanedValue = cleanedValue.replace(/\s+/g, '');
    }

    // If no separators are present, just convert to number
    return Number(cleanedValue);
};

/**
 * Verifies the format for the numberString is valid formatted where all separated number groups are 3 digits long except the first one
 * @param value numberString
 * @param separator
 * @returns
 */
const verifyThousandsSeparatorIsValid = (value: string, separator: string): boolean => {
    const parts = value.split(separator);
    if (parts[0].length > 3) {
        return false;
    }
    return parts.slice(1).every((part) => part.length === 3);
};
