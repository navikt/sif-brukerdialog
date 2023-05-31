import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { ArbeidsforholdSøknadsdata } from './Søknadsdata';

export interface ArbeidSelvstendigSøknadsdataErIkkeSN {
    type: 'erIkkeSN';
    erSN: false;
}
export interface ArbeidSelvstendigSøknadsdataErSN {
    type: 'erSN';
    erSN: true;
    startdato: Date;
    virksomhet: Virksomhet;
    harFlereVirksomheter: boolean;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}

export type ArbeidSelvstendigSøknadsdata = ArbeidSelvstendigSøknadsdataErIkkeSN | ArbeidSelvstendigSøknadsdataErSN;
