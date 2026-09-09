import { DateRange } from '@sif/utils';

export type ArbeidUtland = {
    id: string;
    periode: DateRange;
    landkode: string;
    landnavn: string;
    identitetsnummer: string | undefined;
};

export * from './ArbeidUtlandDialog';
export * from './ArbeidUtlandDialogForm';
export * from './ArbeidUtlandList';
export * from './ArbeidUtlandListAndDialog';
