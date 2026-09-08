/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, type InitOptions } from '@nais/apm';

export const isDekoratorenException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const frames: any[] = item.payload?.stacktrace?.frames ?? [];
    return frames.some((f) => (f.filename ?? '').includes('personbruker/nav-dekoratoren'));
};

export const isChromeExtensionException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const frames: any[] = item.payload?.stacktrace?.frames ?? [];
    return frames.some((f) => (f.filename ?? '').startsWith('chrome-extension://'));
};

// Nettleseren rapporterer avbrutte/timeout-forespørsler som unhandled rejections vi ikke kan håndtere
export const isNoisyUnhandledRejection = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const message: string = item.payload?.message ?? '';
    return (
        message.includes('Non-Error promise rejection captured with value: Request timeout') ||
        message.includes('Non-Error promise rejection captured with value: Request aborted')
    );
};

// Axios sin generiske "Network Error" oppstår ved tapt nettverk/CORS-blokkering på klienten og gir ingen handlingsrom
export const isAxiosNetworkErrorException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    return item.payload?.type === 'AxiosError' && item.payload?.value === 'Network Error';
};

// Nettleseren skjuler feildetaljer fra skript lastet cross-origin uten CORS-headere bak "Script error." - uten stacktrace er den ikke handlingsbar
export const isOpaqueScriptErrorException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    return item.payload?.type === 'Error' && item.payload?.value === 'Script error.';
};

export const initApm = ({ beforeSend: callerBeforeSend, ...options }: InitOptions): void => {
    init({
        ...options,
        beforeSend: (item: any) => {
            if (isDekoratorenException(item)) return null;
            if (isChromeExtensionException(item)) return null;
            if (isNoisyUnhandledRejection(item)) return null;
            if (isAxiosNetworkErrorException(item)) return null;
            if (isOpaqueScriptErrorException(item)) return null;
            return callerBeforeSend ? callerBeforeSend(item) : item;
        },
    });
};
