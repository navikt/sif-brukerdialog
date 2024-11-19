import { parseNumberString } from './parseNumberString';

export const getNumberFromStringInput = (
    inputValue: string | undefined,
    valueIsBelow1000?: boolean,
): number | undefined => {
    if (
        inputValue === undefined ||
        inputValue === '' ||
        Array.isArray(inputValue) ||
        (typeof inputValue === 'number' && isNaN(inputValue))
    ) {
        return undefined;
    }
    const numValue = parseNumberString(inputValue, valueIsBelow1000);
    return isNaN(numValue) ? undefined : numValue;
};
