export enum StepId {
    'VELKOMMEN' = 'velkommen',
    'UKJENT_ARBEIDSFOHOLD' = 'ukjentArbeidsforhold',
    'ARBEIDSTID' = 'arbeidstid',
    'LOVBESTEMT_FERIE' = 'lovbestemtFerie',
    'TILSYNSORDNING' = 'tilsynsordning',
    'OPPSUMMERING' = 'oppsummering',
    'MELDING_SENDT' = 'melding_sendt',
}

/** Steg som tilsvarer en endring bruker kan velge */
export type EndringStepId = StepId.ARBEIDSTID | StepId.LOVBESTEMT_FERIE | StepId.TILSYNSORDNING;
