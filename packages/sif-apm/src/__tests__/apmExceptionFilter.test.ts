import { describe, expect, it } from 'vitest';

import {
    isAxiosNetworkErrorException,
    isChromeExtensionException,
    isDekoratorenException,
    isOpaqueScriptErrorException,
} from '../initApm';

const exceptionFrom = (filenames: string[]) => ({
    type: 'exception',
    payload: { stacktrace: { frames: filenames.map((filename) => ({ filename })) } },
});

describe('isDekoratorenException', () => {
    it('returnerer true for exception med dekoratør-frame', () => {
        expect(isDekoratorenException(exceptionFrom(['personbruker/nav-dekoratoren/bundle.js']))).toBe(true);
    });

    it('returnerer false for exception uten dekoratør-frame', () => {
        expect(isDekoratorenException(exceptionFrom(['app/bundle.js']))).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isDekoratorenException({ type: 'log', payload: {} })).toBe(false);
    });
});

describe('isChromeExtensionException', () => {
    it('returnerer true for exception med chrome-extension-frame', () => {
        expect(isChromeExtensionException(exceptionFrom(['chrome-extension://extension-id/bundle.js']))).toBe(true);
    });

    it('returnerer false for exception uten chrome-extension-frame', () => {
        expect(isChromeExtensionException(exceptionFrom(['https://app.nav.no/assets/app.js']))).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isChromeExtensionException({ type: 'log', payload: {} })).toBe(false);
    });
});

describe('isAxiosNetworkErrorException', () => {
    it('returnerer true for AxiosError med value Network Error', () => {
        expect(
            isAxiosNetworkErrorException({ type: 'exception', payload: { type: 'AxiosError', value: 'Network Error' } }),
        ).toBe(true);
    });

    it('returnerer false for AxiosError med annen value', () => {
        expect(
            isAxiosNetworkErrorException({
                type: 'exception',
                payload: { type: 'AxiosError', value: 'Request failed with status code 500' },
            }),
        ).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isAxiosNetworkErrorException({ type: 'log', payload: {} })).toBe(false);
    });
});

describe('isOpaqueScriptErrorException', () => {
    it('returnerer true for Error med value Script error.', () => {
        expect(isOpaqueScriptErrorException({ type: 'exception', payload: { type: 'Error', value: 'Script error.' } })).toBe(
            true,
        );
    });

    it('returnerer false for Error med annen value', () => {
        expect(
            isOpaqueScriptErrorException({ type: 'exception', payload: { type: 'Error', value: 'Something else' } }),
        ).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isOpaqueScriptErrorException({ type: 'log', payload: {} })).toBe(false);
    });
});
