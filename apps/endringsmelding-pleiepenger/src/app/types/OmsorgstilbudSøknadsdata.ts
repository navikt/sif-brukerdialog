import { DateDurationMap } from '@navikt/sif-common-utils';

export interface OmsorgstilbudMeta {
    erEndret: boolean;
}

export interface OmsorgstilbudSøknadsdata {
    enkeltdager: DateDurationMap;
    enkeltdagerMeta: OmsorgstilbudMeta;
}
