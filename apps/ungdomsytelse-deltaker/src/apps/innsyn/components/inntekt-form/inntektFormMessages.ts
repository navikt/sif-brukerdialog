const nb = {
    'inntektForm.validation.harArbeidstakerOgFrilansInntekt.yesOrNoIsUnanswered':
        'Du må svare på om du har inntekt som arbeidstaker eller frilanser',
    'inntektForm.validation.harInntektFraYtelse.yesOrNoIsUnanswered': 'Du må svare på om du har inntekt fra Nav',

    'inntektForm.validation.ansattInntekt.numberHasDecimals': 'Inntekt arbeidstaker/frilanser kan ikke ha desimaler',
    'inntektForm.validation.ansattInntekt.numberHasNoValue': 'Inntekt arbeidstaker/frilanser feltet er tomt',
    'inntektForm.validation.ansattInntekt.numberHasInvalidFormat':
        'Inntekt arbeidstaker/frilanser er ikke et gyldig heltall',
    'inntektForm.validation.ansattInntekt.numberIsTooSmall':
        'Inntekt arbeidstaker/frilanser kan ikke være et negativt tall',
    'inntektForm.validation.ansattInntekt.numberIsTooLarge':
        'Inntekt arbeidstaker/frilanserkan ikke være større enn 99999',

    'inntektForm.validation.ytelseInntekt.numberHasDecimals': 'Ytelser fra Nav kan ikke ha desimaler',
    'inntektForm.validation.ytelseInntekt.numberHasNoValue': 'Ytelser fra Nav feltet er tomt',
    'inntektForm.validation.ytelseInntekt.numberHasInvalidFormat': 'Ytelser fra Nav er ikke et gyldig heltall',
    'inntektForm.validation.ytelseInntekt.numberIsTooSmall': 'Ytelser fra Nav kan ikke være et negativt tall',
    'inntektForm.validation.ytelseInntekt.numberIsTooLarge': 'Ytelser fra Nav kan ikke være større enn 99999',

    'inntektForm.validation.bekrefterInntekt.notChecked': 'Du må bekrefte at inntekten du har oppgitt er korrekt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const inntektFormMessages = {
    nb,
    nn,
};
