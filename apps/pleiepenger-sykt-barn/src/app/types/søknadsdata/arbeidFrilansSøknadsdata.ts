import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { Frilanstype } from '../FrilansFormData';
import { ArbeidsforholdSøknadsdata } from './ArbeidsforholdSøknadsdata';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

export interface ArbeidFrilansSøknadsdataErIkkeFrilanser {
    type: 'erIkkeFrilanser';
    erFrilanser: false;
}

export interface ArbeidFrilansSøknadsdataPågående {
    type: 'pågående';
    erFrilanser: true;
    frilansType: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato: Date;
    aktivPeriode: DateRange;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}

export interface ArbeidFrilansSøknadsdataSluttetISøknadsperiode {
    type: 'sluttetISøknadsperiode';
    erFrilanser: true;
    frilansType: Frilanstype[];
    misterHonorar?: YesOrNo;
    startdato: Date;
    sluttdato: Date;
    erFortsattFrilanser: false;
    aktivPeriode: DateRange;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}

export interface ArbeidFrilansKunHonorararbeidSøknadsdataPågående {
    type: 'pågåendeKunHonorararbeid';
    erFrilanser: true;
    frilansType: [Frilanstype.HONORARARBEID];
    misterHonorar: YesOrNo.NO;
}

export type ArbeidFrilansSøknadsdata =
    | ArbeidFrilansSøknadsdataErIkkeFrilanser
    | ArbeidFrilansSøknadsdataPågående
    | ArbeidFrilansSøknadsdataSluttetISøknadsperiode
    | ArbeidFrilansKunHonorararbeidSøknadsdataPågående;

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

export type FrilanserMedInntektPart = {
    harInntektSomFrilanser: true;
    periodeinfo: FrilanserPeriodePart;
};

/** Frilanstyper */

export type FrilansSøknadsdataIngenInntekt = {
    type: 'ingenInntekt';
    harInntektSomFrilanser: false;
};

export type FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar = {
    type: 'kunHonorararbeidMisterIkkeHonorar';
    harInntektSomFrilanser: true;
    honorararbeid: HonorararbeidMisterIkkeHonorar;
};

export type FrilansSøknadsdataKunHonorararbeidMisterHonorar = FrilanserMedInntektPart & {
    type: 'kunHonorararbeidMisterHonorar';
    honorararbeid: HonorararbeidMisterHonorar;
};

export type FrilansSøknadsdataKunFrilansarbeid = FrilanserMedInntektPart & {
    type: 'kunFrilansarbeid';
    frilansarbeid: Frilansarbeid;
};

export type FrilansSøknadsdataFrilansarbeidOgHonorararbeid = FrilanserMedInntektPart & {
    type: 'frilansarbeidOgHonorararbeid';
    frilansarbeid: Frilansarbeid;
    honorararbeid: HonorararbeidMisterIkkeHonorar | HonorararbeidMisterHonorar;
};

export type FrilanserSøknadsdata =
    | FrilansSøknadsdataIngenInntekt
    | FrilansSøknadsdataKunFrilansarbeid
    | FrilansSøknadsdataKunHonorararbeidMisterHonorar
    | FrilansSøknadsdataKunHonorararbeidMisterIkkeHonorar
    | FrilansSøknadsdataFrilansarbeidOgHonorararbeid;
