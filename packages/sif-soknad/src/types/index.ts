/**
 * Skjemadata for ett steg.
 * Bruker {} i stedet for Record<string, unknown> for å unngå index signature,
 * slik at TypeScript fanger opp feilaktige property-navn i extends-typer.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type StepFormValues = {};

/**
 * Skjemadata for alle steg
 */
export type SøknadFormValues = Record<string, StepFormValues | undefined>;

/**
 * Søknadsdata for alle steg.
 * Bruker {} av samme grunn som StepFormValues.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type StepSøknadsdata = {};

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
