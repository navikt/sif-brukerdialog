const nb = {
    'endreArbeidstid.intlValues.harJobbet': 'har jobbet',
    'endreArbeidstid.intlValues.skalJobbe': 'skal jobbe',
    'endreArbeidstid.intlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'endreArbeidstid.intlValues.somFrilanser': 'som frilanser',
    'endreArbeidstid.intlValues.somSN': 'som selvstendig næringsdrivende',
    'endreArbeidstid.intlValues.iPerioden': `i perioden {fra} til {til}`,

    'endreArbeidstidForm.prosentAvNormalt.spm': 'Hvor mange prosent av normalt jobber du {periode}?',
    'endreArbeidstidForm.timerAvNormalt.spm': 'Hvor mange timer jobber du {periode}?',
    'endreArbeidstidForm.timerAvNormalt.flereUker.spm': 'I de ukene du har valgt, hvor mange timer jobber du per uke?',

    'endreArbeidstidForm.prosentAvNormalt.numberHasNoValue': 'Du må oppgi hvor mange prosent av normalt du jobber',
    'endreArbeidstidForm.prosentAvNormalt.numberIsTooSmall': 'Du kan ikke oppgi mindre enn 0 prosent',
    'endreArbeidstidForm.prosentAvNormalt.numberIsTooLarge': 'Du kan ikke oppgi med enn 100 prosent',
    'endreArbeidstidForm.prosentAvNormalt.numberHasInvalidFormat': 'Oppgitt prosent er ikke et gyldig tall',
    'endreArbeidstidForm.prosentAvNormalt.indecisiveNumberFormat': 'Oppgitt prosent er ikke et gyldig tall',

    'endreArbeidstidForm.antallTimer.numberHasNoValue': 'Du må oppgi hvor mange timer du jobber',
    'endreArbeidstidForm.antallTimer.numberIsTooSmall': 'Du kan ikke oppgi mindre enn 0 timer',
    'endreArbeidstidForm.antallTimer.numberIsTooLarge': 'Du kan ikke oppgi mer enn {maksTimer} timer',
    'endreArbeidstidForm.antallTimer.numberHasInvalidFormat': 'Oppgitt timer er ikke et gyldig tall',
    'endreArbeidstidForm.antallTimer.indecisiveNumberFormat': 'Oppgitt timer er ikke et gyldig tall',

    'endreArbeidstidForm.heading.endreForEnUke': 'Endre jobb for uke {ukenummer}',
    'endreArbeidstidForm.heading.endreForFlereUker': 'Endre jobb for flere uker',
    'endreArbeidstidForm.dagerMedFerieFjernet.melding':
        'Du har fjernet ferie ({feriedagerTekst}) denne uken. Hvis du skal jobbe i stedet for ferie, oppgi hvor mye du jobber denne uken.',

    'endreArbeidstidForm.hvordanOppgiArbeid.spm': 'Hvordan vil du oppgi hvor mye du jobber?',
    'endreArbeidstidForm.hvordanOppgiArbeid.iProsent': 'I prosent',
    'endreArbeidstidForm.hvordanOppgiArbeid.iTimer': 'I timer',

    'endreArbeidstidForm.kortUke.info':
        'Dette er en kort uke, som går fra {dager}. Du skal oppgi hvor mye du jobber kun for disse dagene.',

    'endreArbeidstidForm.normalarbeidstid.enUke': 'Oppgitt normal arbeidstid for {periodeTekst} er {varighet}.',
    'endreArbeidstidForm.normalarbeidstid.likHverUke':
        'Oppgitt normal arbeidstid for disse ukene er {varighet} per uke.',
    'endreArbeidstidForm.normalarbeidstid.ulikMellomUker': 'Merk: normal arbeidstid er ikke lik for alle disse ukene.',

    'endreArbeidstidForm.ukerOgÅr.ingenUkerValgt': 'Ingen uker valgt',
    'endreArbeidstidForm.ukerOgÅr.visValgteUker.tittel': 'Vis hvilke {antallUker} uker som er valgt',
    'endreArbeidstidForm.ukerOgÅr.årOgUke': '{år}: Uke {uker}',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const endreArbeidstidMessages = {
    nb,
    nn,
};
