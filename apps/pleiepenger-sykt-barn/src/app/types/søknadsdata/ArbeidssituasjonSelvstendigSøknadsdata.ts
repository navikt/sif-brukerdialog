import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { DateRange } from '@navikt/sif-common-utils/lib';
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
