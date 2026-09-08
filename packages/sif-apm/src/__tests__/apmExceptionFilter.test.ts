import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    type AppOwnership,
    isForeignCodeException,
    isKnownNoisyException,
    isNoiseException,
    setAppOwnership,
} from '../initApm';

const OWNERSHIP: AppOwnership = { app: 'omsorgspengesoknad', namespace: 'dusseldorf' };

const APP_BUNDLE = 'https://cdn.nav.no/dusseldorf/omsorgspengesoknad/dist/assets/index-a1b2c3.js';

beforeEach(() => {
    setAppOwnership(OWNERSHIP);
});

const exceptionFrom = (filenames: string[]) => ({
    type: 'exception',
    payload: { stacktrace: { frames: filenames.map((filename) => ({ filename })) } },
});

describe('isForeignCodeException', () => {
    it('beholder feil med frame fra egen bundle', () => {
        expect(isForeignCodeException(exceptionFrom([APP_BUNDLE]))).toBe(false);
    });

    it('beholder feil der bare én av flere frames er vår', () => {
        expect(isForeignCodeException(exceptionFrom(['chrome-extension://abc/inject.js', APP_BUNDLE]))).toBe(false);
    });

    it('filtrerer nettleserutvidelser uavhengig av scheme', () => {
        expect(isForeignCodeException(exceptionFrom(['chrome-extension://abc/inject.js']))).toBe(true);
        expect(isForeignCodeException(exceptionFrom(['moz-extension://abc/inject.js']))).toBe(true);
        expect(isForeignCodeException(exceptionFrom(['safari-web-extension://abc/inject.js']))).toBe(true);
    });

    it('filtrerer injiserte inline-skript som rapporterer dokument-URL', () => {
        expect(
            isForeignCodeException(
                exceptionFrom(['https://www.nav.no/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen']),
            ),
        ).toBe(true);
    });

    it('filtrerer dekoratøren og andre tredjepartsskript på samme CDN', () => {
        expect(
            isForeignCodeException(exceptionFrom(['https://cdn.nav.no/personbruker/nav-dekoratoren/public/bundle.js'])),
        ).toBe(true);
        expect(
            isForeignCodeException(exceptionFrom(['https://cdn.nav.no/team-researchops/sporing/sporing.js'])),
        ).toBe(true);
    });

    it('filtrerer ukjente tredjepartsskript uten at de står på en liste', () => {
        expect(isForeignCodeException(exceptionFrom(['https://third-party.example/widget.js']))).toBe(true);
        expect(isForeignCodeException(exceptionFrom(['https://cdn.nav.no/et-annet-team/ny-widget/bundle.js']))).toBe(
            true,
        );
    });

    it('filtrerer en annen app i samme namespace', () => {
        expect(
            isForeignCodeException(exceptionFrom(['https://cdn.nav.no/dusseldorf/en-annen-app/dist/index.js'])),
        ).toBe(true);
    });

    it('krever eksakt app-segment, ikke bare prefiks', () => {
        expect(
            isForeignCodeException(
                exceptionFrom(['https://cdn.nav.no/dusseldorf/omsorgspengesoknad-v2/dist/index.js']),
            ),
        ).toBe(true);
    });

    it('ignorerer query og hash når filtype vurderes', () => {
        expect(isForeignCodeException(exceptionFrom([`${APP_BUNDLE}?v=123`]))).toBe(false);
    });

    it('returnerer false når stacktrace mangler, slik at lag 2 avgjør', () => {
        expect(isForeignCodeException({ type: 'exception', payload: { value: 'Script error.' } })).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isForeignCodeException({ type: 'log', payload: {} })).toBe(false);
    });

    it('slår seg av (fail-open) når eierskap ikke er etablert', async () => {
        vi.resetModules();
        const uninitialised = await import('../initApm');
        expect(uninitialised.isForeignCodeException(exceptionFrom(['chrome-extension://abc/inject.js']))).toBe(false);
    });
});

