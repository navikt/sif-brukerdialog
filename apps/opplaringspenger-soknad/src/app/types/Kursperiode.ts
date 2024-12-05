import { DateRange } from '@navikt/sif-common-formik-ds';

export interface Kursperiode {
    id: string;
    periode: DateRange;
    periodeMedReise: DateRange;
    harTaptArbeidstid?: boolean;
    avreise?: Date;
    hjemkomst?: Date;
    beskrivelseReisetid?: string;
}
