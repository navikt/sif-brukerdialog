import type { ErrorEvent } from '@sentry/browser';

import { beforeSendFilter, SentryEnvironment, setSentryEnvironment, setupIgnoreErrorsAndAllowUrls } from '../';

describe('routeUtils', () => {
    it('sentry environment is set correctly', () => {
        expect(setSentryEnvironment('localhost:8080')).toEqual(SentryEnvironment.LOCALHOST);
        expect(setSentryEnvironment('www-q0.nav.no')).toEqual(SentryEnvironment.q);
        expect(setSentryEnvironment('www.nav.no')).toEqual(SentryEnvironment.prod);
        expect(setSentryEnvironment('www.asdf.gh')).toEqual(SentryEnvironment.hostUndefined);
    });
});

describe('setupIgnoreErrorsAndAllowUrls', () => {
    it('returns correctly when no undefined initValues', () => {
        const { allowUrls, ignoreErrors } = setupIgnoreErrorsAndAllowUrls({});
        expect(allowUrls).toBeDefined();
        expect(ignoreErrors).toBeDefined();
    });
    it('handles invalid parameters', () => {
        const { allowUrls, ignoreErrors } = setupIgnoreErrorsAndAllowUrls({
            ignoreErrors: 'abc' as any,
            allowUrls: 'abc' as any,
        });
        expect(allowUrls).toBeDefined();
        expect(ignoreErrors).toBeDefined();
    });
});

describe('beforeSendFilter', () => {
    it('filtrerer bort feil fra nav.no/dekoratoren', () => {
        const event = {
            exception: {
                values: [
                    {
                        stacktrace: {
                            frames: [{ filename: 'https://www.nav.no/dekoratoren/api/ta' }],
                        },
                    },
                ],
            },
        } as ErrorEvent;
        expect(beforeSendFilter(event)).toBeNull();
    });

    it('sender videre feil som ikke er fra dekoratoren', () => {
        const event = {
            exception: {
                values: [
                    {
                        stacktrace: {
                            frames: [{ filename: 'https://www.nav.no/familie/' }],
                        },
                    },
                ],
            },
        } as ErrorEvent;
        expect(beforeSendFilter(event)).toBe(event);
    });

    it('filtrerer bort UnhandledRejection med Request timeout fra dekoratoren', () => {
        const event = {
            exception: {
                values: [
                    {
                        type: 'UnhandledRejection',
                        value: 'Non-Error promise rejection captured with value: Request timeout',
                    },
                ],
            },
        } as ErrorEvent;
        expect(beforeSendFilter(event)).toBeNull();
    });
});
