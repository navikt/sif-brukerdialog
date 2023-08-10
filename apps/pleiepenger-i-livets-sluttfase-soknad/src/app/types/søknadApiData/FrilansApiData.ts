import { ISODate } from '@navikt/sif-common-utils/lib/types';

export interface HarInntektJobberFortsattFrilans {
    startdato: ISODate;
    jobberFortsattSomFrilans: true;
}

export interface HarInntektSluttetIPeriodenFrilans {
    startdato: ISODate;
    jobberFortsattSomFrilans: false;
    sluttdato: ISODate;
}

export type FrilansApiData = HarInntektJobberFortsattFrilans | HarInntektSluttetIPeriodenFrilans;
