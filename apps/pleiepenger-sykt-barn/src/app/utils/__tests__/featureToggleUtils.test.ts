import { Feature, isFeatureEnabled } from '../featureToggleUtils';

describe('featureToggleUtils', () => {
    describe('isFeatureEnabled', () => {
        it('it should return true if the specified feature is enabled', () => {
            (window as any).appSettings = { UTILGJENGELIG: 'on' };
            expect(isFeatureEnabled(Feature.UTILGJENGELIG)).toBe(true);
            (window as any).appSettings = { UTILGJENGELIG: 'true' };
            expect(isFeatureEnabled(Feature.UTILGJENGELIG)).toBe(true);
        });

        it('should return false if specified feature is set to neither "on" nor "true"', () => {
            (window as any).appSettings = { UTILGJENGELIG: undefined };
            expect(isFeatureEnabled(Feature.UTILGJENGELIG)).toBe(false);
            (window as any).appSettings = { UTILGJENGELIG: 'off' };
            expect(isFeatureEnabled(Feature.UTILGJENGELIG)).toBe(false);
            (window as any).appSettings = { UTILGJENGELIG: 'false' };
            expect(isFeatureEnabled(Feature.UTILGJENGELIG)).toBe(false);
        });
    });
});
