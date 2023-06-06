import { ISODate } from '@navikt/sif-common-utils/lib/types';

export interface HarIkkeInntektFrilans {
    harInntektSomFrilanser: false;
}

export interface HarInntektJobberFortsattFrilans {
    harInntektSomFrilanser: true;
    startdato: ISODate;
    jobberFortsattSomFrilans: true;
}

export interface HarInntektSluttetIPeriodenFrilans {
    harInntektSomFrilanser: true;
    startdato: ISODate;
    jobberFortsattSomFrilans: false;
    sluttdato: ISODate;
}

export type FrilansApiData =
    | HarIkkeInntektFrilans
    | HarInntektJobberFortsattFrilans
    | HarInntektSluttetIPeriodenFrilans;
