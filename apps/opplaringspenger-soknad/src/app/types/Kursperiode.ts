import { DateRange } from '@navikt/sif-common-formik-ds';

export interface Kursperiode {
    id: string;
    periode: DateRange;
    periodeMedReise: DateRange;
    avreise?: Date;
    hjemkomst?: Date;
    beskrivelseReisetidTil?: string;
    beskrivelseReisetidHjem?: string;
}
