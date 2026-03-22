import { DateRange } from '@navikt/sif-common-utils';

export type BostedUtland = {
    id: string;
    periode: DateRange;
    landkode: string;
    landnavn: string;
};

export * from './BostedUtlandDialog';
export * from './BostedUtlandForm';
export * from './BostedUtlandList';
