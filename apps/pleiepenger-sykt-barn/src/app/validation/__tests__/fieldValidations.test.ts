import { vi } from 'vitest';
import { getPeriodeMaksDato, getPeriodeMinDato } from '../fieldValidations';
import {
    dateToISODate,
    dateUtils,
    getDate1YearFromNow,
    getDate3YearsAgo,
    getDateToday,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getEnv: () => 'mockedApiUrl',
    };
});

describe('fieldValidations', () => {
    describe('getPeriodeMinDato', () => {
        it('Min dato skal være tre å bak i tid hvis vi ikke har barnets fødselsdato', () => {
            const periodeMinDato = getPeriodeMinDato();
            expect(dateToISODate(periodeMinDato)).toEqual(dateToISODate(getDate3YearsAgo()));
        });
        it('Min dato skal være tre å bak i tid hvis barnet er født før dette', () => {
            const fødselsdato = dayjs(getDate3YearsAgo()).subtract(1, 'day').toDate();
            const periodeMinDato = getPeriodeMinDato(fødselsdato);
            expect(dateToISODate(periodeMinDato)).toEqual(dateToISODate(getDate3YearsAgo()));
        });
        it('Min dato skal være barnets fødselsdato hvis barnet er født innen siste tre år', () => {
            const fødselsdato = dayjs(getDate3YearsAgo()).add(1, 'day').toDate();
            const periodeMinDato = getPeriodeMinDato(fødselsdato);
            expect(dateToISODate(periodeMinDato)).toEqual(dateToISODate(fødselsdato));
        });
    });
    describe('getPeriodeMaksDato', () => {
        it('Maks dato skal være ett år frem i tid hvis fraDato er gyldig, og fra dato er i dag', () => {
            const fraDato = dateUtils.dateToISODate(getDateToday());
            const maksDato = getPeriodeMaksDato(fraDato);
            expect(dateToISODate(maksDato)).toEqual(dateToISODate(getDate1YearFromNow()));
        });
        it('Maks dato skal være ett år frem i tid hvis fraDato er gyldig, og fra dato er frem i tid', () => {
            const fraDato = dateUtils.dateToISODate(dayjs(getDateToday()).add(2, 'week').toDate());
            const maksDato = getPeriodeMaksDato(fraDato);
            expect(dateToISODate(maksDato)).toEqual(dateToISODate(getDate1YearFromNow()));
        });
        it('Maks dato skal være ett år fra "fra"-dato hvis "fra"-dato er i fortid', () => {
            const fraDato = dateUtils.dateToISODate(dayjs(getDateToday()).subtract(2, 'week').toDate());
            const maksDato = getPeriodeMaksDato(fraDato);
            expect(dateToISODate(maksDato)).toEqual(
                dateToISODate(dayjs(getDate1YearFromNow()).subtract(2, 'week').toDate()),
            );
        });
    });
});
