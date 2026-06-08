import { describe, expect, it } from 'vitest';

import { buildStepPath, normalizeRouteSegment } from '../routeUtils';

describe('routeUtils', () => {
    it('normaliserer route-segment med ledende slash', () => {
        expect(normalizeRouteSegment('/start')).toBe('start');
    });

    it('normaliserer route-segment med trailing slash', () => {
        expect(normalizeRouteSegment('start/')).toBe('start');
    });

    it('bygger samme path for route med og uten slash', () => {
        expect(buildStepPath('/soknad', 'start')).toBe('/soknad/start');
        expect(buildStepPath('/soknad', '/start')).toBe('/soknad/start');
    });

    it('håndterer basePath med trailing slash uten double slash', () => {
        expect(buildStepPath('/soknad/', '/start')).toBe('/soknad/start');
    });
});
