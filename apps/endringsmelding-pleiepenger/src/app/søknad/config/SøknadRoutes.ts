import { StepId } from './StepId';

export const getSøknadStepRoute = (stepId: StepId): SøknadRoutes => {
    switch (stepId) {
        case StepId.VELKOMMEN:
            return SøknadRoutes.VELKOMMEN;
        case StepId.UKJENT_ARBEIDSFOHOLD:
            return SøknadRoutes.UKJENT_ARBEIDSFOHOLD;
        case StepId.ARBEIDSTID:
            return SøknadRoutes.ARBEIDSTID;
        case StepId.LOVBESTEMT_FERIE:
            return SøknadRoutes.LOVBESTEMT_FERIE;
        case StepId.OMSORGSTILBUD:
            return SøknadRoutes.OMSORGSTILBUD;
        case StepId.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
        case StepId.MELDING_SENDT:
            return SøknadRoutes.SØKNAD_SENDT;
    }
};

export const SøknadStepRoute = {
    [StepId.VELKOMMEN]: 'velkommen',
    [StepId.UKJENT_ARBEIDSFOHOLD]: 'ukjentArbeidsforhold',
    [StepId.ARBEIDSTID]: 'arbeidstid',
    [StepId.LOVBESTEMT_FERIE]: 'lovbestemt-ferie',
    [StepId.OMSORGSTILBUD]: 'omsorgstilbud',
    [StepId.OPPSUMMERING]: 'oppsummering',
    [StepId.MELDING_SENDT]: 'melding_sendt',
};

export enum SøknadRoutes {
    APP_ROOT = '/',
    INNLOGGET_ROOT = '/melding/*',
    VELKOMMEN = '/melding/velkommen',
    UKJENT_ARBEIDSFOHOLD = '/melding/ukjentArbeidsforhold',
    ARBEIDSTID = '/melding/arbeidstid',
    LOVBESTEMT_FERIE = '/melding/lovbestemt-ferie',
    OMSORGSTILBUD = '/melding/omsorgstilbud',
    OPPSUMMERING = '/melding/oppsummering',
    SØKNAD_SENDT = '/melding/melding_sendt',
    UKJENT_STEG = '/melding/ukjent-steg',
    IKKE_TILGANG = '/melding/ikke-tilgang',
}
