import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEnkeltdagMap, Arbeidsuke } from './K9Sak';

export interface PeriodeMedArbeidstid {
    periode: DateRange;
    enkeltdager: ArbeidstidEnkeltdagMap;
    arbeidsuker: Arbeidsuke[];
}
