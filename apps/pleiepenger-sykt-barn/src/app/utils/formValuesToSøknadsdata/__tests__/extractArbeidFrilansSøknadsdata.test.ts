// TODO
// import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
// import { ISODateRangeToDateRange, dateToISODate } from '@navikt/sif-common-utils/lib';
// import { ArbeidsforholdFrilanserFormValues } from '../../../types/ArbeidsforholdFormValues';
// import { FrilansFormData, Frilanstype } from '../../../types/FrilansFormData';
// import { extractArbeidFrilansSøknadsdata } from '../extractArbeidFrilansSøknadsdata';
// import {
//     ArbeidFrilansSøknadsdataPågående,
//     ArbeidFrilansSøknadsdataSluttetISøknadsperiode,
// } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
// import { ArbeidIPeriodeFormValues, MisterHonorarerFraVervIPerioden } from '../../../types/ArbeidIPeriodeFormValues';
// import { TimerEllerProsent } from '../../../types';
// import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
// import { extractArbeidIPeriodeFrilanserSøknadsdata } from '../extractArbeidIPeriodeSøknadsdata';
// import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';

// const søknadsperiode = ISODateRangeToDateRange('2022-01-01/2022-02-01');

// const mockArbeidsforhold: ArbeidsforholdFrilanserFormValues = {
//     arbeidIPeriode: undefined,
//     normalarbeidstid: { timerPerUke: '2' },
// };

// const kunFrilansFormData: FrilansFormData = {
//     harHattInntektSomFrilanser: YesOrNo.YES,
//     erFortsattFrilanser: YesOrNo.YES,
//     frilanstyper: [Frilanstype.FRILANSARBEID],
//     startdato: '2020-01-01',
//     arbeidsforhold: mockArbeidsforhold,
// };
// const kunHonorarFormData: FrilansFormData = {
//     harHattInntektSomFrilanser: YesOrNo.YES,
//     frilanstyper: [Frilanstype.HONORARARBEID],
//     erFortsattFrilanser: YesOrNo.YES,
//     misterHonorar: YesOrNo.YES,
//     startdato: '2020-01-01',
//     arbeidsforhold: mockArbeidsforhold,
// };

// const frilansOgHonorarFormData: FrilansFormData = {
//     harHattInntektSomFrilanser: YesOrNo.YES,
//     frilanstyper: [Frilanstype.HONORARARBEID, Frilanstype.FRILANSARBEID],
//     erFortsattFrilanser: YesOrNo.YES,
//     misterHonorar: YesOrNo.YES,
//     startdato: '2020-01-01',
//     arbeidsforhold: mockArbeidsforhold,
// };

// describe('extractArbeidFrilansSøknadsdata', () => {
//     describe('Arbeidssituasjon - frilans', () => {
//         describe('Jobber ikke som frilanser og får ikke honorar', () => {
//             it('returnerer erIkkeFrilanser dersom bruker ikke har oppdrag og har svart nei', () => {
//                 const result = extractArbeidFrilansSøknadsdata(
//                     { ...kunFrilansFormData, harHattInntektSomFrilanser: YesOrNo.NO },
//                     søknadsperiode
//                 );
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('erIkkeFrilanser');
//             });
//         });

//         const testFellesverdier = (
//             result: ArbeidFrilansSøknadsdataPågående | ArbeidFrilansSøknadsdataSluttetISøknadsperiode
//         ) => {
//             const { erFrilanser, aktivPeriode, arbeidsforhold, startdato } = result;
//             expect(dateToISODate(startdato)).toEqual('2020-01-01');
//             expect(erFrilanser).toBeTruthy();
//             if (result.type === 'pågående') {
//                 expect((result as any).sluttdato).toBeUndefined();
//             } else {
//                 expect(dateToISODate(result.sluttdato)).toEqual('2022-01-01');
//             }
//             expect(aktivPeriode).toBeDefined();
//             expect(arbeidsforhold).toBeDefined();
//             expect(arbeidsforhold.normalarbeidstid.timerPerUkeISnitt).toEqual(2);
//             expect(arbeidsforhold.arbeidISøknadsperiode).toBeUndefined();
//         };

