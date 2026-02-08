import { DateDurationMap, ISODate } from '@navikt/sif-common-utils';
import { Duration } from 'date-fns';

export type Omsorgsdag = {
    opprinneligTid?: Duration;
    nyTid?: Duration;
    erEndret: boolean;
};

export type OmsorgsdagerMap = {
    [isoDate: ISODate]: Omsorgsdag;
};

export interface OmsorgstilbudSøknadsdata {
    enkeltdager: DateDurationMap;
    // opprinneligEnkeltdager: DateDurationMap;
    // /** Alle ukedager hvor en har søkt pleiepenger - innenfor perioden(e) en har søkt for */
    // omsorgsdagerMap: OmsorgsdagerMap;
}
