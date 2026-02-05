import { ISODateRange, ISODuration } from '@navikt/sif-common-utils';

export type OmsorgstilbudEndringMap = {
    [uke: ISODateRange]: ISODuration;
};
