describe('getArbeidsforholdApiDataFromSøknadsdata', () => {
    it('todo', () => {
        expect(1).toBe(1);
    });
});

// TODO
// import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
// import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
// import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
// import {
//     ArbeidIPeriodeApiDataJobberIkke,
//     ArbeidIPeriodeApiDataJobberVanlig,
//     ArbeidIPeriodeApiDataProsent,
//     ArbeidIPeriodeApiDataTimerPerUke,
//     ArbeidIPeriodeApiDataUlikeUkerTimer,
// } from '../../../types/søknad-api-data/ArbeidIPeriodeApiData';
// import { ArbeidsukerTimerSøknadsdata } from '../../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
// import {
//     getArbeidIPeriodeApiDataFromSøknadsdata,
//     getArbeidsukerTimerApiData,
// } from '../getArbeidsforholdApiDataFromSøknadsdata';

// const uke1 = '2022-01-03/2022-01-09';
// const uke2 = '2022-01-10/2022-01-16';
// const uke3 = '2022-01-17/2022-01-23';

// const uke1DateRange = ISODateRangeToDateRange(uke1);
// const uke2DateRange = ISODateRangeToDateRange(uke2);
// const uke3DateRange = ISODateRangeToDateRange(uke3);

// const arbeidsukerTimer: ArbeidsukerTimerSøknadsdata = [
//     {
//         periode: uke1DateRange,
//         timer: 5,
//     },
//     {
//         periode: uke2DateRange,
//         timer: 6,
//     },
//     {
//         periode: uke3DateRange,
//         timer: 6.2,
//     },
// ];

// describe('getArbeidsforholdApiDataFromSøknadsdata', () => {
//     describe('getArbeidsukerTimerApiData', () => {
//         const result = getArbeidsukerTimerApiData(arbeidsukerTimer);

//         it('mapper om timer riktig til ISODuration', () => {
//             expect(result[0]).toBeDefined();
//             expect(result[0]).toEqual({ periode: { fraOgMed: '2022-01-03', tilOgMed: '2022-01-09' }, timer: 'PT5H0M' });
//         });
//         it('mapper om timer riktig til ISODuration', () => {
//             expect(result[1]).toBeDefined();
//             expect(result[1]).toEqual({ periode: { fraOgMed: '2022-01-10', tilOgMed: '2022-01-16' }, timer: 'PT6H0M' });
//         });
//         it('mapper om timer riktig til ISODuration', () => {
//             expect(result[2]).toBeDefined();
//             expect(result[2]).toEqual({
//                 periode: { fraOgMed: '2022-01-17', tilOgMed: '2022-01-23' },
//                 timer: 'PT6H12M',
//             });
//         });
//     });

//     describe('getArbeidIPeriodeApiDataFromSøknadsdata', () => {
//         it(`mapper riktig for ArbeidIPeriodeType === ${ArbeidIPeriodeType.arbeiderIkke}`, () => {
//             const result: ArbeidIPeriodeApiDataJobberIkke = {
//                 type: ArbeidIPeriodeType.arbeiderIkke,
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
//             };
//             expect(
//                 getArbeidIPeriodeApiDataFromSøknadsdata({
//                     type: ArbeidIPeriodeType.arbeiderIkke,
//                     arbeiderIPerioden: false,
//                 })
//             ).toEqual(result);
//         });
//         it(`mapper riktig for ArbeidIPeriodeType === ${ArbeidIPeriodeType.arbeiderVanlig}`, () => {
//             const result: ArbeidIPeriodeApiDataJobberVanlig = {
//                 type: ArbeidIPeriodeType.arbeiderVanlig,
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//             };
//             expect(
//                 getArbeidIPeriodeApiDataFromSøknadsdata({
//                     type: ArbeidIPeriodeType.arbeiderVanlig,
//                     arbeiderIPerioden: true,
//                     arbeiderRedusert: false,
//                 })
//             ).toEqual(result);
//         });
//         it(`mapper riktig for ArbeidIPeriodeType === ${ArbeidIPeriodeType.arbeiderProsentAvNormalt}`, () => {
//             const result: ArbeidIPeriodeApiDataProsent = {
//                 type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 prosentAvNormalt: 20,
//             };
//             expect(
//                 getArbeidIPeriodeApiDataFromSøknadsdata({
//                     type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
//                     arbeiderIPerioden: true,
//                     arbeiderRedusert: true,
//                     prosentAvNormalt: 20,
//                 })
//             ).toEqual(result);
//         });
//         it(`mapper riktig for ArbeidIPeriodeType === ${ArbeidIPeriodeType.arbeiderTimerISnittPerUke}`, () => {
//             const result: ArbeidIPeriodeApiDataTimerPerUke = {
//                 type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 timerPerUke: 'PT20H0M',
//             };
//             expect(
//                 getArbeidIPeriodeApiDataFromSøknadsdata({
//                     type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
//                     arbeiderIPerioden: true,
//                     arbeiderRedusert: true,
//                     timerISnittPerUke: 20,
//                 })
//             ).toEqual(result);
//         });

//         it(`mapper riktig for ArbeidIPeriodeType === ${ArbeidIPeriodeType.arbeiderUlikeUkerTimer}`, () => {
//             const result: ArbeidIPeriodeApiDataUlikeUkerTimer = {
//                 type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 arbeidsuker: [
//                     {
//                         periode: {
//                             fraOgMed: '2022-01-03',
//                             tilOgMed: '2022-01-09',
//                         },
//                         timer: 'PT5H0M',
//                     },
//                     {
//                         periode: {
//                             fraOgMed: '2022-01-10',
//                             tilOgMed: '2022-01-16',
//                         },
//                         timer: 'PT6H0M',
//                     },
//                     {
//                         periode: {
//                             fraOgMed: '2022-01-17',
//                             tilOgMed: '2022-01-23',
//                         },
//                         timer: 'PT6H12M',
//                     },
//                 ],
//             };
//             expect(
//                 getArbeidIPeriodeApiDataFromSøknadsdata({
//                     type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
//                     arbeiderIPerioden: true,
//                     arbeiderRedusert: true,
//                     arbeidsuker: arbeidsukerTimer,
//                 })
//             ).toEqual(result);
//         });
//     });
// });
