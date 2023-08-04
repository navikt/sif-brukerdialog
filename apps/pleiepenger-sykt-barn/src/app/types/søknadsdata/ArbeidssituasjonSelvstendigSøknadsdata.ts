import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

interface ArbeidsituasjonSelvstendigSøknadsdataErIkkeSN {
    erSN: false;
}
interface ArbeidsituasjonSelvstendigSøknadsdataErSN {
    erSN: true;
    // erSelvstendigISøknadsperiode: boolean;
    periodeSomSelvstendigISøknadsperiode?: DateRange;
    // startdato: Date;
    virksomhet: Virksomhet;
    harFlereVirksomheter: boolean;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
}

export type ArbeidssituasjonSelvstendigSøknadsdata =
    | ArbeidsituasjonSelvstendigSøknadsdataErIkkeSN
    | ArbeidsituasjonSelvstendigSøknadsdataErSN;
