const nb = {
    'step.oppsummering.nextButtonLabel': 'Send inn søknaden',
    'step.oppsummering.info':
        'Les gjennom oppsummeringen og sjekk at alt er riktig før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',

    'step.oppsummering.søker.header': 'Om deg som søker',
    'step.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',

    'step.oppsummering.omBarna.header': 'Dine barn',
    'step.oppsummering.omBarna.barn': 'Barn',
    'step.oppsummering.omBarna.listItem': ' (fnr. {identitetsnummer})',

    'step.oppsummering.annenForelder.header': 'Om den andre forelderen',
    'step.oppsummering.annenForelder.fnr': 'Fødselsnummer: {fødselsnummer}',

    'step.oppsummering.annenForelderensSituasjon.header': 'Den andre forelderens situasjon',
    'step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder':
        'Har du bekreftet at den andre forelderen ikke kan ha tilsyn med barn i en periode på minst 6 måneder?',
    'step.oppsummering.annenForelderensSituasjon.tittel': 'Grunn',
    'step.oppsummering.annenForelderensSituasjon.beskrivelse': 'Beskrivelse av situasjonen:',
    'step.oppsummering.annenForelderensSituasjon.periode.header':
        'Periode når den andre forelderen ikke kan ha tilsyn med barnet/barna:',
    'step.oppsummering.annenForelderensSituasjon.VetIkkeHvorLengePerioden': 'Jeg vet ikke hvor lenge perioden vil være',

    'step.oppsummering.bekrefterOpplysninger':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgsdager.',

    'step.oppsummering.sendSøknad': 'Send søknad',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte opplysningene.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const oppsummeringMessages = { nb, nn };
