// import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
// import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
// import { FrilansFormData } from '../../../../types/FrilansFormData';
// import { ArbeiderIPeriodenSvar } from '../../../../local-sif-common-pleiepenger';

// const søknadsperiode = ISODateRangeToDateRange('2021-01-02/2022-01-01');

// const frilanserSluttetIPeriodeValues: FrilansFormData = {
//     harHattInntektSomFrilanser: YesOrNo.YES,
//     arbeidsforhold: {
//         normalarbeidstid: { timerPerUke: '10' },
//         arbeidIPeriode: {
//             arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
//         },
//     },
//     startdato: '2021-02-02',
// };

/*const frilansoppdrag: Arbeidsgiver[] = [
    {
        type: ArbeidsgiverType.FRILANSOPPDRAG,
        id: '123',
        navn: 'Teest',
    },
];
*/
describe('cleanupFrilansArbeidssituasjon', () => {
    describe('når bruker har frilansoppdrag', () => {
        it('TODO', () => {
            expect(1).toBe(1);
        });
        /* it('beholder riktig informasjon når bruker har frilansoppdrag i søknadsperiode', () => {
            const result = cleanupFrilansArbeidssituasjon(
                søknadsperiode,
                {
                    ...frilanserSluttetIPeriodeValues,
                    erFortsattFrilanser: YesOrNo.YES,
                },
                frilansoppdrag
            );
            expect(result.harHattInntektSomFrilanser).toBeUndefined();
            expect(result.erFortsattFrilanser).toBeDefined();
            expect(result.arbeidsforhold).toBeDefined();
            expect(result.arbeidsforhold?.arbeidIPeriode).toBeDefined();
            expect(result.arbeidsforhold?.normalarbeidstid?.timerPerUke).toBeDefined();
            expect(result.startdato).toBeDefined();
            expect(result.sluttdato).toBeUndefined();
        });
        it('beholder riktig informasjon når bruker slutter som frilanser i søknadsperiode', () => {
            const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
                ...frilanserSluttetIPeriodeValues,
                harHattInntektSomFrilanser: YesOrNo.YES,
                erFortsattFrilanser: YesOrNo.NO,
            });
            expect(result.harHattInntektSomFrilanser).toBeUndefined();
            expect(result.erFortsattFrilanser).toBeDefined();
            expect(result.arbeidsforhold).toBeDefined();
            expect(result.arbeidsforhold?.arbeidIPeriode).toBeDefined();
            expect(result.arbeidsforhold?.normalarbeidstid?.timerPerUke).toBeDefined();
            expect(result.startdato).toBeDefined();
            expect(result.sluttdato).toBeDefined();
        });
        it('beholder riktig informasjon når bruker sluttet før søknadsperiode', () => {
            const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
                ...frilanserSluttetIPeriodeValues,
                harHattInntektSomFrilanser: YesOrNo.YES,
                erFortsattFrilanser: YesOrNo.NO,
                sluttdato: '2021-01-01',
            });
            expect(result.harHattInntektSomFrilanser).toBeUndefined();
            expect(result.erFortsattFrilanser).toBeDefined();
            expect(result.arbeidsforhold).toBeUndefined();
            expect(result.startdato).toBeDefined();
            expect(result.sluttdato).toBeDefined();
        });*/
    });
    describe('når bruker ikke har frilansoppdrag', () => {
        /*it('fjerner alle unødvendig data når bruker ikke er frilanser', () => {
            const result = cleanupFrilansArbeidssituasjon(
                søknadsperiode,
                { ...frilanserSluttetIPeriodeValues, harHattInntektSomFrilanser: YesOrNo.NO },
                
            );
            expect(result.harHattInntektSomFrilanser).toBeDefined();
            expect(result.erFortsattFrilanser).toBeUndefined();
            expect(result.arbeidsforhold).toBeUndefined();
            expect(result.startdato).toBeUndefined();
            expect(result.sluttdato).toBeUndefined();
        });*/
        // it('beholder riktig informasjon når bruker er frilanser i søknadsperiode', () => {
        //     const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
        //         ...frilanserSluttetIPeriodeValues,
        //         harHattInntektSomFrilanser: YesOrNo.YES,
        //     });
        //     expect(result.harHattInntektSomFrilanser).toBeDefined();
        //     expect(result.arbeidsforhold).toBeDefined();
        //     expect(result.arbeidsforhold?.arbeidIPeriode).toBeDefined();
        //     expect(result.arbeidsforhold?.normalarbeidstid?.timerPerUke).toBeDefined();
        //     expect(result.startdato).toBeDefined();
        // });
        /*
        it('beholder riktig informasjon når bruker slutter som frilanser i søknadsperiode', () => {
            const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
                ...frilanserSluttetIPeriodeValues,
                harHattInntektSomFrilanser: YesOrNo.YES,
                erFortsattFrilanser: YesOrNo.NO,
            });
            expect(result.harHattInntektSomFrilanser).toBeDefined();
            expect(result.erFortsattFrilanser).toBeDefined();
            expect(result.arbeidsforhold).toBeDefined();
            expect(result.arbeidsforhold?.arbeidIPeriode).toBeDefined();
            expect(result.arbeidsforhold?.normalarbeidstid?.timerPerUke).toBeDefined();
            expect(result.startdato).toBeDefined();
            expect(result.sluttdato).toBeDefined();
        });
        /*
        it('beholder riktig informasjon når bruker sluttet før søknadsperiode', () => {
            const result = cleanupFrilansArbeidssituasjon(søknadsperiode, {
                ...frilanserSluttetIPeriodeValues,
                harHattInntektSomFrilanser: YesOrNo.YES,
                erFortsattFrilanser: YesOrNo.NO,
                sluttdato: '2021-01-01',
            });
            expect(result.harHattInntektSomFrilanser).toBeDefined();
            expect(result.erFortsattFrilanser).toBeDefined();
            expect(result.arbeidsforhold).toBeUndefined();
            expect(result.startdato).toBeDefined();
            expect(result.sluttdato).toBeDefined();
        });*/
    });
});
