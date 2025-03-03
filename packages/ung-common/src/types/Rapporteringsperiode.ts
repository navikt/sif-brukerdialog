import { DateRange } from '@navikt/sif-common-utils';

export interface Rapporteringsperiode {
    periode: DateRange;
    harRapportert: boolean;
    kanRapportere: boolean;
    fristForRapportering: Date;
    inntekt: {
        arbeidstakerOgFrilansInntekt: number;
        næringsinntekt: number;
        inntektFraYtelse: number;
        summertInntekt: number;
    };
}
