import { tidspunktForAleneomsorgMessages_nb } from './nb';

export const tidspunktForAleneomsorgMessages_nn: Record<keyof typeof tidspunktForAleneomsorgMessages_nb, string> = {
    'step.tidspunktForAleneomsorg.stepIntro':
        'No treng me å vite når du vart åleine om omsorga for barn. Om du vart åleine om omsorga tidlegare enn i fjor, treng me ikkje å vite konkret dato.',
    'step.tidspunktForAleneomsorg.info': 'Oppgi tidspunkt for når du vart åleine om omsorga',
    'step.tidspunktForAleneomsorg.spm': 'Kva år vart du åleine om omsorga for {navn}?',
    'step.tidspunktForAleneomsorg.radioPanelGroupLabel.siste2årene': 'I {yearAgo} eller {yearNow}',
    'step.tidspunktForAleneomsorg.radioPanelGroupLabel.tidligere': 'I {twoYearsAgo} eller tidlegare',
    'step.tidspunktForAleneomsorg.siste2årene.dato.spm': 'Kva dato vart du åleine om omsorga for {navn}?',
    'step.tidspunktForAleneomsorg.nextButtonLabel': 'Fortsett',

    'validation.tidspunktForAleneomsorg.noValue': 'Du må oppgi kva år du vart åleine om omsorga for barnet.',
    'validation.tidspunktForAleneomsorg.dato.dateHasNoValue':
        'Du må oppgi kva dato du vart åleine om omsorga for barnet.',
    'validation.tidspunktForAleneomsorg.dato.dateIsAfterMax': 'Du må oppgi dagens dato eller tidlegare.',
    'validation.tidspunktForAleneomsorg.dato.dateIsBeforeMin':
        'Du kan ikkje oppgi dato tidlegare enn to år frå dagens år.',
    'validation.tidspunktForAleneomsorg.dato.dateHasInvalidFormat':
        'Datoen når du vart åleine om omsorga for barnet er ugyldig. Gyldig format er dd.mm.åååå.',
};
