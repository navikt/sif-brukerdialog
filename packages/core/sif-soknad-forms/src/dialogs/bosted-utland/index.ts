import { DateRange } from '@sif/utils';

export type BostedUtland = {
    id: string;
    periode: DateRange;
    landkode: string;
    landnavn: string;
};

export * from './BostedUtlandDialog';
export * from './BostedUtlandDialogForm';
export * from './BostedUtlandList';
export * from './BostedUtlandListAndDialog';
