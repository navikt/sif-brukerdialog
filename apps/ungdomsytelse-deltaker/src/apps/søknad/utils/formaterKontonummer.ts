const inneholderKunTall = (value: string): boolean => {
    return /^[0-9]+$/.test(value);
};

export const formaterKontonummer = (value?: string): string => {
    if (!value || !inneholderKunTall(value) || value.length !== 11) {
        return value || '';
    }
    return `${value.slice(0, 4)} ${value.slice(4, 6)} ${value.slice(6)}`;
};
