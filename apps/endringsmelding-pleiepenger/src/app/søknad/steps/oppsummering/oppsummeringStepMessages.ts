const nb = {
    'oppsummeringStep.guide':
        'Nedenfor ser du endringene som du har lagt inn. Se over at alt stemmer før du sender inn. Hvis noe ikke stemmer, kan du gå tilbake og endre igjen.',

    'oppsummeringStep.arbeidsgiver.erAnsatt':
        'Stemmer det at du er ansatt hos {arbeidsgivernavn} i perioden du har søkt pleiepenger?',
    'oppsummeringStep.arbeidsgiver.normalarbeidstid':
        'Hvor mange timer jobber du normalt per uke hos {arbeidsgivernavn}?',

    'oppsummeringStep.nyttArbeidsforhold.tittel': 'Nytt arbeidsforhold',

    'oppsummeringStep.arbeidstid.tittel': 'Arbeidstid',
    'oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig':
        'Det er registrert flere timer enn det er tilgjengelig for en periode. Vennligst gå tilbake til steget for arbeidstid og korriger dette.',
    'oppsummeringStep.arbeidstid.ingenEndringer': 'Det er ikke registrert noen endringer i arbeidstid',
    'oppsummeringStep.arbeidstid.kolonne.endretArbeidstid': 'Endret arbeidstid',
    'oppsummeringStep.arbeidstid.kolonne.iPerioden': 'I perioden',
    'oppsummeringStep.arbeidstid.frilanser.tittel': 'Frilanser',
    'oppsummeringStep.arbeidstid.sn.tittel': 'Selvstendig næringsdrivende',

    'oppsummeringStep.ferie.tittel': 'Endringer i ferie',
    'oppsummeringStep.ferie.ingenEndringer': 'Det er ikke registrert noen endringer i ferie',

    'oppsummeringStep.ferie.lagtTil': 'Ferie som er lagt til',
    'oppsummeringStep.ferie.fjernet': 'Ferie som er fjernet',

    'oppsummeringStep.forrige': 'Forrige',
    'oppsummeringStep.forrige.ariaLabel': 'Pil venstre',

    'oppsummeringStep.submit.label': 'Send melding om endring',
    'oppsummeringStep.bekrefter.tekst':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',

    'oppsummeringForm.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene er riktig',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const oppsummeringStepMessages = {
    nb,
    nn,
};
