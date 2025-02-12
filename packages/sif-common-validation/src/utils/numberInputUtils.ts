/* Returns a number from a string value, if the string value is a valid number */
export const getNumberFromNumberInputValue = (
    inputValue: string | undefined,
    integerValue?: boolean,
): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number') {
        return inputValue;
    }
    if ((inputValue || '').includes('e')) {
        return undefined;
    }

    const cleanedValue = (inputValue || '').trim();
    const containsCommas = cleanedValue.includes(',');
    const containsDots = cleanedValue.includes('.');

    /** Return undefined if both comma and dots are present  */
    if (containsCommas && containsDots) {
        return undefined;
    }

    /** Return undefined if value contains dots or commas and expected input is an integerValue  */
    if (integerValue && (containsDots || containsCommas)) {
        return undefined;
    }

    /** Return undefined if spaces are present, and they are not in a valid thousand separator format 00 000 000 */
    if (cleanedValue.includes(' ')) {
        const parts = cleanedValue.split(' ');
        /** First part has to contain less than 4 digits */
        if (parts[0].length > 3) {
            return undefined;
        }
        /** All the rest has to contain 3 digits */
        const rest = parts.slice(1);
        if (rest.some((part) => part.length !== 3)) {
            return undefined;
        }
    }

    /** Replace comma with dot, and remove spaces */
    const value = `${cleanedValue}`.replace(/,/g, '.').replace(/\s/g, '');
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
