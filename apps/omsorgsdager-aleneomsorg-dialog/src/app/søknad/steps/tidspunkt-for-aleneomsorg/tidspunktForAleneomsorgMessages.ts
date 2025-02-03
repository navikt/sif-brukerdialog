const nb = {
    'step.tidspunktForAleneomsorg.stepIntro':
        'Nå trenger vi å vite når du ble alene om omsorgen for barn. Hvis du ble alene om omsorgen tidligere enn i fjor trenger vi ikke å vite konkret dato.',
    'step.tidspunktForAleneomsorg.info': 'Oppgi tidspunkt for når du ble alene om omsorgen',
    'step.tidspunktForAleneomsorg.spm': 'Hvilket år ble du alene om omsorgen for {navn}?',
    'step.tidspunktForAleneomsorg.radioPanelGroupLabel.siste2årene': 'I {yearAgo} eller {yearNow}',
    'step.tidspunktForAleneomsorg.radioPanelGroupLabel.tidligere': 'I {twoYearsAgo} eller tidligere',
    'step.tidspunktForAleneomsorg.siste2årene.dato.spm': 'Hvilken dato ble du alene om omsorgen for {navn}?',
    'step.tidspunktForAleneomsorg.nextButtonLabel': 'Fortsett',

    'validation.tidspunktForAleneomsorg.noValue': 'Du må oppgi hvilket år du ble alene om omsorgen for barnet.',
    'validation.tidspunktForAleneomsorg.dato.dateHasNoValue':
        'Du må oppgi hvilken dato du ble alene om omsorgen for barnet.',
    'validation.tidspunktForAleneomsorg.dato.dateIsAfterMax': 'Du må oppgi dagensdato eller tidligere.',
    'validation.tidspunktForAleneomsorg.dato.dateIsBeforeMin':
        'Du kan ikke oppgi dato tidligere enn to år fra dagensår.',
    'validation.tidspunktForAleneomsorg.dato.dateHasInvalidFormat':
        'Datoen når du ble du alene om omsorgen for barnet er ugyldig. Gyldig format er dd.mm.åååå.',
};

const nn: Record<keyof typeof nb, string> = {
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

export const tidspunktForAleneomsorgMessages = {
    nb,
    nn,
};
