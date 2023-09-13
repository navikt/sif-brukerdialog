import { extractNormalarbeidstid } from '../extractNormalarbeidstidSøknadsdata';

describe('extractNormalarbeidstid', () => {
    describe('ArbeidsforholdType.ANSATT', () => {
        it('returnerer undefined dersom normalarbeidstid === undefined', () => {
            expect(extractNormalarbeidstid(undefined)).toBeUndefined();
        });

        it('returnerer timerPerUke riktig', () => {
            const result = extractNormalarbeidstid({
                timerPerUke: '30',
            });
            expect(result).toBeDefined();
            expect(result?.timerPerUkeISnitt).toEqual(30);
        });
    });
});
