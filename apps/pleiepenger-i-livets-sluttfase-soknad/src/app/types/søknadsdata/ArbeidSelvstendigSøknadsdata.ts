import { Virksomhet } from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/types';

export interface ArbeidSelvstendigSøknadsdataErIkkeSN {
    type: 'erIkkeSN';
    erSelvstendigNæringsdrivende: false;
}
export interface ArbeidSelvstendigSøknadsdataErSN {
    type: 'erSN';
    erSelvstendigNæringsdrivende: true;
    harFlereVirksomheter: boolean;
    virksomhet: Virksomhet;
    jobberNormaltTimer: number;
}

export type ArbeidSelvstendigSøknadsdata = ArbeidSelvstendigSøknadsdataErIkkeSN | ArbeidSelvstendigSøknadsdataErSN;
