import { DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
} from '../../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { cleanupArbeidIPeriode, cleanupArbeidsuker } from '../cleanupArbeidstidStep';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../../types';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', commonEnv: {}, getEnv: () => '' };
});

describe('cleanupArbeidstidStepUtils', () => {
    describe('cleanupArbeidIPeriode', () => {
        const periode: DateRange = ISODateRangeToDateRange('2023-01-09/2023-01-29');

        const arbeidFormValues: ArbeidIPeriodeFormValues = {
            arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
            arbeidsuker: {},
            erLiktHverUke: YesOrNo.YES,
            prosentAvNormalt: '50',
            snittTimerPerUke: '10',
            timerEllerProsent: TimerEllerProsent.TIMER,
        };

        it('bruker arbeider som normalt', () => {
            const result = cleanupArbeidIPeriode(periode, arbeidFormValues);
            expect(result).toBeDefined();
            if (result) {
                const { arbeiderIPerioden, ...rest } = result;
                expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig);
                expect(rest).toEqual({});
            }
        });
        it('bruker har helt fravær', () => {
            const result = cleanupArbeidIPeriode(periode, {
                ...arbeidFormValues,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
            });
            expect(result).toBeDefined();
            if (result) {
                const { arbeiderIPerioden, ...rest } = result;
                expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
                expect(rest).toEqual({});
            }
        });
        it('bruker jobber prosent av normalt', () => {
            const result = cleanupArbeidIPeriode(periode, {
                ...arbeidFormValues,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                erLiktHverUke: YesOrNo.YES,
                timerEllerProsent: TimerEllerProsent.PROSENT,
            });
            expect(result).toBeDefined();
            if (result) {
                const { arbeiderIPerioden, erLiktHverUke, timerEllerProsent, prosentAvNormalt, ...rest } = result;
                expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
                expect(erLiktHverUke).toEqual(YesOrNo.YES);
                expect(timerEllerProsent).toEqual(TimerEllerProsent.PROSENT);
                expect(prosentAvNormalt).toEqual('50');
                expect(rest).toEqual({});
            }
        });
        it('bruker jobber timer hver uke', () => {
            const result = cleanupArbeidIPeriode(periode, {
                ...arbeidFormValues,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                erLiktHverUke: YesOrNo.YES,
                timerEllerProsent: TimerEllerProsent.TIMER,
            });
            expect(result).toBeDefined();
            if (result) {
                const { arbeiderIPerioden, erLiktHverUke, timerEllerProsent, snittTimerPerUke, ...rest } = result;
                expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
                expect(erLiktHverUke).toEqual(YesOrNo.YES);
                expect(timerEllerProsent).toEqual(TimerEllerProsent.TIMER);
                expect(snittTimerPerUke).toEqual('10');
                expect(rest).toEqual({});
            }
        });
        it('bruker jobber ulikt i flere uker', () => {
            const result = cleanupArbeidIPeriode(periode, {
                ...arbeidFormValues,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                erLiktHverUke: YesOrNo.NO,
                arbeidsuker: {
                    '2023-01-09/2023-01-15': { snittTimerPerUke: '4' },
                    '2023-01-16/2023-01-22': { snittTimerPerUke: '1' },
                    '2023-01-23/2023-01-29': { snittTimerPerUke: '2' },
                },
            });
            expect(result).toBeDefined();
            if (result) {
                const { arbeiderIPerioden, erLiktHverUke, arbeidsuker, ...rest } = result;
                expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
                expect(erLiktHverUke).toEqual(YesOrNo.NO);
                expect(arbeidsuker).toBeDefined();

                if (arbeidsuker) {
                    expect(Object.keys(arbeidsuker).length).toBe(3);
                    expect(arbeidsuker['2023-01-09/2023-01-15'].snittTimerPerUke).toEqual('4');
                    expect(arbeidsuker['2023-01-16/2023-01-22'].snittTimerPerUke).toEqual('1');
                    expect(arbeidsuker['2023-01-23/2023-01-29'].snittTimerPerUke).toEqual('2');
                }
                expect(rest).toEqual({});
            }
        });
    });
    describe('cleanupArbeidsuker', () => {
        it('beholder alle arbeidsuker som er i perioden', () => {
            const periode: DateRange = ISODateRangeToDateRange('2023-01-09/2023-01-29');
            const arbeidsuker: ArbeidsukerFormValues = {
                '2023-01-09/2023-01-15': { snittTimerPerUke: '4' },
                '2023-01-16/2023-01-22': { snittTimerPerUke: '1' },
                '2023-01-23/2023-01-29': { snittTimerPerUke: '2' },
            };
            const result = cleanupArbeidsuker(periode, arbeidsuker);
            expect(Object.keys(result).length).toBe(3);
            expect(result['2023-01-09/2023-01-15'].snittTimerPerUke).toEqual('4');
            expect(result['2023-01-16/2023-01-22'].snittTimerPerUke).toEqual('1');
            expect(result['2023-01-23/2023-01-29'].snittTimerPerUke).toEqual('2');
        });
        it('fjerner arbeidsuker som ikke er innenfor perioden', () => {
            /** Uker som har endret dato tømmes, og bruker må fylle ut disse på nytt */
            const periode: DateRange = ISODateRangeToDateRange('2023-01-15/2023-01-24');
            const arbeidsuker: ArbeidsukerFormValues = {
                '2023-01-09/2023-01-15': { snittTimerPerUke: '4' },
                '2023-01-16/2023-01-22': { snittTimerPerUke: '1' },
                '2023-01-23/2023-01-29': { snittTimerPerUke: '2' },
            };
            const result = cleanupArbeidsuker(periode, arbeidsuker);
            expect(Object.keys(result).length).toBe(1);
            expect(result['2023-01-16/2023-01-22'].snittTimerPerUke).toEqual('1');
        });
    });
});
