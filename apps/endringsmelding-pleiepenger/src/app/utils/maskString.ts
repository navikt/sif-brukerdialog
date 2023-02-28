import { padEnd } from 'lodash';

export const maskString = (value: string | undefined, minStringLength = 5): string | undefined => {
    if (!value || value.length < minStringLength) {
        return undefined;
    }
    const length = value.length;
    const start = value.substring(0, Math.floor(length / 2));
    return padEnd(`${start}`, length, '*');
};
