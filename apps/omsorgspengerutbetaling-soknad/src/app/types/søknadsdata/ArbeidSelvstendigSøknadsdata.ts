import { Virksomhet } from '@navikt/sif-common-forms-ds/src/forms/virksomhet/types';

export interface ArbeidSelvstendigSøknadsdataErIkkeSN {
    type: 'erIkkeSN';
    erSelvstendigNæringsdrivende: false;
}
export interface ArbeidSelvstendigSøknadsdataErSN {
    type: 'erSN';
    erSelvstendigNæringsdrivende: true;
    harFlereVirksomheter: boolean;
    virksomhet: Virksomhet;
}

export type ArbeidSelvstendigSøknadsdata = ArbeidSelvstendigSøknadsdataErIkkeSN | ArbeidSelvstendigSøknadsdataErSN;
