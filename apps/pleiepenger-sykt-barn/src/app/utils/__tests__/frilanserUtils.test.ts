import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { dateToISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
//import { Arbeidsgiver, ArbeidsgiverType } from '../../types';
import {
    erFrilanserISøknadsperiode,
    erFrilanserITidsrom,
    getStartdatoForNySomFrilanser,
    getStartdatoSomFrilanser,
    harSvartErFrilanserEllerHarFrilansoppdrag,
} from '../frilanserUtils';

const periode = ISODateRangeToDateRange('2021-01-05/2021-01-10');

describe('frilanserUtils', () => {
    describe('harSvartErFrilanserEllerHarFrilansoppdrag', () => {
        it('returnerer true når bruker har svart at en er frilanser i perioden', () => {
            const result = harSvartErFrilanserEllerHarFrilansoppdrag(YesOrNo.YES);
            expect(result).toBeTruthy();
        });
        it('returnerer false fersom bruker har har svart nei på om en er frilanser', () => {
            const result = harSvartErFrilanserEllerHarFrilansoppdrag(YesOrNo.NO);
            expect(result).toBeFalsy();
        });
    });
    describe('erFrilanserITidsrom', () => {
        it('returnerer true dersom startdato er inne i tidsrom', () => {
            expect(erFrilanserITidsrom(periode, ISODateToDate('2021-01-05'))).toBeTruthy();
            expect(erFrilanserITidsrom(periode, ISODateToDate('2021-01-07'))).toBeTruthy();
            expect(erFrilanserITidsrom(periode, ISODateToDate('2021-01-10'))).toBeTruthy();
        });
        it('returnerer true dersom startdato er før tidsrom og sluttdato er inne i, eller etter, tidsrom', () => {
            const frilansStartdato: Date = ISODateToDate('2021-01-01');
            expect(erFrilanserITidsrom(periode, frilansStartdato, ISODateToDate('2021-01-05'))).toBeTruthy();
            expect(erFrilanserITidsrom(periode, frilansStartdato, ISODateToDate('2021-01-07'))).toBeTruthy();
            expect(erFrilanserITidsrom(periode, frilansStartdato, ISODateToDate('2021-01-10'))).toBeTruthy();
            expect(erFrilanserITidsrom(periode, frilansStartdato, ISODateToDate('2021-01-11'))).toBeTruthy();
        });
        it('returnerer false dersom startdato er før tidsrom og sluttdato er før tidsrom', () => {
            const frilansStartdato: Date = ISODateToDate('2021-01-01');
            expect(erFrilanserITidsrom(periode, frilansStartdato, ISODateToDate('2021-01-04'))).toBeFalsy();
        });
        it('returnerer false dersom startdato er etter tidsrom', () => {
            const frilansStartdato: Date = ISODateToDate('2021-01-11');
            expect(erFrilanserITidsrom(periode, frilansStartdato)).toBeFalsy();
        });
    });
    describe('getStartdatoSomFrilanser', () => {
        const søknadsperiode = ISODateRangeToDateRange('2023-07-30/2023-10-31');

        it('returnerer første dato før nySomFrilanserPeriode dersom bruker sier en startet før nySomFrilanserPeriode', () => {
            const result = getStartdatoSomFrilanser(søknadsperiode, true, '');
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result)).toEqual('2023-03-31');
            }
        });
        it('returnerer oppgitt startdato som frilanser, dersom bruker sier en startet i nySomFrilanserPeriode', () => {
            const result = getStartdatoSomFrilanser(søknadsperiode, false, '2023-07-30');
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result)).toEqual('2023-07-30');
            }
        });
        it('returnerer undefined dersom bruker sier en startet i nySomFrilanserPeriode men har ikke oppgitt gyldig dato', () => {
            const result = getStartdatoSomFrilanser(søknadsperiode, false, 'abc');
            expect(result).toBeUndefined();
        });
    });
    describe('getStartdatoForNySomFrilanser', () => {
        it('returnerer første dato for når en blir regnet som nyoppstartet frilanser', () => {
            /** Tre hele måneder før søknadsperiode */
            const result = getStartdatoForNySomFrilanser(ISODateRangeToDateRange('2023-08-31/2023-10-31'));
            expect(dateToISODate(result)).toEqual('2023-05-01');
        });
    });

    describe('erFrilanserISøknadsperiode', () => {
        it('returnerer false dersom en ikke har frilansoppdrag og ikke har hatt inntekt som frilanser', () => {
            expect(
                erFrilanserISøknadsperiode(periode, {
                    startdato: '2021-01-01',
                    harHattInntektSomFrilanser: YesOrNo.NO,
                }),
            ).toBeFalsy();
        });
        /*
        it('returnerer true dersom en har frilansoppdrag og har svart på startdato', () => {
            expect(
                erFrilanserISøknadsperiode(
                    periode,
                    { startdato: '2021-01-01', harHattInntektSomFrilanser: YesOrNo.UNANSWERED },
                    [frilansoppdragIPeriode]
                )
            ).toBeTruthy();
        });*/
    });
});
