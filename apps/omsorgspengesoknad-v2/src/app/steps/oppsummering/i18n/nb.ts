export type OppsummeringStegMessageKeys = keyof typeof oppsummeringStegMessages_nb;

export const oppsummeringStegMessages_nb = {
    'oppsummeringSteg.tittel': 'Se over og send inn søknaden',
    'oppsummeringSteg.omBarnet.tittel': 'Om barnet',
    'oppsummeringSteg.bekrefterOpplysninger.label':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige og at jeg ikke har holdt tilbake opplysninger, og at jeg er kjent med at NAV kan holde tilbake eller kreve tilbake ytelser, og at unndragelse av opplysninger kan medføre straff etter straffeloven.',
    'oppsummeringSteg.feil.tittel': 'Søknaden kan ikke sendes inn',
    'oppsummeringSteg.feil.innhold': 'Det mangler opplysninger i søknaden. Gå tilbake og fyll inn manglende felt.',
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked':
        'Du må bekrefte at opplysningene er riktige for å sende inn søknaden.',
} as const;
