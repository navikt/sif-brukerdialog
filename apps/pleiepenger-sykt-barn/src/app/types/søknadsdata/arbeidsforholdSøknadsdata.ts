import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

export interface ArbeidsforholdSøknadsdata {
    /** Periode innenfor søknadsperiode */
    aktivPeriode: DateRange;
    /** Hvor mye en jobber normalt */
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    /** Arbeidet som gjennomføres i søknadsperioden */
    arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata;
}