describe('isKnownNoisyException', () => {
    it('filtrerer avbrutte og timede unhandled rejections', () => {
        expect(
            isKnownNoisyException({
                type: 'exception',
                payload: { message: 'Non-Error promise rejection captured with value: Request timeout' },
            }),
        ).toBe(true);
        expect(
            isKnownNoisyException({
                type: 'exception',
                payload: { message: 'Non-Error promise rejection captured with value: Request aborted' },
            }),
        ).toBe(true);
    });

    it('filtrerer Axios Network Error', () => {
        expect(isKnownNoisyException({ type: 'exception', payload: { type: 'AxiosError', value: 'Network Error' } })).toBe(
            true,
        );
    });

    it('beholder andre Axios-feil', () => {
        expect(
            isKnownNoisyException({
                type: 'exception',
                payload: { type: 'AxiosError', value: 'Request failed with status code 500' },
            }),
        ).toBe(false);
    });

    it('filtrerer opak "Script error."', () => {
        expect(isKnownNoisyException({ type: 'exception', payload: { type: 'Error', value: 'Script error.' } })).toBe(true);
    });

    it('beholder legitim app-feil', () => {
        expect(
            isKnownNoisyException({
                type: 'exception',
                payload: { type: 'TypeError', value: "Cannot read properties of undefined (reading 'foo')" },
            }),
        ).toBe(false);
    });

    it('returnerer false for ikke-exception', () => {
        expect(isKnownNoisyException({ type: 'log', payload: {} })).toBe(false);
    });
});

describe('isNoiseException', () => {
    it('fanger både fremmed kode og kjente støymønstre', () => {
        expect(isNoiseException(exceptionFrom(['chrome-extension://abc/inject.js']))).toBe(true);
        expect(isNoiseException({ type: 'exception', payload: { type: 'Error', value: 'Script error.' } })).toBe(true);
    });

    it('beholder legitim feil fra egen bundle', () => {
        expect(
            isNoiseException({
                type: 'exception',
                payload: {
                    type: 'TypeError',
                    value: "Cannot read properties of undefined (reading 'foo')",
                    stacktrace: { frames: [{ filename: APP_BUNDLE }] },
                },
            }),
        ).toBe(false);
    });
});

describe('regresjon: ekte app-feil skal aldri filtreres', () => {
    beforeEach(() => {
        setAppOwnership({ app: 'endringsmelding-pleiepenger', namespace: 'dusseldorf' });
    });

    // Faktisk feil fra endringsmelding-pleiepenger i prod. Frames er sourcemap-oppløst til .ts,
    // og flere frames er runtime-interne (<anonymous>, Promise.all).
    const verifyK9FormatBarnException = {
        type: 'exception',
        payload: {
            type: 'Error',
            value: 'verifyK9FormatBarn',
            stacktrace: {
                frames: [
                    {
                        filename:
                            'https://cdn.nav.no/dusseldorf/endringsmelding-pleiepenger/src/app/utils/verifyk9Format.ts',
                    },
                    {
                        filename:
                            'https://cdn.nav.no/dusseldorf/endringsmelding-pleiepenger/src/app/api/endpoints/sakerEndpoint.ts',
                    },
                    { filename: '<anonymous>' },
                    { filename: 'index 1' },
                    {
                        filename:
                            'https://cdn.nav.no/dusseldorf/endringsmelding-pleiepenger/src/app/api/fetchInitialData.ts',
                    },
                ],
            },
        },
    };

    it('beholder feilen uansett hvilket lag som vurderer den', () => {
        expect(isForeignCodeException(verifyK9FormatBarnException)).toBe(false);
        expect(isKnownNoisyException(verifyK9FormatBarnException)).toBe(false);
        expect(isNoiseException(verifyK9FormatBarnException)).toBe(false);
    });

    it('beholder minifisert variant av samme feil', () => {
        expect(
            isNoiseException({
                ...verifyK9FormatBarnException,
                payload: {
                    ...verifyK9FormatBarnException.payload,
                    stacktrace: {
                        frames: [
                            { filename: 'https://cdn.nav.no/dusseldorf/endringsmelding-pleiepenger/dist/assets/index-a1b2.js' },
                            { filename: '<anonymous>' },
                        ],
                    },
                },
            }),
        ).toBe(false);
    });
});
