import { DateRange, DurationWeekdays, ISODateRange } from '@navikt/sif-common-utils';

export type TilsynsordningPeriodeData = {
    id?: string;
    periode: DateRange;
    tidFasteDager: DurationWeekdays;
};

export type SøknadsperiodeTilsynsordningEndringer = Record<ISODateRange, TilsynsordningPeriodeData[]>;
