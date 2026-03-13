/* eslint-disable no-console */
const ERROR_PREFIX = 'AKTIVITETSPENGER_ERROR';

export const logFaroError = (title: string, error?: string) => {
    console.error(`${ERROR_PREFIX} ${title}`, error);
};
