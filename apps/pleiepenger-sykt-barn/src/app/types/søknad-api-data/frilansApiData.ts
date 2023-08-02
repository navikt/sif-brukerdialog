import { ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdApiData } from './arbeidsforholdApiData';
// import { ArbeidsforholdApiData } from './arbeidsforholdApiData';

/**
 * Frilansarbeid er litt annerledes enn andre arbeidsforhold og med vi ut mot bruker spør om både
 * frilansarbeid og arbeid bruker mottar honorar for (honorararbeid) hver for seg. Da det bare er
 * ett datasett som sendes videre inn til K9, er FrilansApiData struktrert opp slik:
 *
 * - frilansarbeid: svar som kun er relatert til frilansarbeidet.
 *   Verdier sendes ikke til K9
 *
 * - frilansarbeid: svar som kun er relatert til honorararbeid.
 *   Verdier sendes ikke til K9
 *
 * - arbeidsforhold: aggregert informasjon basert på frilansarbeid og
 *   honorararbeid over. Dette brukes og sendes videre til K9.
 */

export enum FrilansApiType {
    'INGEN_INNTEKT_FROM_FRILANSER' = 'INGEN_INNTEKT_FROM_FRILANSER',
    'KUN_HONORARARBEID_MISTER_IKKE_HONORAR' = 'KUN_HONORARARBEID_MISTER_IKKE_HONORAR',
    'KUN_FRILANSARBEID' = 'KUN_FRILANSARBEID',
    'KUN_HONORARARBEID_MISTER_HONORAR' = 'KUN_HONORARARBEID_MISTER_HONORAR',
    'FRILANSARBEID_OG_HONORARARBEID' = 'FRILANSARBEID_OG_HONORARARBEID',
}

export interface FrilansarbeidApiData {
    // timerNormalt: ISODuration;
    // arbeidIPeriodeSvar?: ArbeiderIPeriodenSvar;
    arbeidsforhold: ArbeidsforholdApiData;
}

type HonorararbeidMisterIkkeHonorar = {
    misterHonorar: false;
    arbeidsforhold?: ArbeidsforholdApiData;
    // timerNormalt?: ISODuration; // Påkrevd dersom bruker også har frilansarbeid. Da trenger vi dette for å regne ut redusert arbeidstid.
};

type HonorararbeidMisterHonorar = {
    misterHonorar: true;
    arbeidsforhold: ArbeidsforholdApiData;
};

export type HonorararbeidApiData = HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;

export type FrilanserMedArbeidsforholdApiDataPart = {
    harInntektSomFrilanser: true;
    erFortsattFrilanser: boolean;
    startdato: ISODate;
    sluttdato?: ISODate;
};

export type FrilansApiDataIngenInntekt = {
    type: FrilansApiType.INGEN_INNTEKT_FROM_FRILANSER;
    harInntektSomFrilanser: false;
};

export type FrilansApiDataKunHonorararbeidMisterIkkeHonorar = {
    type: FrilansApiType.KUN_HONORARARBEID_MISTER_IKKE_HONORAR;
    harInntektSomFrilanser: true;
    honorararbeid: HonorararbeidMisterIkkeHonorar;
};

export type FrilansApiDataKunFrilansarbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.KUN_FRILANSARBEID;
    frilansarbeid: FrilansarbeidApiData;
};

export type FrilansApiDataKunHonorararbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.KUN_HONORARARBEID_MISTER_HONORAR;
    honorararbeid: HonorararbeidMisterHonorar;
};

export type FrilansApiDataFrilansarbeidOgHonorararbeid = FrilanserMedArbeidsforholdApiDataPart & {
    type: FrilansApiType.FRILANSARBEID_OG_HONORARARBEID;
    frilansarbeid: FrilansarbeidApiData;
    honorararbeid: HonorararbeidApiData;
};

export type FrilansApiData =
    | FrilansApiDataIngenInntekt
    | FrilansApiDataKunHonorararbeidMisterIkkeHonorar
    | FrilansApiDataKunFrilansarbeid
    | FrilansApiDataKunHonorararbeid
    | FrilansApiDataFrilansarbeidOgHonorararbeid;

// /** Eksempler */
// const frilanserMedIngenInntekt: FrilanserIngenInntekt = {
//     harInntektSomFrilanser: false,
// };

// /**  Både frilanser og styreverv */
// const frilanserFrilansarbeidOgstyreverv: FrilanserFrilansarbeidOgHonorararbeid = {
//     harInntektSomFrilanser: true, // Bruker har svart at en jobber som frilanser eller mottar honorar
//     erFortsattFrilanser: true, // Bruker har svart at en forstatt er frilanser
//     startdato: '2020-01-01', // Startdato for når en startet som frilanser eller å motta honorar
//     frilansarbeid: {
//         // Brukers svar om frilansarbeidet. Brukes kun i PDF
//         timerNormalt: 'PT2H',
//         arbeidIPeriodeSvar: ArbeiderIPeriodenSvar.somVanlig,
//     },
//     honorararbeid: {
//         // Brukers svar om styrevern. Brukes kun i PDF
//         misterHonorar: true,
//         timerNormalt: 'PT5H',
//         arbeidIPeriodeSvar: ArbeiderIPeriodenSvar.heltFravær,
//     },
//     arbeidsforhold: {
//         // Brukers svar om arbeidsforholdet - utledet av brukers svar i frilansarbeid og styreverv
//         normalarbeidstid: {
//             // Slås sammen ut fra styreverv og frilansarbeid
//             timerPerUkeISnitt: 'PT7H',
//         },
//         arbeidIPeriode: {
//             type: ArbeidIPeriodeType.arbeiderRedusert, // Settes ut fra hvilke valg bruker har gjort i frilansarbeid og styreverv
//             redusertArbeid: {
//                 type: RedusertArbeidstidType.timerISnittPerUke,
//                 timerPerUke: 'PT5H', // Regnet ut basert på arbeidIPeriodenSvar for frialansarbeid og styreverv
//             },
//         },
//     },
// };

// /**  Kun frilanser */
// const kunFrilansarbeid: FrilanserKunFrilansarbeid = {
//     harInntektSomFrilanser: true, // Bruker har svart at en jobber som frilanser eller mottar honorar
//     erFortsattFrilanser: true, // Bruker har svart at en forstatt er frilanser
//     startdato: '2020-01-01', // Startdato for når en startet som frilanser eller å motta honorar
//     frilansarbeid: {
//         // Brukers svar om frilansarbeidet. Brukes kun i PDF
//         timerNormalt: 'PT2H',
//         arbeidIPeriodeSvar: ArbeiderIPeriodenSvar.somVanlig,
//     },
//     arbeidsforhold: {
//         normalarbeidstid: {
//             timerPerUkeISnitt: 'PT2H',
//         },
//         arbeidIPeriode: {
//             type: ArbeidIPeriodeType.arbeiderVanlig,
//         },
//     },
// };
