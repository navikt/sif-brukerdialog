import { ISODateRange } from '@navikt/sif-common-utils';

export interface ArbeidstidEndring {
    timer: number;
}

export type ArbeidstidEndringMap = {
    [uke: ISODateRange]: ArbeidstidEndring;
};
