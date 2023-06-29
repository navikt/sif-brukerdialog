import { ISODate, ISODuration } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidsforholdApiData } from './ArbeidsforholdApiData';

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

interface Frilansarbeid {
    timerNormalt: ISODuration;
    arbeidIPeriodeSvar?: ArbeiderIPeriodenSvar;
}

type HonorararbeidMisterIkkeHonorar = {
    misterHonorar: false;
    timerNormalt?: ISODuration; // Påkrevd dersom bruker også har frilansarbeid. Da trenger vi dette for å regne ut redusert arbeidstid.
};

type HonorararbeidMisterHonorar = {
    misterHonorar: true;
    timerNormalt: ISODuration;
    arbeidIPeriodeSvar: ArbeiderIPeriodenSvar.redusert | ArbeiderIPeriodenSvar.heltFravær;
};

type Honorararbeid = HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;

type FrilanserAvsluttetIPeriodePart = {
    harInntektSomFrilanser: true;
    erFortsattFrilanser: false;
    sluttdato: ISODate;
    arbeidsforhold: ArbeidsforholdApiData /** Informasjon fra frilansarbeid og honorararbeid samles i arbeidsforhold, og sendes videre til k9sak */;
};

type FrilanserPågåendePart = {
    harInntektSomFrilanser: true;
    erFortsattFrilanser: true;
};

type FrilanserMedArbeidsforholdPart =
    | FrilanserAvsluttetIPeriodePart
    | (FrilanserPågåendePart & {
          startdato: ISODate;
          arbeidsforhold: ArbeidsforholdApiData;
      });

export type FrilansApiDataIngenInntekt = {
    harInntektSomFrilanser: false;
};

export type FrilansApiDataKunFrilansarbeid = FrilanserMedArbeidsforholdPart & { frilansarbeid: Frilansarbeid };

export type FrilansApiDataKunHonorararbeid = FrilanserMedArbeidsforholdPart & {
    honorararbeid: Honorararbeid;
};

export type FrilansApiDataFrilansarbeidOgHonorararbeid = FrilanserMedArbeidsforholdPart & {
    frilansarbeid: Frilansarbeid;
    honorararbeid: Honorararbeid;
};

export type FrilansApiData =
    | FrilansApiDataIngenInntekt
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
