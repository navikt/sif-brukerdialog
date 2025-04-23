import { ISODateToDate } from '@navikt/sif-common-utils';
import { getFørsteMuligeInnmeldingsdato, getSisteMuligeInnmeldingsdato } from '../deltakelseUtils';
import dayjs from 'dayjs';

describe('deltakelseUtils', () => {
    describe('getFørsteMuligeInnmeldingsdato', () => {
        it('Min startdato settes til programperiodeStart når andre datoer er tidligere enn denne', () => {
            const programperiodeStart = ISODateToDate('2023-01-01');
            const førsteMuligeInnmeldingsdato = ISODateToDate('2023-01-01');
            const today = ISODateToDate('2023-02-01');
            const result = getFørsteMuligeInnmeldingsdato(førsteMuligeInnmeldingsdato, programperiodeStart, today);
            expect(result).toEqual(programperiodeStart);
        });
        it('Min startdato settes til deltakers førsteMuligeInnmeldingsdato når denne er etter programperiodeStart', () => {
            const programperiodeStart = ISODateToDate('2023-01-01');
            const startdato = ISODateToDate('2023-01-02');
            const today = ISODateToDate('2023-02-01');
            const result = getFørsteMuligeInnmeldingsdato(startdato, programperiodeStart, today);
            expect(result).toEqual(startdato);
        });
        it('Min startdato settes til maks 6 måneder før dagens dato', () => {
            const programperiodeStart = ISODateToDate('2023-01-01');
            const førsteMuligeInnmeldingsdato = ISODateToDate('2023-01-01');
            const today = ISODateToDate('2024-01-08');
            const expectedMinDato = dayjs(today).subtract(6, 'month').toDate();
            const result = getFørsteMuligeInnmeldingsdato(førsteMuligeInnmeldingsdato, programperiodeStart, today);
            expect(result).toEqual(expectedMinDato);
        });
    });
    describe('getSisteMuligeInnmeldingsdato', () => {
        it('Max startdato settes til deltakers siste mulige innmeldingsdato når den er før 6-måneders grense', () => {
            const sisteMuligeInnmeldingsdato = ISODateToDate('2023-01-01');
            const today = ISODateToDate('2023-02-01');
            const result = getSisteMuligeInnmeldingsdato(sisteMuligeInnmeldingsdato, today);
            expect(result).toEqual(sisteMuligeInnmeldingsdato);
        });
        it('Max startdato settes til 6-måneders grense når det er mer enn 6 måneder til deltakers siste mulige innmeldingsdato', () => {
            const today = ISODateToDate('2024-02-01');
            const sisteMuligeInnmeldingsdato = ISODateToDate('2026-01-01');
            const expectedMaksDato = dayjs(today).add(6, 'month').toDate();
            const result = getSisteMuligeInnmeldingsdato(sisteMuligeInnmeldingsdato, today);
            expect(result).toEqual(expectedMaksDato);
        });
    });
});
