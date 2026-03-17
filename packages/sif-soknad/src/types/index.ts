/**
 * Skjemadata for ett steg
 */
export type StepFormValues = Record<string, unknown>;

/**
 * Skjemadata for alle steg
 */
export type SøknadFormValues = Record<string, StepFormValues | undefined>;

/**
 * Søknadsdata for alle steg
 */
export type StepSøknadsdata = Record<string, unknown>;

/**
 * Base type for søknadsdata - noe alle søknader har.
 */
export type BaseSøknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    // harBekreftetOpplysninger?: boolean;
};

/**
 * Generisk mellomlagring-type.
 * Appen bruker denne med sin egen Søknadsdata-type.
 */
export interface Mellomlagring<Søknadsdata, Skjemadata, TStepId extends string = string> {
    søknadsdata: Søknadsdata;
    skjemadata?: Skjemadata;
    currentStepId?: TStepId;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StepDefinition<TSøknadsdata = StepSøknadsdata> {
    /** URL-segment, anbefalt uten ledende/trailende slash, f.eks. 'start' */
    route: string;
    /** Returnerer true hvis steget er ferdig utfylt */
    isCompleted?: (søknadsdata: TSøknadsdata) => boolean;
    /** Returnerer true hvis steget skal vises (for dynamiske steg). Default: alltid synlig */
    isIncluded?: (søknadsdata: TSøknadsdata) => boolean;
}

/**
 * Konfigurasjon for alle steg
 */
export type StepConfig<TStepId extends string, TSøknadsdata = unknown> = Record<TStepId, StepDefinition<TSøknadsdata>>;

/**
 * Info om et inkludert steg - dette vil si et steg som er med i søknadsflyten
 */
export interface IncludedStep<TStepId extends string> {
    stepId: TStepId;
    stepRoute: string;
    completed: boolean;
}
