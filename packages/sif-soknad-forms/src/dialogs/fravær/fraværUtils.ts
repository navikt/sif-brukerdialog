export const toMaybeNumber = (value: string | undefined): number | undefined => {
    if (value && typeof value === 'string') {
        return parseFloat(value);
    }
    return undefined;
};
