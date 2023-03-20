import { DateRange } from '@navikt/sif-common-utils/lib';

export interface LovbestemtFerieEndringer {
    erEndret: boolean;
    dagerLagtTil: Date[];
    dagerFjernet: Date[];
    dagerUendret: Date[];
    perioderLagtTil: DateRange[];
    perioderFjernet: DateRange[];
    perioderUendret: DateRange[];
}
