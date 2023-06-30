import { DateRange } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';
import { ArbeidsforholdSøknadsdata } from './ArbeidsforholdSøknadsdata';

interface Frilansarbeid {
    normalarbeidstid?: NormalarbeidstidSøknadsdata;
}

type HonorararbeidMisterIkkeHonorar = {
    misterHonorar: false;
    normalarbeidstid?: NormalarbeidstidSøknadsdata; // Påkrevd dersom bruker også har frilansarbeid. Da trenger vi dette for å regne ut redusert arbeidstid.
};

type HonorararbeidMisterHonorar = {
    misterHonorar: true;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
};

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
    honorararbeid?: HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;
    frilansarbeid?: Frilansarbeid;
    arbeidsforhold: ArbeidsforholdSøknadsdata; // Aggregert informasjon fra honorararbeid og frilansarbeid + egne spørsmål
};

/** Frilanstyper */

export type FrilansSøknadsdataIngenInntektSomFrilanser = {
    harInntektSomFrilanser: false;
};

export type FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
    harInntektSomFrilanser: true;
    misterInntektSomFrilanserIPeriode: false;
    honorararbeid: HonorararbeidMisterIkkeHonorar;
};

export type FrilansSøknadsdataKunHonorararbeidMisterHonorar = FrilanserMisterInntekt & {
    honorararbeid: HonorararbeidMisterHonorar;
    frilansarbeid: undefined;
};

export type FrilansSøknadsdataKunFrilansarbeid = FrilanserMisterInntekt & {
    honorararbeid: undefined;
    frilansarbeid: Frilansarbeid;
};

export type FrilansSøknadsdataFrilansarbeidOgHonorararbeid = FrilanserMisterInntekt & {
    frilansarbeid: Frilansarbeid;
    honorararbeid: HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;
};

export type FrilanserSøknadsdata =
    | FrilansSøknadsdataIngenInntektSomFrilanser
    | FrilansSøknadsdataKunFrilansarbeid
    | FrilansSøknadsdataKunHonorararbeidMisterHonorar
    | FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar
    | FrilansSøknadsdataFrilansarbeidOgHonorararbeid;
