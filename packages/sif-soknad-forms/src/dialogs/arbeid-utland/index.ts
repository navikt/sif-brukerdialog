import { DateRange } from '@sif/utils';

export type ArbeidUtland = {
    id: string;
    periode: DateRange;
    landkode: string;
    landnavn: string;
    jobbetIPerioden: boolean;
    identitetsnummer: string | undefined;
};

export type ArbeidUtlandVariant = 'generell' | 'periodeMedJobb';

export * from './ArbeidUtlandDialog';
export * from './ArbeidUtlandDialogForm';
export * from './ArbeidUtlandList';
export * from './ArbeidUtlandListAndDialog';
