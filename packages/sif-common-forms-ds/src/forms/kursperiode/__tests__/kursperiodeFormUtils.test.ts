import kursperiodeUtils from '../utils/kursperiodeUtils';

describe('kursperiodeUtils', () => {
    describe('getDagerMellomAvreiseOgStartdato', () => {
        it('returnerer riktig antall dager mellom avreise og startdato', () => {
            const formValues = {
                fom: '2021-01-05',
                avreise: '2021-01-01',
            };
            const result = kursperiodeUtils.getDagerMellomAvreiseOgStartdato(formValues);
            expect(result).toBe(4);
        });
    });
    describe('getDagerMellomSluttdatoOgHjemkomst', () => {
        it('returnerer riktig antall dager mellom sluttdato og hjemkomst', () => {
            const formValues = {
                tom: '2021-01-01',
                hjemkomst: '2021-01-05',
            };
            const result = kursperiodeUtils.getDagerMellomSluttdatoOgHjemkomst(formValues);
            expect(result).toBe(4);
        });
    });
});
