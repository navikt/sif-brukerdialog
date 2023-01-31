import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEnkeltdagMap, ArbeidsukeMap } from './K9Sak';

export interface PeriodeMedArbeidstid {
    periode: DateRange;
    enkeltdager: ArbeidstidEnkeltdagMap;
    arbeidsuker: ArbeidsukeMap;
}
