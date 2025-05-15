import { oppsummeringMessages_nb } from './nb';

export const oppsummeringMessages_nn: Record<keyof typeof oppsummeringMessages_nb, string> = {
    'step.oppsummering.søker.header': 'Om deg',
    'step.oppsummering.søker.navn': 'Namn',
    'step.oppsummering.søker.fnr': 'Fødselsnummer',
    'step.oppsummering.dineBarn.listItem.FOSTERBARN': '(Barnet er mitt fosterbarn).',

    'step.oppsummering.omOmsorgenForBarn.barnList.title': 'Barn du er åleine om omsorga for',
    'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg': 'Tidspunkt for åleineomsorg: {dato}',
    'step.oppsummering.omOmsorgenForBarn.harOmsorgFor.tidspunktForAleneomsorg.tidligere':
        'Du vart åleine om omsorga for over 2 år sidan.',

    'step.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gitt er riktige, og at eg ikkje har halde tilbake opplysningar som har tyding for min rett til omsorgsdagar.',

    'step.oppsummering.sendMelding.feilmelding.førsteGang':
        'Det oppstod ein feil under innsending. Ver venleg å prøv på nytt.',
    'step.oppsummering.sendMelding.feilmelding.andreGang':
        'Det oppstod framleis ein feil under innsending. Vent litt og prøv på nytt.',
    'step.oppsummering.sendSøknad': 'Send søknad',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt er riktige.',
};
