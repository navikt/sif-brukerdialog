import { captureMessage } from '@nais/apm';

const ERROR_PREFIX = 'UNG_ERROR';

export const appLogger = {
    logError: (title: string, payload?: unknown) => {
        captureMessage(`${ERROR_PREFIX} ${title}${payload ? `: ${JSON.stringify(payload)}` : ''}`);
    },
};
