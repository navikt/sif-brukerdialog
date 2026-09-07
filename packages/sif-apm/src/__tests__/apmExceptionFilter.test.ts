import { describe, expect, it } from 'vitest';

import { isChromeExtensionException, isDekoratorenException } from '../initApm';

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
