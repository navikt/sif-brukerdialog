import { isISODuration } from '../typeGuardUtilities';

describe('isISODuration', () => {
    it('godtar PT0S', () => {
        expect(isISODuration('PT0S')).toBeTruthy();
    });
    it('godtar PT30H', () => {
        expect(isISODuration('PT30H')).toBeTruthy();
    });
    it('godtar PT30H0M', () => {
        expect(isISODuration('PT30H0M')).toBeTruthy();
    });
    it('godtar PT30H0M2S', () => {
        expect(isISODuration('PT30H0M2S')).toBeTruthy();
    });
    it('godtar PT30H0M2.1S', () => {
        expect(isISODuration('PT30H0M2.1S')).toBeTruthy();
    });
    it('Feiler ved undefined', () => {
        expect(isISODuration(undefined)).toBeFalsy();
    });
    it('Feiler ved ugyldig ISOFORMAT string', () => {
        expect(isISODuration('PT')).toBeFalsy();
    });
    it('Feiler ved ugyldig ISOFORMAT 2 string', () => {
        expect(isISODuration('PL0H2S')).toBeFalsy();
    });
});
