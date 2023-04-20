import { DateRange } from '@navikt/sif-common-utils';

export interface Ferieuttak extends DateRange {
    id?: string;
}

export type FerieuttakFormValues = {
    from?: string;
    to?: string;
};
