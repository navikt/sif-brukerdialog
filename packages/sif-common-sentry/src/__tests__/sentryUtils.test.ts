import { SentryEnvironment, setSentryEnvironment } from '..';

describe('routeUtils', () => {
    it('sentry environment is set correctly', () => {
        expect(setSentryEnvironment('localhost:8080')).toEqual(SentryEnvironment.LOCALHOST);
        expect(setSentryEnvironment('www-q0.nav.no')).toEqual(SentryEnvironment.q);
        expect(setSentryEnvironment('www.nav.no')).toEqual(SentryEnvironment.prod);
        expect(setSentryEnvironment('www.asdf.gh')).toEqual(SentryEnvironment.hostUndefined);
    });
});
