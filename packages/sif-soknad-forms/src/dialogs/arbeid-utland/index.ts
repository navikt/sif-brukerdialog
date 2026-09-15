import { DateRange } from '@sif/utils';

export type ArbeidUtlandFormData = {
    id: string;
    periode: DateRange;
    land: {
        landkode: string;
        landnavn: string;
    };
    jobbetIPerioden: boolean;
    utenlandskNasjonalId: string | undefined;
};

/** Hvis variant er periodeMedJobb, settes jobbetIPerioden alltid til true fordi kontekst da er periode med jobb */
export type ArbeidUtlandVariant = 'generell' | 'periodeMedJobb';

export * from './ArbeidUtlandDialog';
export * from './ArbeidUtlandDialogForm';
export * from './ArbeidUtlandList';
export * from './ArbeidUtlandListAndDialog';
