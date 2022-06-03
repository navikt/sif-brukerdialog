"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('routeUtils', () => {
    it('sentry environment is set correctly', () => {
        expect((0, __1.setSentryEnvironment)('localhost:8080')).toEqual(__1.SentryEnvironment.LOCALHOST);
        expect((0, __1.setSentryEnvironment)('www-q0.nav.no')).toEqual(__1.SentryEnvironment.q);
        expect((0, __1.setSentryEnvironment)('www.nav.no')).toEqual(__1.SentryEnvironment.prod);
        expect((0, __1.setSentryEnvironment)('www.asdf.gh')).toEqual(__1.SentryEnvironment.hostUndefined);
    });
});
