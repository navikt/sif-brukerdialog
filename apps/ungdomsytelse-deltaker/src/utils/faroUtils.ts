import { captureMessage } from '@nais/apm';

const ERROR_PREFIX = 'UNG_ERROR';

export const logFaroError = (title: string, error?: string) => {
    // Sender strukturert feilmelding til APM — ingen sensitiv data, kun kontekst og statuskoder
    captureMessage(`${ERROR_PREFIX} ${title}${error ? `: ${error}` : ''}`);
    // eslint-disable-next-line no-console
    console.error(`${ERROR_PREFIX} ${title}`, error);
};
