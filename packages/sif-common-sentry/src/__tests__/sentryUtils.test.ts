import { SentryEnvironment, setSentryEnvironment, setupIgnoreErrorsAndAllowUrls } from '../';

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
