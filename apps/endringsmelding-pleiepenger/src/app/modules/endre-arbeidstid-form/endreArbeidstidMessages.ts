const nb = {
    'endreArbeidstidForm.timerAvNormalt.spm': 'Hvor mange timer jobber du {periode}?',
    'endreArbeidstidForm.timerAvNormalt.flereUker.spm': 'I de ukene du har valgt, hvor mange timer jobber du per uke?',

    'endreArbeidstidForm.antallTimer.numberHasNoValue': 'Du må oppgi hvor mange timer du jobber',
    'endreArbeidstidForm.antallTimer.numberIsTooSmall': 'Du kan ikke oppgi mindre enn 0 timer',
    'endreArbeidstidForm.antallTimer.numberIsTooLarge': 'Du kan ikke oppgi mer enn {maksTimer} timer',
    'endreArbeidstidForm.antallTimer.numberHasInvalidFormat':
        'Oppgitt timer er ikke et gyldig tall. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',

    'endreArbeidstidForm.heading.endreForEnUke': 'Endre jobb for uke {ukenummer}',
    'endreArbeidstidForm.heading.endreForFlereUker': 'Endre jobb for flere uker',
    'endreArbeidstidForm.dagerMedFerieFjernet.melding':
        'Du har fjernet ferie ({feriedagerTekst}) denne uken. Hvis du skal jobbe i stedet for ferie, oppgi hvor mye du jobber denne uken.',

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
