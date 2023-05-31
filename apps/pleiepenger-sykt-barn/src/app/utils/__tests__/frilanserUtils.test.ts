import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
//import { Arbeidsgiver, ArbeidsgiverType } from '../../types';
import {
    harSvartErFrilanserEllerHarFrilansoppdrag,
    erFrilanserITidsrom,
    erFrilanserISøknadsperiode,
} from '../frilanserUtils';

const periode = ISODateRangeToDateRange('2021-01-05/2021-01-10');

/*const frilansoppdragIPeriode: Arbeidsgiver = {
    id: '123',
    navn: 'Frilansoppdrag',
    type: ArbeidsgiverType.FRILANSOPPDRAG,
    ansattFom: ISODateToDate('2021-01-01'),
};*/

describe('frilanserUtils', () => {
    describe('harSvartErFrilanserEllerHarFrilansoppdrag', () => {
        it('returnerer true når bruker har svart at en er frilanser i perioden', () => {
            const result = harSvartErFrilanserEllerHarFrilansoppdrag(YesOrNo.YES);
            expect(result).toBeTruthy();
        });
        /*
        it('returnerer true dersom bruker har registrert frilansoppdrag', () => {
            const result = harSvartErFrilanserEllerHarFrilansoppdrag(undefined, [frilansoppdragIPeriode]);
            expect(result).toBeTruthy();
        });*/
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
    describe('erFrilanserISøknadsperiode', () => {
        it('returnerer false dersom en ikke har frilansoppdrag og ikke har hatt inntekt som frilanser', () => {
            expect(
                erFrilanserISøknadsperiode(periode, {
                    startdato: '2021-01-01',
                    harHattInntektSomFrilanser: YesOrNo.NO,
                })
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
