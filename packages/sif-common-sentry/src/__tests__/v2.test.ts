import type { ErrorEvent } from '@sentry/browser';
import { afterEach, describe, expect, it } from 'vitest';

import { isRedirectingToLogin, scrubEvent, scrubUrl, setRedirectingToLogin } from '../v2';

afterEach(() => {
    // Reset singleton-flagget mellom tester
    (globalThis as any).__sif_redirectingToLogin = false;
});

describe('scrubUrl', () => {
    it('erstatter numerisk path-segment med [id]', () => {
        expect(scrubUrl('/soknad/12345/steg')).toBe('/soknad/[id]/steg');
    });

    it('erstatter numerisk segment på slutten av url', () => {
        expect(scrubUrl('/soknad/12345')).toBe('/soknad/[id]');
    });

    it('erstatter flere numeriske segmenter', () => {
        expect(scrubUrl('/soknad/123/steg/456')).toBe('/soknad/[id]/steg/[id]');
    });

    it('beholder ikke-numeriske segmenter', () => {
        expect(scrubUrl('/soknad/abc/steg')).toBe('/soknad/abc/steg');
    });

    it('håndterer full URL', () => {
        expect(scrubUrl('https://www.nav.no/soknad/99999/steg')).toBe('https://www.nav.no/soknad/[id]/steg');
    });
});

describe('scrubEvent', () => {
    it('scrubber request.url', () => {
        const event = { request: { url: 'https://nav.no/soknad/123/steg' } } as ErrorEvent;
        const result = scrubEvent(event);
        expect(result.request?.url).toBe('https://nav.no/soknad/[id]/steg');
    });

    it('scrubber transaction', () => {
        const event = { transaction: '/soknad/456/oppsummering' } as ErrorEvent;
        const result = scrubEvent(event);
        expect(result.transaction).toBe('/soknad/[id]/oppsummering');
    });

    it('scrubber breadcrumb url, from og to', () => {
        const event = {
            breadcrumbs: [{ data: { url: '/soknad/789', from: '/soknad/789', to: '/soknad/789/steg' } }],
        } as unknown as ErrorEvent;
        const result = scrubEvent(event);
        expect(result.breadcrumbs![0].data!.url).toBe('/soknad/[id]');
        expect(result.breadcrumbs![0].data!.from).toBe('/soknad/[id]');
        expect(result.breadcrumbs![0].data!.to).toBe('/soknad/[id]/steg');
    });

    it('scrubber request.headers.Referer', () => {
        const event = {
            request: { headers: { Referer: 'https://nav.no/soknad/321/steg' } },
        } as unknown as ErrorEvent;
        const result = scrubEvent(event);
        expect(result.request?.headers?.Referer).toBe('https://nav.no/soknad/[id]/steg');
    });

    it('endrer ikke event uten numeriske segmenter', () => {
        const event = {
            request: { url: 'https://nav.no/soknad/omsorgspengesoknad/steg' },
            transaction: '/soknad/omsorgspengesoknad/steg',
        } as ErrorEvent;
        const result = scrubEvent(event);
        expect(result.request?.url).toBe('https://nav.no/soknad/omsorgspengesoknad/steg');
        expect(result.transaction).toBe('/soknad/omsorgspengesoknad/steg');
    });
});

describe('setRedirectingToLogin / isRedirectingToLogin', () => {
    it('er false som standard', () => {
        expect(isRedirectingToLogin()).toBe(false);
    });

    it('blir true etter setRedirectingToLogin()', () => {
        setRedirectingToLogin();
        expect(isRedirectingToLogin()).toBe(true);
    });
});
