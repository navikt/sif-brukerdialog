import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { FrilansTyper } from '../FrilansFormData';
import { ArbeidsforholdSøknadsdata } from './arbeidsforholdSøknadsdata';

export interface ArbeidFrilansSøknadsdataErIkkeFrilanser {
    type: 'erIkkeFrilanser';
    erFrilanser: false;
}

export interface ArbeidFrilansSøknadsdataPågående {
    type: 'pågående';
    erFrilanser: true;
    frilansType: FrilansTyper[];
    misterHonorar?: YesOrNo;
    startdato: Date;
    aktivPeriode: DateRange;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}

export interface ArbeidFrilansSøknadsdataSluttetISøknadsperiode {
    type: 'sluttetISøknadsperiode';
    erFrilanser: true;
    frilansType: FrilansTyper[];
    misterHonorar?: YesOrNo;
    startdato: Date;
    erFortsattFrilanser: false;
    sluttdato: Date;
    aktivPeriode: DateRange;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}

export interface ArbeidFrilansKunStyrevervSøknadsdataPågående {
    type: 'pågåendeKunStyreverv';
    erFrilanser: true;
    frilansType: [FrilansTyper.STYREVERV];
    misterHonorar: YesOrNo.NO;
}

export type ArbeidFrilansSøknadsdata =
    | ArbeidFrilansSøknadsdataErIkkeFrilanser
    | ArbeidFrilansSøknadsdataPågående
    | ArbeidFrilansSøknadsdataSluttetISøknadsperiode
    | ArbeidFrilansKunStyrevervSøknadsdataPågående;
