/* eslint-disable no-console */
const ERROR_PREFIX = 'UNG_ERROR';

export const logFaroError = (title: string, error?: any) => {
    console.error(`${ERROR_PREFIX} ${title}`, error);
};
