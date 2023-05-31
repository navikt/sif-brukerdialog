import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/arbeidIPeriodeType';
import { extractArbeidIPeriodeSøknadsdata } from '../extractArbeidIPeriodeSøknadsdata';

describe('extractArbeidIPeriodeSøknadsdata', () => {
    it('returnerer riktig når en ikke jobber i perioden', () => {
        const result = extractArbeidIPeriodeSøknadsdata({ arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderIkke);
        expect(result?.arbeiderIPerioden).toBeFalsy();
    });
    it('returnerer riktig når en jobber som vanlig i perioden', () => {
        const result = extractArbeidIPeriodeSøknadsdata({ arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderVanlig);
        expect(result?.arbeiderIPerioden).toBeTruthy();
        expect((result as any).arbeiderRedusert).toBeFalsy();
    });
    it('returnerer riktig når en arbeider prosent av normalt', () => {
        const result = extractArbeidIPeriodeSøknadsdata({
            arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
            timerEllerProsent: TimerEllerProsent.PROSENT,
            erLiktHverUke: YesOrNo.YES,
            prosentAvNormalt: '50',
            snittTimerPerUke: '213',
        });
        expect(result).toBeDefined();
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderProsentAvNormalt);
        expect(result?.arbeiderIPerioden).toBeTruthy();
        expect((result as any).arbeiderRedusert).toBeTruthy();
        expect((result as any).prosentAvNormalt).toEqual(50);
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
        expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
        expect(result?.arbeiderIPerioden).toBeTruthy();
        expect((result as any).arbeiderRedusert).toBeTruthy();
        expect((result as any).timerISnittPerUke).toEqual(20);
    });
});
