export const normalizeNumberString = (value: string | number = ''): string => {
    if (typeof value === 'number') {
        return value.toString();
    }
    // Remove all non-digit characters except for commas and dots
    const cleanedValue = value.trim();

    // Determine if both separators are used
    const hasComma = cleanedValue.includes(',');
    const hasDot = cleanedValue.includes('.');

    if (hasComma && hasDot) {
        // Determine which character is the decimal separator
        const lastCommaIndex = cleanedValue.lastIndexOf(',');
        const lastDotIndex = cleanedValue.lastIndexOf('.');
        const decimalSeparator = lastCommaIndex > lastDotIndex ? ',' : '.';
        const thousandSeparator = decimalSeparator === ',' ? '.' : ',';

        // Replace the thousands separators and convert to number
        const normalizedValue = cleanedValue
            .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
            .replace(decimalSeparator, '.');

        return normalizedValue;
    }

    // If only one separator is present
    if (hasComma || hasDot) {
        const separator = hasComma ? ',' : '.';
        const parts = cleanedValue.split(separator);

        // More than one separator of the same type, it's probaly a thousands separator
        if (parts.length > 2) {
            if (parts[0].length > 3) {
                // ex: 1000,000.0
                throw new Error('Invalid number format');
            }
            for (let i = 1; i < parts.length; i++) {
                if (parts[i].length !== 3) {
                    throw new Error('Invalid number format');
                }
            }
            const normalizedValue = cleanedValue.replace(new RegExp(`\\${separator}`, 'g'), '');
            return normalizedValue;
        }

        // Only one separator of the same type
        const fractionalPart = parts[parts.length - 1];

        // It's a decimal separator since the fractional part has 2 or less digits,
        // or more than 3 digits
        // 100.0, 100.00, 100.1231
        if (fractionalPart.length <= 2 || fractionalPart.length > 3) {
            const normalizedValue = cleanedValue.replace(separator, '.');
            return normalizedValue;
        }
        // When the deciaml has 3 digits is indecisive if it's a decimal
        // separator or a thousands separator
        throw new Error('Invalid number format');
    }

    // If no separators are present, just convert to number
    return cleanedValue;
};
