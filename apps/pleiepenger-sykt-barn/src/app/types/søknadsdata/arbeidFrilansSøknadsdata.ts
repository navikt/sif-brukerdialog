// // import { DateRange } from '@navikt/sif-common-utils/lib';
// import { ArbeidsforholdSøknadsdata } from './arbeidsforholdSøknadsdata';

// type HonorararbeidMisterIkkeHonorar = {
//     misterHonorar: false;
// };

// type HonorararbeidMisterHonorar = {
//     misterHonorar: true;
// };

// export type ArbeidsforholdHonorararbeid =
//     | HonorararbeidMisterIkkeHonorar
//     | (HonorararbeidMisterHonorar & ArbeidsforholdSøknadsdata);

// export type FrilanserMisterInntekt = {
//     harInntektSomFrilanser: true;
//     misterInntektSomFrilanserIPeriode: true;
//     erFortsattFrilanser: boolean;
//     startdato: Date;
//     sluttdato?: Date;
//     arbeidsforholdFrilansarbeid?: ArbeidsforholdSøknadsdata;
//     arbeidsforholdHonorararbeid?: ArbeidsforholdHonorararbeid;
//     arbeidsforhold: ArbeidsforholdSøknadsdata; // Aggregert informasjon fra honorararbeid og frilansarbeid + egne spørsmål
// };

// export const erFrilanserSomMisterInntekt = (frilanser: any): frilanser is FrilanserMisterInntekt => {
//     return frilanser.harInntektSomFrilanser && frilanser.misterInntektSomFrilanserIPeriode;
// };

// /** Frilanstyper */

// export type FrilansSøknadsdataIngenInntektSomFrilanser = {
//     harInntektSomFrilanser: false;
// };

// export type FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
//     harInntektSomFrilanser: true;
//     misterInntektSomFrilanserIPeriode: false;
//     arbeidsforholdHonorararbeid: HonorararbeidMisterIkkeHonorar;
// };

// export type FrilansSøknadsdataKunHonorararbeidMisterHonorar = FrilanserMisterInntekt & {
//     arbeidsforholdFrilansarbeid: undefined;
//     arbeidsforholdHonorararbeid: ArbeidsforholdSøknadsdata & HonorararbeidMisterHonorar;
// };

// export type FrilansSøknadsdataKunFrilansarbeid = FrilanserMisterInntekt & {
//     arbeidsforholdFrilansarbeid: ArbeidsforholdSøknadsdata;
//     arbeidsforholdHonorararbeid: undefined;
// };

// export type FrilansSøknadsdataFrilansarbeidOgHonorararbeid = FrilanserMisterInntekt & {
//     arbeidsforholdFrilansarbeid: ArbeidsforholdSøknadsdata;
//     arbeidsforholdHonorararbeid: ArbeidsforholdHonorararbeid;
// };

// export type FrilanserSøknadsdata =
//     | FrilansSøknadsdataIngenInntektSomFrilanser
//     | FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar
//     | FrilansSøknadsdataKunFrilansarbeid
//     | FrilansSøknadsdataKunHonorararbeidMisterHonorar
//     | FrilansSøknadsdataFrilansarbeidOgHonorararbeid;
