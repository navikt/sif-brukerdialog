import { DateRange } from '@navikt/sif-common-utils/lib';

export interface Ferieuttak extends DateRange {
    id?: string;
}

export type FerieuttakFormValues = {
    from?: string;
    to?: string;
};
