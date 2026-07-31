/* eslint-disable no-console */

/**
 * Logger til console.error med UNG_ERROR-prefiks.
 * Faro fanger automatisk opp console.error, så dette er tilsiktet Faro-logging.
 */
const ERROR_PREFIX = 'UNG_ERROR';

export const logFaroError = (title: string, error?: string) => {
    console.error(`${ERROR_PREFIX} ${title}`, error);
};
