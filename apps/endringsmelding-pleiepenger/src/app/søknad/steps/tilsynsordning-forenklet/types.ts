import { DateRange, DurationWeekdays } from '@navikt/sif-common-utils';

export type TilsynsordningEndring = {
    id?: string;
    periode: DateRange;
    ukedager: DurationWeekdays;
};
