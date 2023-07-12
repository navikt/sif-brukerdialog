import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdSøknadsdata } from './ArbeidsforholdSøknadsdata';

type HonorararbeidMisterIkkeHonorar = {
    misterHonorar: false;
};

type HonorararbeidMisterHonorar = {
    misterHonorar: true;
};

type ArbeidsforholdHonorararbeid =
    | HonorararbeidMisterIkkeHonorar
    | (HonorararbeidMisterHonorar & ArbeidsforholdSøknadsdata);

type FrilanserAvsluttetIPeriodePart = {
    erFortsattFrilanser: false;
    startdato: Date;
    sluttdato: Date;
    aktivPeriode: DateRange;
};

type FrilanserPågåendePart = {
    erFortsattFrilanser: true;
    startdato: Date;
    aktivPeriode: DateRange;
};

export type FrilanserPeriodePart = FrilanserAvsluttetIPeriodePart | FrilanserPågåendePart;

export type FrilanserMisterInntekt = {
    harInntektSomFrilanser: true;
    misterInntektSomFrilanserIPeriode: true;
    periodeinfo: FrilanserPeriodePart;
    arbeidsforholdFrilanserarbeid?: ArbeidsforholdSøknadsdata;
    arbeidsforholdHonorararbeid?: ArbeidsforholdHonorararbeid;
    // arbeidsforhold: ArbeidsforholdSøknadsdata; // Aggregert informasjon fra honorararbeid og frilansarbeid + egne spørsmål
};

/** Frilanstyper */

export type FrilansSøknadsdataIngenInntektSomFrilanser = {
    harInntektSomFrilanser: false;
};

export type FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
    harInntektSomFrilanser: true;
    misterInntektSomFrilanserIPeriode: false;
    arbeidsforholdHonorararbeid: HonorararbeidMisterIkkeHonorar;
};

export type FrilansSøknadsdataKunHonorararbeidMisterHonorar = FrilanserMisterInntekt & {
    arbeidsforholdFrilanserarbeid: undefined;
    arbeidsforholdHonorararbeid: ArbeidsforholdSøknadsdata & HonorararbeidMisterHonorar;
};

export type FrilansSøknadsdataKunFrilansarbeid = FrilanserMisterInntekt & {
    arbeidsforholdFrilanserarbeid: ArbeidsforholdSøknadsdata;
    arbeidsforholdHonorararbeid: undefined;
};

export type FrilansSøknadsdataFrilansarbeidOgHonorararbeid = FrilanserMisterInntekt & {
    arbeidsforholdFrilanserarbeid: ArbeidsforholdSøknadsdata;
    arbeidsforholdHonorararbeid: ArbeidsforholdHonorararbeid;
};

export type FrilanserSøknadsdata =
    | FrilansSøknadsdataIngenInntektSomFrilanser
    | FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar
    | FrilansSøknadsdataKunFrilansarbeid
    | FrilansSøknadsdataKunHonorararbeidMisterHonorar
    | FrilansSøknadsdataFrilansarbeidOgHonorararbeid;
