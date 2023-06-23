import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { Frilanstype } from '../FrilansFormData';
import { ArbeidsforholdSøknadsdata } from './ArbeidsforholdSøknadsdata';

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
