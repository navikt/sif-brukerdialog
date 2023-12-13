import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../../types/RedusertArbeidstidType';
import { extractArbeidIPeriodeSøknadsdata } from '../extractArbeidIPeriodeSøknadsdata';
import { ISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';

describe('extractArbeidIPeriodeSøknadsdata', () => {
    it('returnerer riktig når en ikke jobber i perioden', () => {
        const result = extractArbeidIPeriodeSøknadsdata({ arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderIkke);
    });
    it('returnerer riktig når en jobber som vanlig i perioden', () => {
        const result = extractArbeidIPeriodeSøknadsdata({ arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderVanlig);
        expect((result as any).arbeiderRedusert).toBeFalsy();
    });
    it('returnerer riktig når en arbeider redusert prosent av normalt', () => {
        const result = extractArbeidIPeriodeSøknadsdata({
            arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
            timerEllerProsent: TimerEllerProsent.PROSENT,
            erLiktHverUke: YesOrNo.YES,
            prosentAvNormalt: '50',
            snittTimerPerUke: '213',
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderRedusert);
        if (result?.type === ArbeidIPeriodeType.arbeiderRedusert) {
            expect(result.redusertArbeid.type).toEqual(RedusertArbeidstidType.prosentAvNormalt);
            if (result.redusertArbeid.type === RedusertArbeidstidType.prosentAvNormalt) {
                expect(result.redusertArbeid.prosentAvNormalt).toEqual(50);
            }
        }
    });
    it('returnerer riktig når en arbeider likt antall timer per uke', () => {
        const result = extractArbeidIPeriodeSøknadsdata({
            arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
            timerEllerProsent: TimerEllerProsent.TIMER,
            erLiktHverUke: YesOrNo.YES,
            prosentAvNormalt: '50',
            snittTimerPerUke: '20',
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderRedusert);
        if (result?.type === ArbeidIPeriodeType.arbeiderRedusert) {
            expect(result.redusertArbeid.type).toEqual(RedusertArbeidstidType.timerISnittPerUke);
            if (result.redusertArbeid.type === RedusertArbeidstidType.timerISnittPerUke) {
                expect(result.redusertArbeid.timerISnittPerUke).toEqual(20);
            }
        }
    });
    it('returnerer riktig når en arbeider ulike timer ulike uker', () => {
        const uke1: ISODateRange = '2023-02-06/2023-02-12';
        const uke2: ISODateRange = '2023-02-13/2023-02-19';
        const result = extractArbeidIPeriodeSøknadsdata({
            arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
            timerEllerProsent: TimerEllerProsent.TIMER,
            erLiktHverUke: YesOrNo.NO,
            arbeidsuker: {
                [uke1]: {
                    snittTimerPerUke: '10',
                },
                [uke2]: {
                    snittTimerPerUke: '20',
                },
            },
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderRedusert);
        if (result?.type === ArbeidIPeriodeType.arbeiderRedusert) {
            expect(result.redusertArbeid.type).toEqual(RedusertArbeidstidType.ulikeUkerTimer);
            if (result.redusertArbeid.type === RedusertArbeidstidType.ulikeUkerTimer) {
                expect(result.redusertArbeid.arbeidsuker[0].periode).toEqual(ISODateRangeToDateRange(uke1));
                expect(result.redusertArbeid.arbeidsuker[0].timer).toEqual(10);
                expect(result.redusertArbeid.arbeidsuker[1].periode).toEqual(ISODateRangeToDateRange(uke2));
                expect(result.redusertArbeid.arbeidsuker[1].timer).toEqual(20);
            }
        }
    });
});
