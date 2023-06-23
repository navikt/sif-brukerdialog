// /* eslint-disable @typescript-eslint/no-unused-vars */
// // import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
// // import { dateToISODate } from '@navikt/sif-common-utils/lib';
// // import { MisterHonorarerFraVervIPerioden } from '../../types/ArbeidIPeriodeFormValues';
// // import { FrilansTyper } from '../../types/FrilansFormData';
// import { FrilansApiData } from '../../types/søknad-api-data/SøknadApiData';
// import { ArbeidFrilansSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
// // import { getArbeidsforholdFrilansApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
// // import { ArbeidIPeriodeFrilansSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeFrilansSøknadsdata';

// export const getFrilansApiDataFromSøknadsdata = (
//     arbeidFrilansSøknadsdata: ArbeidFrilansSøknadsdata | undefined
// ): FrilansApiData => {
//     return {} as FrilansApiData;
//     // if (!arbeidFrilansSøknadsdata || arbeidFrilansSøknadsdata.type === 'erIkkeFrilanser') {
//     //     return {
//     //         type: 'ingenIntekt',
//     //         harInntektSomFrilanser: false,
//     //     };
//     // }
//     // const getMisterHonorarerIPerioden = (
//     //     arbeidIPeriodeFrilans: ArbeidIPeriodeFrilansSøknadsdata
//     // ): MisterHonorarerFraVervIPerioden | undefined => arbeidIPeriodeFrilans.misterHonorarerFraVervIPerioden;

//     // switch (arbeidFrilansSøknadsdata.type) {
//     //     case 'pågående':
//     //         return {
//     //             type: 'harArbeidsforhold',
//     //             harInntektSomFrilanser: true,
//     //             startdato: dateToISODate(arbeidFrilansSøknadsdata.startdato),
//     //             jobberFortsattSomFrilans: true,
//     //             frilansTyper: arbeidFrilansSøknadsdata.frilansType,
//     //             misterHonorarer: arbeidFrilansSøknadsdata.misterHonorar
//     //                 ? arbeidFrilansSøknadsdata.misterHonorar === YesOrNo.YES
//     //                     ? true
//     //                     : false
//     //                 : undefined,
//     //             misterHonorarerIPerioden: getMisterHonorarerIPerioden(
//     //                 arbeidFrilansSøknadsdata.arbeidsforhold.arbeidISøknadsperiode as ArbeidIPeriodeFrilansSøknadsdata
//     //             ),
//     //             arbeidsforhold: getArbeidsforholdFrilansApiDataFromSøknadsdata(arbeidFrilansSøknadsdata.arbeidsforhold),
//     //         };
//     //     case 'sluttetISøknadsperiode':
//     //         return {
//     //             type: 'harArbeidsforholdSluttetISøknadsperiode',
//     //             harInntektSomFrilanser: true,
//     //             startdato: dateToISODate(arbeidFrilansSøknadsdata.startdato),
//     //             jobberFortsattSomFrilans: false,
//     //             sluttdato: dateToISODate(arbeidFrilansSøknadsdata.sluttdato),
//     //             frilansTyper: arbeidFrilansSøknadsdata.frilansType,
//     //             misterHonorarer: arbeidFrilansSøknadsdata.misterHonorar
//     //                 ? arbeidFrilansSøknadsdata.misterHonorar === YesOrNo.YES
//     //                     ? true
//     //                     : false
//     //                 : undefined,
//     //             misterHonorarerIPerioden: getMisterHonorarerIPerioden(
//     //                 arbeidFrilansSøknadsdata.arbeidsforhold.arbeidISøknadsperiode as ArbeidIPeriodeFrilansSøknadsdata
//     //             ),
//     //             arbeidsforhold: getArbeidsforholdFrilansApiDataFromSøknadsdata(arbeidFrilansSøknadsdata.arbeidsforhold),
//     //         };

//     //     case 'pågåendeKunHonorararbeid':
//     //         return {
//     //             type: 'harIkkeArbeidsforhold',
//     //             harInntektSomFrilanser: true,
//     //             frilansTyper: [FrilansTyper.HONORARARBEID],
//     //             misterHonorarer: false,
//     //         };
//     // }
// };
