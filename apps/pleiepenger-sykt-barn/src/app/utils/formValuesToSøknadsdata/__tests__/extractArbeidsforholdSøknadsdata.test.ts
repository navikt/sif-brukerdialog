// TODO
describe('extractArbeidsforholdSøknadsdata', () => {
    it('todo', () => {
        expect(1).toBe(1);
    });
});

// import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
// import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
// import { ArbeidsgiverType, TimerEllerProsent } from '../../../types';
// import { ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
// import { ArbeidsforholdFormValues } from '../../../types/ArbeidsforholdFormValues';
// import { extractArbeidsforholdSøknadsdata } from '../extractArbeidsforholdSøknadsdata';

// const mockArbeidIPeriodeFormData = {} as ArbeidIPeriodeFormValues;

// describe('extractArbeidsforholdSøknadsdata', () => {
//     const arbeidsforholdMedFravær: ArbeidsforholdFormValues = {
//         arbeidsgiver: { type: ArbeidsgiverType.ORGANISASJON, navn: 'Org1', id: '1' },
//         erAnsatt: YesOrNo.YES,
//         arbeidIPeriode: mockArbeidIPeriodeFormData,
//         normalarbeidstid: {
//             timerPerUke: '20',
//         },
//     };
//     it('returnerer undefined dersom normalarbeidstid er ugyldig', () => {
//         const result = extractArbeidsforholdSøknadsdata({ ...arbeidsforholdMedFravær, normalarbeidstid: undefined });
//         expect(result).toBeUndefined();
//     });
//     it('returnerer arbeidsforhold korrekt når arbeidIPeriode ikke er satt', () => {
//         const result = extractArbeidsforholdSøknadsdata({ ...arbeidsforholdMedFravær, arbeidIPeriode: undefined });
//         expect(result).toBeDefined();
//         expect(result?.normalarbeidstid).toBeDefined();
//         expect(result?.arbeidISøknadsperiode).toBeUndefined();
//     });
//     it('returnerer arbeidsforhold korrekt når arbeidIPeriode er satt', () => {
//         const result = extractArbeidsforholdSøknadsdata({
//             ...arbeidsforholdMedFravær,
//             arbeidIPeriode: {
//                 arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
//                 snittTimerPerUke: '20',
//                 erLiktHverUke: YesOrNo.YES,
//                 timerEllerProsent: TimerEllerProsent.TIMER,
//             },
//         });
//         expect(result).toBeDefined();
//         expect(result?.normalarbeidstid).toBeDefined();
//         expect(result?.arbeidISøknadsperiode).toBeDefined();
//     });
// });