//         describe('Jobber som frilanser, mottar ikke honorar - jobber normalt 2 timer i uken.', () => {
//             it('Eksporterer riktig søknadsdata når det er pågående frilansarbeid', () => {
//                 const result = extractArbeidFrilansSøknadsdata(kunFrilansFormData, søknadsperiode);
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('pågående');
//                 if (result && result.type === 'pågående') {
//                     const { misterHonorar, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(misterHonorar).toBeUndefined();
//                     expect(frilansType).toHaveLength(1);
//                     expect(frilansType[0]).toEqual(Frilanstype.FRILANSARBEID);
//                 }
//             });
//             it('Eksporterer riktig søknadsdata når en slutter som frilanser i perioden', () => {
//                 const result = extractArbeidFrilansSøknadsdata(
//                     { ...kunFrilansFormData, erFortsattFrilanser: YesOrNo.NO, sluttdato: '2022-01-01' },
//                     søknadsperiode
//                 );
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('sluttetISøknadsperiode');
//                 if (result && result.type === 'sluttetISøknadsperiode') {
//                     const { misterHonorar, sluttdato, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(dateToISODate(sluttdato)).toEqual('2022-01-01');
//                     expect(misterHonorar).toBeUndefined();
//                     expect(frilansType).toHaveLength(1);
//                     expect(frilansType[0]).toEqual(Frilanstype.FRILANSARBEID);
//                 }
//             });
//         });
//         describe('Jobber ikke som frilanser, men mottar honorar - jobber normalt 2 timer i uken.', () => {
//             it('Eksporterer riktig søknadsdata når en mister honorar', () => {
//                 const result = extractArbeidFrilansSøknadsdata(kunHonorarFormData, søknadsperiode);
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('pågående');
//                 if (result && result.type === 'pågående') {
//                     const { misterHonorar, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(misterHonorar).toBeTruthy();
//                     expect(frilansType).toHaveLength(1);
//                     expect(frilansType[0]).toEqual(Frilanstype.HONORARARBEID);
//                 }
//             });
//             it('Eksporterer riktig søknadsdata når en mister honorar for en periode i søknadsperioden', () => {
//                 const result = extractArbeidFrilansSøknadsdata(
//                     { ...kunHonorarFormData, erFortsattFrilanser: YesOrNo.NO, sluttdato: '2022-01-01' },
//                     søknadsperiode
//                 );
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('sluttetISøknadsperiode');
//                 if (result && result.type === 'sluttetISøknadsperiode') {
//                     const { misterHonorar, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(misterHonorar).toBeTruthy();
//                     expect(frilansType).toHaveLength(1);
//                     expect(frilansType[0]).toEqual(Frilanstype.HONORARARBEID);
//                 }
//             });
//         });
//         describe('Jobber som frilanser og mottar honorar  - jobber normalt 2 timer i uken.', () => {
//             it('Eksporterer riktig søknadsdata når en mister honorar', () => {
//                 const result = extractArbeidFrilansSøknadsdata(frilansOgHonorarFormData, søknadsperiode);
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('pågående');
//                 if (result && result.type === 'pågående') {
//                     const { misterHonorar, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(misterHonorar).toBeTruthy();
//                     expect(frilansType).toHaveLength(2);
//                     expect(frilansType).toContain(Frilanstype.FRILANSARBEID);
//                     expect(frilansType).toContain(Frilanstype.HONORARARBEID);
//                 }
//             });
//             it('Eksporterer riktig søknadsdata når en mister honorar for en periode i søknadsperioden', () => {
//                 const result = extractArbeidFrilansSøknadsdata(
//                     { ...frilansOgHonorarFormData, erFortsattFrilanser: YesOrNo.NO, sluttdato: '2022-01-01' },
//                     søknadsperiode
//                 );
//                 expect(result).toBeDefined();
//                 expect(result?.type).toEqual('sluttetISøknadsperiode');
//                 if (result && result.type === 'sluttetISøknadsperiode') {
//                     const { misterHonorar, frilansType } = result;
//                     testFellesverdier(result);
//                     expect(misterHonorar).toBeTruthy();
//                     expect(frilansType).toHaveLength(2);
//                     expect(frilansType).toContain(Frilanstype.FRILANSARBEID);
//                     expect(frilansType).toContain(Frilanstype.HONORARARBEID);
//                 }
//             });
//         });
//     });
// });

