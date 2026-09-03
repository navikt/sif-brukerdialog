/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, type InitOptions } from '@nais/apm';

export const isDekoratorenException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const frames: any[] = item.payload?.stacktrace?.frames ?? [];
    return frames.some((f) => (f.filename ?? '').includes('personbruker/nav-dekoratoren'));
};

// Nettleseren rapporterer avbrutte/timeout-forespørsler som unhandled rejections vi ikke kan handtere
export const isNoisyUnhandledRejection = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const message: string = item.payload?.message ?? '';
    return (
        message.includes('Non-Error promise rejection captured with value: Request timeout') ||
        message.includes('Non-Error promise rejection captured with value: Request aborted')
    );
};

export const initApm = ({ beforeSend: callerBeforeSend, ...options }: InitOptions): void => {
    init({
        ...options,
        beforeSend: (item: any) => {
            if (isDekoratorenException(item)) return null;
            if (isNoisyUnhandledRejection(item)) return null;
            return callerBeforeSend ? callerBeforeSend(item) : item;
        },
    });
};
