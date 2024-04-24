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

const nn: Record<keyof typeof nb, string> = { ...nb };

export const tidspunktForAleneomsorgMessages = {
    nb,
    nn,
};
