import { DateDurationMap, ISODate } from '@navikt/sif-common-utils';
import { Duration } from 'date-fns';

export type Tilsynsdag = {
    opprinneligTid?: Duration;
    nyTid?: Duration;
    erEndret: boolean;
};

export type TilsynsdagerMap = {
    [isoDate: ISODate]: Tilsynsdag;
};

export interface TilsynsordningSøknadsdata {
    tilsynsdager: DateDurationMap;
}
