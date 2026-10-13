import { describe, expect, it } from 'vitest';

import { buildStepPath, normalizeRouteSegment } from '../routeUtils';

describe('normalizeRouteSegment', () => {
    it('fjerner ledende slash', () => {
        expect(normalizeRouteSegment('/start')).toBe('start');
    });

    it('fjerner trailing slash', () => {
        expect(normalizeRouteSegment('start/')).toBe('start');
    });

    it('returnerer tom streng uendret', () => {
        expect(normalizeRouteSegment('')).toBe('');
    });
});

describe('buildStepPath', () => {
    it('bygger sti med og uten ledende slash på route', () => {
        expect(buildStepPath('/soknad', 'start')).toBe('/soknad/start');
        expect(buildStepPath('/soknad', '/start')).toBe('/soknad/start');
    });

    it('håndterer trailing slash på basePath', () => {
        expect(buildStepPath('/soknad/', 'start')).toBe('/soknad/start');
    });

    it('returnerer basePath når route er tom', () => {
        expect(buildStepPath('/soknad', '')).toBe('/soknad');
    });
});
