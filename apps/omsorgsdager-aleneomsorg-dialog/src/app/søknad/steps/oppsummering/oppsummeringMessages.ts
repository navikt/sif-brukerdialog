const nb = {
    'step.oppsummering.nextButtonLabel': 'Send søknad',
    'step.oppsummering.info':
        'Les gjennom oppsummeringen og sjekk at alt er riktig før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',

    'step.oppsummering.søker.header': 'Om deg',
    'step.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
    'step.oppsummering.deres-felles-barn.header': 'Barn',
    'step.oppsummering.deres-felles-barn.barn': 'Barn',
    'step.oppsummering.dineBarn.listItem.FOSTERBARN': '(Barnet er mitt fosterbarn).',

    'step.oppsummering.omOmsorgenForBarn.barnList.tittle': 'Barn du er alene om omsorgen for',
    'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg': 'Tidspunkt for aleneomsorg: {dato}',
    'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg.tidligere':
        'Du ble alene om omsorgen for over 2 år siden.',

    'step.oppsummering.bekrefterOpplysninger':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgsdager.',

    'step.oppsummering.sendMelding.feilmelding.førsteGang':
        'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
    'step.oppsummering.sendMelding.feilmelding.andreGang':
        'Det oppstod fortsatt en feil under innsending. Vennligst vent litt og prøv på nytt.',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const oppsummeringMessages = {
    nb,
    nn,
};
