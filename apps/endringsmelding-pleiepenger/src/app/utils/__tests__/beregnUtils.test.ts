import { decimalDurationToDuration, Duration } from '@navikt/sif-common-utils';

import {
    avrundDesimaltid,
    beregnEndretArbeidstidForUke,
    beregnEndretFaktiskArbeidstidPerDag,
    beregnSnittTimerPerDag,
    erTimerGyldigInnenforAntallDager,
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

    describe('beregnEndretArbeidstidForUke', () => {
        it('setter timer riktig når endring er 5,5 timer over 5 dager', () => {
            const expectedResult: Duration = {
                hours: '5',
                minutes: '30',
            };
            expect(beregnEndretArbeidstidForUke({ timer: 5.5 }, 5)).toEqual(expectedResult);
        });
        it('regner hele timer for 4 timer faktisk', () => {
            const expectedResult: Duration = {
                hours: '4',
                minutes: '0',
            };
            expect(beregnEndretArbeidstidForUke({ timer: 4 }, 3)).toEqual(expectedResult);
        });
    });

    describe('beregnEndretFaktiskArbeidstidPerDag', () => {
        it('beregner riktig timer per dag når timer er satt til 20 per uke', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag({ timer: 20 }, 5);
            expect(result).toEqual(decimalDurationToDuration(4));
        });
        it('beregner riktig timer per dag når timer er satt til 0 per uke', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag({ timer: 0 }, 5);
            expect(result).toEqual(decimalDurationToDuration(0));
        });
        it('beregner riktig timer per dag når timer er satt til 37,5 per uke', () => {
            const result = beregnEndretFaktiskArbeidstidPerDag({ timer: 37.5 }, 5);
            expect(result).toEqual(decimalDurationToDuration(7.5));
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
    describe('erTimerGyldigInnenforAntallDager', () => {
        it('feiler ved flere timer enn tilgjengelig', () => {
            expect(erTimerGyldigInnenforAntallDager({ hours: '24', minutes: '1' }, 1)).toBeFalsy();
            expect(erTimerGyldigInnenforAntallDager({ hours: '48', minutes: '1' }, 2)).toBeFalsy();
        });
        it('godtar like mange timer som tilgjengelig', () => {
            expect(erTimerGyldigInnenforAntallDager({ hours: '24', minutes: '0' }, 1)).toBeTruthy();
            expect(erTimerGyldigInnenforAntallDager({ hours: '48', minutes: '0' }, 2)).toBeTruthy();
        });
        it('godtar færre timer enn tilgjengelig', () => {
            expect(erTimerGyldigInnenforAntallDager({ hours: '23', minutes: '59' }, 1)).toBeTruthy();
            expect(erTimerGyldigInnenforAntallDager({ hours: '47', minutes: '59' }, 2)).toBeTruthy();
        });
    });
});
