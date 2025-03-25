import { DateRange } from '@navikt/sif-common-utils';

export interface Rapporteringsperiode {
    periode: DateRange;
    harRapportert: boolean;
    kanRapportere: boolean;
    fristForRapportering: Date;
    inntekt: {
        arbeidOgFrilansInntekter: number;
        ytelseInntekter: number;
        summertInntekt: number;
    };
}
