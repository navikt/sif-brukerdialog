import { Virksomhet } from '@navikt/sif-common-forms-ds/src';
import { DateRange } from '@navikt/sif-common-utils';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

interface ArbeidsituasjonSelvstendigSøknadsdataErIkkeSN {
    erSN: false;
}
interface ArbeidsituasjonSelvstendigSøknadsdataErSN {
    erSN: true;
    periodeSomSelvstendigISøknadsperiode?: DateRange;
    virksomhet: Virksomhet;
    harFlereVirksomheter: boolean;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
}

export type ArbeidssituasjonSelvstendigSøknadsdata =
    | ArbeidsituasjonSelvstendigSøknadsdataErIkkeSN
    | ArbeidsituasjonSelvstendigSøknadsdataErSN;
