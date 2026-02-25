import { formaterKontonummer } from '../formaterKontonummer';

describe('formatKontonummer', () => {
    it('should format a valid kontonummer', () => {
        const kontonummer = '12345678901';
        const formatted = formaterKontonummer(kontonummer);
        expect(formatted).toBe('1234 56 78901');
    });
    describe('should not format kontonummer when', () => {
        it('is empty', () => {
            const kontonummer = '';
            const formatted = formaterKontonummer(kontonummer);
            expect(formatted).toBe('');
        });
        it('is undefined', () => {
            const kontonummer = undefined;
            const formatted = formaterKontonummer(kontonummer);
            expect(formatted).toBe('');
        });
        it('is not a number', () => {
            const kontonummer = '1234a5678901';
            const formatted = formaterKontonummer(kontonummer);
            expect(formatted).toBe('1234a5678901');
        });
        it('is not 11 digits', () => {
            const kontonummer = '1234567890';
            const formatted = formaterKontonummer(kontonummer);
            expect(formatted).toBe('1234567890');
        });
    });
});
