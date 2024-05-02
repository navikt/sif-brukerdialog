const nb = {
    'endreArbeidstid.intlValues.harJobbet': 'har jobbet',
    'endreArbeidstid.intlValues.skalJobbe': 'skal jobbe',
    'endreArbeidstid.intlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'endreArbeidstid.intlValues.somFrilanser': 'som frilanser',
    'endreArbeidstid.intlValues.somSN': 'som selvstendig næringsdrivende',
    'endreArbeidstid.intlValues.iPerioden': `i perioden {fra} til {til}`,

    'endreArbeidstid.timerEllerProsent.prosent': 'I prosent',
    'endreArbeidstid.prosentAvNormalt.spm': 'Hvor mange prosent av normalt jobber du {periode}?',
    'endreArbeidstid.timerAvNormalt.flereUker.spm': 'I de ukene du har valgt, hvor mange timer jobber du per uke?',
    'endreArbeidstid.timerAvNormalt.spm': 'Hvor mange timer jobber du {periode}?',

    'endreArbeidstidForm.prosentAvNormalt.numberHasNoValue': 'Du må oppgi hvor mange prosent av normalt du jobber',
    'endreArbeidstidForm.prosentAvNormalt.numberIsTooSmall': 'Du kan ikke oppgi mindre enn 0 prosent',
    'endreArbeidstidForm.prosentAvNormalt.numberIsTooLarge': 'Du kan ikke oppgi med enn 100 prosent',
    'endreArbeidstidForm.prosentAvNormalt.numberHasInvalidFormat': 'Oppgitt prosent er ikke et gyldig tall',

    'endreArbeidstidForm.antallTimer.numberHasNoValue': 'Du må oppgi hvor mange timer du jobber',
    'endreArbeidstidForm.antallTimer.numberIsTooSmall': 'Du kan ikke oppgi mindre enn 0 timer',
    'endreArbeidstidForm.antallTimer.numberIsTooLarge': 'Du kan ikke oppgi mer enn {maksTimer} timer',
    'endreArbeidstidForm.antallTimer.numberHasInvalidFormat': 'Oppgitt timer er ikke et gyldig tall',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const endreArbeidstidMessages = {
    nb,
    nn,
};
