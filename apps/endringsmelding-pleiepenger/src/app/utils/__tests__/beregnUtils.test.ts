import { decimalDurationToDuration, Duration } from '@navikt/sif-common-utils/lib';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import {
    avrundDesimaltid,
    beregnEndretArbeidstid,
    beregnEndretFaktiskArbeidstidPerDag,
    beregnSnittTimerPerDag,
    summerTimerPerDag,
} from '../beregnUtils';

describe('beregnUtils', () => {
    describe('avrundDesimaltid', () => {
        const tid1 = 37.5;
        const tid2 = 12.435;
        it(`Avrunder ${tid1} timer riktig`, () => {
            expect(avrundDesimaltid(tid1)).toEqual(37.5);
        });
        it(`Avrunder ${tid2} timer riktig`, () => {
            expect(avrundDesimaltid(tid2)).toEqual(12.44);
        });
    });

    describe('beregnEndretArbeidstid', () => {
        it('regner ut riktig når endringen er 20 % av 7.5 timer', () => {
            const expectedResult: Duration = {
                hours: '1',
                minutes: '30',
            };
            expect(
                beregnEndretArbeidstid({ type: TimerEllerProsent.PROSENT, prosent: 20 }, { hours: '7', minutes: '30' })
            ).toEqual(expectedResult);
        });
        it('regner ut riktig når endringen er 50 % av 10 timer', () => {
            const expectedResult: Duration = {
                hours: '5',
                minutes: '0',
            };
            expect(
                beregnEndretArbeidstid({ type: TimerEllerProsent.PROSENT, prosent: 50 }, { hours: '10', minutes: '0' })
            ).toEqual(expectedResult);
        });
        it('setter timer riktig når endring er oppgitt i timer', () => {
            const expectedResult: Duration = {
                hours: '5',
                minutes: '30',
            };
            expect(
                beregnEndretArbeidstid({ type: TimerEllerProsent.TIMER, timer: 5.5 }, { hours: '10', minutes: '30' })
            ).toEqual(expectedResult);
        });
    });

    describe('beregnEndretFaktiskArbeidstidPerDag', () => {
        const normalarbeidstidUke: Duration = { hours: '37', minutes: '30' };
        it('beregner riktig timer per dag for 50% av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.PROSENT, prosent: 50 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(7.5 / 2);
            expect(result).toEqual(expectedResult);
        });
        it('beregner riktig timer per dag for 20% av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.PROSENT, prosent: 20 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(7.5 / 5);
            expect(result).toEqual(expectedResult);
        });
        it.only('beregner riktig timer per dag for 0% av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.PROSENT, prosent: 0 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(0);
            expect(result).toEqual(expectedResult);
        });
        it('beregner riktig timer per dag for 100% av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.PROSENT, prosent: 100 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(7.5);
            expect(result).toEqual(expectedResult);
        });
        it('beregner riktig timer per dag for når timer er satt til 20 per uke av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.TIMER, timer: 20 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(4);
            expect(result).toEqual(expectedResult);
        });
        it('beregner riktig timer per dag for når timer er satt til 0 per uke av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.TIMER, timer: 0 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(0);
            expect(result).toEqual(expectedResult);
        });
        it('beregner riktig timer per dag for når timer er satt til 37,5 per uke av 37,5 timer', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag(
                normalarbeidstidUke,
                { type: TimerEllerProsent.TIMER, timer: 37.5 },
                5
            );
            const expectedResult: Duration = decimalDurationToDuration(7.5);
            expect(result).toEqual(expectedResult);
        });
    });
    describe('beregnSnittTimerPerDag', () => {
        it('beregner riktig snitt per dag når ukestimer er 37,5 og en arbeider 5 dager', () => {
            const expectedResult: Duration = {
                hours: '7',
                minutes: '30',
            };
            expect(beregnSnittTimerPerDag({ hours: '37', minutes: '30' }, 5)).toEqual(expectedResult);
        });
        it('beregner riktig snitt per dag når ukestimer er 22,5 og en arbeider 3 dager', () => {
            const expectedResult: Duration = {
                hours: '7',
                minutes: '30',
            };
            expect(beregnSnittTimerPerDag({ hours: '22', minutes: '30' }, 3)).toEqual(expectedResult);
        });
        it('beregner riktig snitt per dag når ukestimer er 50 og en arbeider 4 dager', () => {
            const expectedResult: Duration = {
                hours: '16',
                minutes: '40',
            };
            expect(beregnSnittTimerPerDag({ hours: '50', minutes: '0' }, 3)).toEqual(expectedResult);
        });
    });
    describe('summerTimerPerDag', () => {
        it('summerer riktig 7.5 timer i 5 dager', () => {
            const expectedResult: Duration = { hours: '37', minutes: '30' };
            expect(summerTimerPerDag({ hours: '7', minutes: '30' }, 5)).toEqual(expectedResult);
        });
        it('summerer riktig 2 timer og 10 minutter i 3 dager', () => {
            const expectedResult: Duration = { hours: '6', minutes: '30' };
            expect(summerTimerPerDag({ hours: '2', minutes: '10' }, 3)).toEqual(expectedResult);
        });
    });
});
