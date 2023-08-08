// import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
// import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
// import { FrilansFormData, Frilanstype } from '../../../../types/FrilansFormData';
// import { cleanupFrilansArbeidssituasjon } from '../cleanupArbeidssituasjonStep';

// const søknadsperiode = ISODateRangeToDateRange('2021-01-02/2022-01-01');

// const frilanserFullFormValues: FrilansFormData = {
//     harHattInntektSomFrilanser: YesOrNo.YES,
//     erFortsattFrilanser: YesOrNo.YES,
//     frilanstyper: [Frilanstype.FRILANSARBEID, Frilanstype.HONORARARBEID],
//     misterHonorar: YesOrNo.YES,
//     startdato: '2021-02-02',
//     sluttdato: '2022-02-01',
//     arbeidsforholdFrilansarbeid: {
//         normalarbeidstid: {
//             timerPerUke: '2',
//         },
//     },
//     arbeidsforholdHonorararbeid: {
//         normalarbeidstid: {
//             timerPerUke: '5',
//         },
//     },
// };

describe('cleanupFrilansArbeidssituasjon', () => {
    it('runs', () => {
        expect(1).toBe(1);
    });
    // it('har ikke hatt inntekt som frilanser', () => {
    //     const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
    //         ...frilanserFullFormValues,
    //         harHattInntektSomFrilanser: YesOrNo.NO,
    //     });
    //     const { harHattInntektSomFrilanser, ...rest } = result;
    //     expect(harHattInntektSomFrilanser).toEqual(YesOrNo.NO);
    //     expect(rest).toEqual({});
    // });

    // describe('mottar honorar, jobber ikke som frilanser', () => {
    //     it('mister ikke honorar', () => {
    //         const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
    //             ...frilanserFullFormValues,
    //             harHattInntektSomFrilanser: YesOrNo.YES,
    //             frilanstyper: [Frilanstype.HONORARARBEID],
    //             misterHonorar: YesOrNo.NO,
    //         });
    //         const { harHattInntektSomFrilanser, misterHonorar, frilanstyper, ...rest } = result;
    //         expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    //         expect(misterHonorar).toEqual(YesOrNo.NO);
    //         expect(frilanstyper).toEqual([Frilanstype.HONORARARBEID]);
    //         expect(rest).toEqual({});
    //     });

    //     it('mister honorar', () => {
    //         const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
    //             ...frilanserFullFormValues,
    //             harHattInntektSomFrilanser: YesOrNo.YES,
    //             frilanstyper: [Frilanstype.HONORARARBEID],
    //             misterHonorar: YesOrNo.YES,
    //         });
    //         const {
    //             harHattInntektSomFrilanser,
    //             misterHonorar,
    //             frilanstyper,
    //             arbeidsforholdHonorararbeid,
    //             erFortsattFrilanser,
    //             startdato,
    //             ...rest
    //         } = result;
    //         expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    //         expect(misterHonorar).toEqual(YesOrNo.YES);
    //         expect(erFortsattFrilanser).toBeTruthy();
    //         expect(frilanstyper).toEqual([Frilanstype.HONORARARBEID]);
    //         expect(startdato).toBeDefined();
    //         expect(arbeidsforholdHonorararbeid).toBeDefined();
    //         expect(rest).toEqual({});
    //     });
    // });
    // describe('jobber som frilanser, mottar ikke honorar', () => {
    //     it('jobber fortsatt som frilanser', () => {
    //         const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
    //             ...frilanserFullFormValues,
    //             harHattInntektSomFrilanser: YesOrNo.YES,
    //             frilanstyper: [Frilanstype.FRILANSARBEID],
    //         });
    //         const {
    //             harHattInntektSomFrilanser,
    //             frilanstyper,
    //             startdato,
    //             arbeidsforholdFrilansarbeid,
    //             erFortsattFrilanser,
    //             ...rest
    //         } = result;
    //         expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    //         expect(frilanstyper).toEqual([Frilanstype.FRILANSARBEID]);
    //         expect(erFortsattFrilanser).toBeTruthy();
    //         expect(startdato).toBeDefined();
    //         expect(arbeidsforholdFrilansarbeid).toBeDefined();
    //         expect(rest).toEqual({});
    //     });
    //     it('sluttet som frilanser i perioden', () => {
    //         const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
    //             ...frilanserFullFormValues,
    //             harHattInntektSomFrilanser: YesOrNo.YES,
    //             erFortsattFrilanser: YesOrNo.NO,
    //             frilanstyper: [Frilanstype.FRILANSARBEID],
    //         });
    //         const {
    //             harHattInntektSomFrilanser,
    //             frilanstyper,
    //             startdato,
    //             arbeidsforholdFrilansarbeid,
    //             erFortsattFrilanser,
    //             sluttdato,
    //             ...rest
    //         } = result;
    //         expect(harHattInntektSomFrilanser).toEqual(YesOrNo.YES);
    //         expect(frilanstyper).toEqual([Frilanstype.FRILANSARBEID]);
    //         expect(erFortsattFrilanser).toBeTruthy();
    //         expect(startdato).toBeDefined();
    //         expect(sluttdato).toBeDefined();
    //         expect(arbeidsforholdFrilansarbeid).toBeDefined();
    //         expect(rest).toEqual({});
    //     });
    // });
});
