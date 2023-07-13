// TODO
describe('arbeidstidUtils', () => {
    it('todo', () => {
        expect(1).toBe(1);
    });
});

// import { DateRange } from '@navikt/sif-common-formik-ds/lib';
// import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
// import { ArbeidIPeriodeType } from '../../../../types/ArbeidIPeriodeType';
// import { ArbeidIPeriodeSøknadsdata } from '../../../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
// import { ArbeidsforholdSøknadsdata } from '../../../../types/søknadsdata/arbeidsforholdSøknadsdata';
// import { NormalarbeidstidSøknadsdata } from '../../../../types/søknadsdata/NormalarbeidstidSøknadsdata';
// import {
//     ArbeidsperiodeIForholdTilSøknadsperiode,
//     getArbeidsperiodeIForholdTilSøknadsperiode,
//     harFraværFraJobb,
//     harFraværSomFrilanser,
//     summerArbeidstimerIArbeidsuker,
// } from '../arbeidstidUtils';
// import { ArbeidIPeriodeFrilansSøknadsdata } from '../../../../types/søknadsdata/arbeidIPeriodeFrilansSøknadsdata';
// import { ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';
// import { MisterHonorarerFraVervIPerioden } from '../../../../types/ArbeidIPeriodeFormValues';

// const normalarbeidstid: NormalarbeidstidSøknadsdata = {
//     timerPerUkeISnitt: 20,
// };

// const arbeiderIkke: ArbeidIPeriodeSøknadsdata = {
//     type: ArbeidIPeriodeType.arbeiderIkke,
//     arbeiderIPerioden: false,
// };

// const arbeiderVanlig: ArbeidIPeriodeSøknadsdata = {
//     type: ArbeidIPeriodeType.arbeiderVanlig,
//     arbeiderIPerioden: true,
//     arbeiderRedusert: false,
// };

// const arbeiderRedusert: ArbeidIPeriodeSøknadsdata = {
//     type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
//     arbeiderIPerioden: true,
//     arbeiderRedusert: true,
//     timerISnittPerUke: 5,
// };

// const arbeidsforhold: ArbeidsforholdSøknadsdata[] = [{ normalarbeidstid, arbeidISøknadsperiode: arbeiderVanlig }];

// describe('arbeidstidUtils', () => {
//     describe('harFraværSomFrilanser', () => {
//         const arbeidIPeriodeBase: ArbeidIPeriodeFrilansSøknadsdata = {
//             gjelderFrilans: true,
//             type: ArbeidIPeriodeType.arbeiderVanlig,
//             arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//             misterHonorarerFraVervIPerioden: undefined,
//         };
//         it('returnerer true dersom bruker mister alle honorar', () => {
//             expect(
//                 harFraværSomFrilanser({
//                     ...arbeidIPeriodeBase,
//                     arbeiderIPerioden: undefined,
//                     misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
//                 })
//             ).toBeTruthy();
//         });
//         it('returnerer true dersom bruker mister deler av honorar', () => {
//             expect(
//                 harFraværSomFrilanser({
//                     ...arbeidIPeriodeBase,
//                     arbeiderIPerioden: undefined,
//                     misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
//                 })
//             ).toBeTruthy();
//         });
//         it('returnerer true dersom bruker ikke jobber og ikke mister honorar', () => {
//             expect(
//                 harFraværSomFrilanser({
//                     ...arbeidIPeriodeBase,
//                     arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
//                     misterHonorarerFraVervIPerioden: undefined,
//                 })
//             ).toBeTruthy();
//         });
//         it('returnerer true dersom bruker jobber redusert og ikke mister honorar', () => {
//             expect(
//                 harFraværSomFrilanser({
//                     ...arbeidIPeriodeBase,
//                     arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                     misterHonorarerFraVervIPerioden: undefined,
//                 })
//             ).toBeTruthy();
//         });
//         it('returnerer false dersom bruker jobber som vanlig og ikke mister honorar', () => {
//             expect(
//                 harFraværSomFrilanser({
//                     ...arbeidIPeriodeBase,
//                     arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//                     misterHonorarerFraVervIPerioden: undefined,
//                 })
//             ).toBeFalsy();
//         });
//     });
//     describe('harFraværFraJobb', () => {
//         it('returnerer false når en kun jobber normalt', () => {
//             expect(harFraværFraJobb(arbeidsforhold)).toBeFalsy();
//         });
//         it('returnerer true når en har et arbeidsforhold hvor en jobber redusert', () => {
//             expect(
//                 harFraværFraJobb([...arbeidsforhold, { normalarbeidstid, arbeidISøknadsperiode: arbeiderRedusert }])
//             ).toBeTruthy();
//         });
//         it('returnerer true når en har et arbeidsforhold hvor en ikke jobber', () => {
//             expect(
//                 harFraværFraJobb([...arbeidsforhold, { normalarbeidstid, arbeidISøknadsperiode: arbeiderIkke }])
//             ).toBeTruthy();
//         });
//     });

//     describe('summerArbeidstimerIArbeidsuker', () => {
//         const periode = ISODateRangeToDateRange('2022-01-03/2022-01-09');
//         it('returnerer 0 ved 0 timer', () => {
//             const result = summerArbeidstimerIArbeidsuker([{ periode, timer: 0 }]);
//             expect(result).toEqual(0);
//         });
//         it('summerer riktig', () => {
//             const result = summerArbeidstimerIArbeidsuker([
//                 { periode, timer: 1 },
//                 { periode, timer: 2 },
//                 { periode, timer: 3 },
//             ]);
//             expect(result).toEqual(6);
//         });
//     });

//     describe('getArbeidsperiodeIForholdTilSøknadsperiode', () => {
//         const mandag: Date = ISODateToDate('2022-01-03');
//         const tirsdag: Date = ISODateToDate('2022-01-04');
//         const torsdag: Date = ISODateToDate('2022-01-06');
//         const fredag: Date = ISODateToDate('2022-01-07');

//         it('returnerer starterIPerioden når arbeidsperiode starter i søknadsperioden', () => {
//             const arbeidsperiode: DateRange = {
//                 from: tirsdag,
//                 to: fredag,
//             };
//             const søknadsperiode: DateRange = {
//                 from: mandag,
//                 to: fredag,
//             };
//             expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
//                 ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden
//             );
//         });
//         it('returnerer slutterIPerioden når arbeidsperiode slutter i søknadsperioden', () => {
//             const arbeidsperiode: DateRange = {
//                 from: mandag,
//                 to: torsdag,
//             };
//             const søknadsperiode: DateRange = {
//                 from: mandag,
//                 to: fredag,
//             };
//             expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
//                 ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden
//             );
//         });
//         it('returnerer starterOgSlutterIPerioden når arbeidsperiode starter og slutter i søknadsperioden', () => {
//             const arbeidsperiode: DateRange = {
//                 from: tirsdag,
//                 to: torsdag,
//             };
//             const søknadsperiode: DateRange = {
//                 from: mandag,
//                 to: fredag,
//             };
//             expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
//                 ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden
//             );
//         });
//         it('returnerer gjelderHelePerioden når arbeidsperiode starter og slutter samme dager som søknadsperioden', () => {
//             const arbeidsperiode: DateRange = {
//                 from: mandag,
//                 to: fredag,
//             };
//             const søknadsperiode: DateRange = {
//                 from: mandag,
//                 to: fredag,
//             };
//             expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
//                 ArbeidsperiodeIForholdTilSøknadsperiode.gjelderHelePerioden
//             );
//         });
//     });
// });