// describe('extractArbeidIPeriodeFrilanserSøknadsdata', () => {
//     describe('Når en kun er frilanser (ikke honorar)', () => {
//         it('helt fravær', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderIkke);
//             expect(result?.misterHonorarerFraVervIPerioden).toBeUndefined();
//         });
//         it('jobber som vanlig', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig);
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderVanlig);
//             expect(result?.misterHonorarerFraVervIPerioden).toBeUndefined();
//         });
//         it('delvis fravær - likt i perioden - prosent', () => {
//             const redusert: ArbeidIPeriodeFormValues = {
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.PROSENT,
//                 prosentAvNormalt: '40',
//             };
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata(redusert);
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderProsentAvNormalt);
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
//             if (result?.type === ArbeidIPeriodeType.arbeiderProsentAvNormalt) {
//                 expect(result.prosentAvNormalt).toEqual(40);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toBeUndefined();
//         });
//         it('delvis fravær - likt i perioden - timer', () => {
//             const redusert: ArbeidIPeriodeFormValues = {
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//                 snittTimerPerUke: '5',
//             };
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata(redusert);
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
//             if (result?.type === ArbeidIPeriodeType.arbeiderTimerISnittPerUke) {
//                 expect(result.timerISnittPerUke).toEqual(5);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toBeUndefined();
//         });
//         it('delvis fravær - varierer fra uke til uke', () => {
//             const redusert: ArbeidIPeriodeFormValues = {
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 erLiktHverUke: YesOrNo.NO,
//                 arbeidsuker: { '2020-01-01/2020-02-01': { snittTimerPerUke: '20' } },
//             };

//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 ...redusert,
//             });
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderUlikeUkerTimer);
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
//             if (result?.type === ArbeidIPeriodeType.arbeiderUlikeUkerTimer) {
//                 ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
//                 expect(result?.arbeidsuker).toHaveLength(1);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toBeUndefined();
//         });
//     });
//     describe('Når en ikke er frilanser og kun mottar honorar', () => {
//         it('mister alle honorar', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
//             });
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderIkke);
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toBeUndefined();
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterAlleHonorarer
//             );
//         });
//         it('mister deler av honorar - jobber timer i snitt', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//                 snittTimerPerUke: '5',
//             });
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toBeUndefined();
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             if (result?.type === ArbeidIPeriodeType.arbeiderTimerISnittPerUke) {
//                 expect(result.timerISnittPerUke).toEqual(5);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer
//             );
//         });
//     });
//     describe('Når en er både frilanser og mottar honorar', () => {
//         it('helt fravær som frilanser, mister hele honorar', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderIkke);
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterAlleHonorarer
//             );
//         });
//         it('helt fravær som frilanser, mister deler av honorar', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//                 snittTimerPerUke: '5',
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær); // som frilanser, ikke honorar
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer
//             );
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             if (result?.type === ArbeidIPeriodeType.arbeiderTimerISnittPerUke) {
//                 expect(result.timerISnittPerUke).toEqual(5);
//             }
//         });
//         it('jobber som vanlig som frilanser, mister deler av honorar', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//                 snittTimerPerUke: '5',
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig); // som frilanser, ikke honorar
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer
//             );
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             if (result?.type === ArbeidIPeriodeType.arbeiderTimerISnittPerUke) {
//                 expect(result.timerISnittPerUke).toEqual(5);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer
//             );
//         });
//         it('jobber som vanlig som frilanser, mister alle honorarer', () => {
//             const result = extractArbeidIPeriodeFrilanserSøknadsdata({
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//                 misterHonorarerFraVervIPerioden: MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//                 snittTimerPerUke: '5',
//             });
//             expect(result?.gjelderFrilans).toBeTruthy();
//             expect(result?.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig); // som frilanser, ikke honorar
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterAlleHonorarer
//             );
//             expect(result?.type).toEqual(ArbeidIPeriodeType.arbeiderTimerISnittPerUke);
//             if (result?.type === ArbeidIPeriodeType.arbeiderTimerISnittPerUke) {
//                 expect(result.timerISnittPerUke).toEqual(5);
//             }
//             expect(result?.misterHonorarerFraVervIPerioden).toEqual(
//                 MisterHonorarerFraVervIPerioden.misterAlleHonorarer
//             );
//         });
//     });
// });
