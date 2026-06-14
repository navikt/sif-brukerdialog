import * as Sentry from '@sentry/react';

const dekoratorenTimeoutPatterns = ['Request timeout', 'dekoratoren'];

export const isErrorFromDekoratøren = (event: Sentry.ErrorEvent): boolean => {
    const values = event.exception?.values ?? [];
    const frames = values.flatMap((v) => v.stacktrace?.frames ?? []);
    if (frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'))) {
        return true;
    }
    const firstValue = values[0];
    if (firstValue?.type === 'UnhandledRejection') {
        const message = firstValue.value ?? '';
        if (dekoratorenTimeoutPatterns.some((pattern) => message.includes(pattern))) {
            return true;
        }
    }
    return false;
};

export const beforeSendFilter = (event: Sentry.ErrorEvent): Sentry.ErrorEvent | null => {
    if (isErrorFromDekoratøren(event)) {
        return null;
    }
    return event;
};
