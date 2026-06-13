import { ComponentType, ReactNode } from 'react';

/**
 * Mellomlagring-blob som rammeverket lagrer og henter som opak struktur.
 */
export interface MellomlagringBlob {
    versjon: number;
    currentStepId: string;
    søknadsdata: Record<string, unknown>;
}

/**
 * Definisjon av ett steg i søknadsflyten.
 */
export interface StepDefinition {
    /** URL-segment, uten ledende/trailende slash, f.eks. 'startdato' */
    route: string;
    /** Returnerer true hvis steget er ferdig utfylt */
    isCompleted?: (søknadsdata: Record<string, unknown>) => boolean;
    /** Returnerer true hvis steget skal vises. Default: alltid synlig */
    isIncluded?: (søknadsdata: Record<string, unknown>) => boolean;
}

/**
 * Info om ett inkludert steg i søknadsflyten.
 */
export interface IncludedStep {
    stepId: string;
    stepRoute: string;
    completed: boolean;
}

/**
 * Props til dialog-komponenter som kan overrides av appen.
 */
export interface DialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Props til SøknadRouter — hoved-inngangskomponenten for søknadsrammeverket.
 */
export interface SøknadRouterProps {
    /** Steg-konfigurasjon: route, isCompleted, isIncluded per steg-ID */
    config: Record<string, StepDefinition>;
    /** Rekkefølge av steg-ID-er */
    stepOrder: string[];
    /** Ytelse-identifikator, brukt for mellomlagring */
    ytelse: string;
    /** Mellomlagrings-versjon — brukes til å forkaste utdatert mellomlagring */
    versjon: number;
    /** Applikasjonstittel, vises i hvert steg */
    applicationTitle: string;
    /** Basepath for søknadssteg, default '/soknad' */
    basePath?: string;
    /** Valgfri validering av mellomlagret blob. Returner null for å forkaste. */
    validateMellomlagring?: (blob: MellomlagringBlob) => MellomlagringBlob | null;
    /** URL det navigeres til ved "fortsett senere". Default: NAV Min side */
    resumeLaterUrl?: string;
    /** Override dialog-komponenter */
    dialogs?: {
        avbryt?: ComponentType<DialogProps>;
        fortsettSenere?: ComponentType<DialogProps>;
    };
    /** Element som vises etter vellykket innsending (kvitteringside) */
    kvitteringElement?: ReactNode;
    children: ReactNode;
}

/**
 * Props til SøknadStep — wrapper-komponent for ett steg i søknaden.
 */
export interface SøknadStepProps {
    stepId: string;
    children: ReactNode;
}

/**
 * TypeScript-type med alle i18n-nøkler rammeverket forventer å finne i appens IntlProvider.
 * Bruk denne typen i appens nb.ts/nn.ts for å få compile-time-feil ved manglende nøkler.
 *
 * Steg-titler følger konvensjonen `step.${stepId}.title` og er IKKE inkludert her
 * siden de er steg-spesifikke og defineres av appen.
 */
export type SøknadFrameworkIntlKeys = {
    'soknad.steg.neste': string;
    'soknad.steg.forrige': string;
    'soknad.steg.send': string;
    'soknad.avbryt.tittel': string;
    'soknad.avbryt.bekreft': string;
    'soknad.avbryt.avbryt': string;
    'soknad.fortsettSenere.tittel': string;
    'soknad.fortsettSenere.bekreft': string;
    'soknad.fortsettSenere.avbryt': string;
};
