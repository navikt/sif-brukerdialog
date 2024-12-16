const nb = {
    'arbeidstidStep.title': 'Slik endrer du jobb i pleiepengeperioden',
    'arbeidstidStep.info.1': 'Du oppgir hvor mye du jobber i timer eller prosent per uke.',
    'arbeidstidStep.info.2': 'Du kan endre flere uker samtidig, eller én og én uke.',
    'arbeidstidStep.info.3':
        'Hvis du har endring som gjelder kun enkeltdager, skal du fremdeles oppgi hvor mye du jobber samlet for hele uken.',
    'arbeidstidStep.fjernetFerie.melding':
        'Du har fjernet dager med ferie. Skal du jobbe disse dagene, se over at jobb i perioden er riktig.',
    'arbeidstidStep.arbeiderIPeriodenSpm.heltFravær': 'Jeg jobber ikke og har fullt fravær her',
    'arbeidstidStep.arbeiderIPeriodenSpm.redusert': 'Jeg kombinerer delvis jobb med pleiepenger',
    'arbeidstidStep.arbeiderIPeriodenSpm.somVanlig': 'Jeg jobber som normalt og har ingen fravær her',
    'arbeidstidStep.arbeiderIPeriodenSpm.legend':
        'I perioden med pleiepenger, hvilken situasjon gjelder for deg hos {navn}?',

    'arbeidstidStep.ingenArbeidsaktiviteter':
        'Ingen arbeidsforhold med registrert arbeidstid er tilgjengelig for endring. Du kan melde om endringer ved å <Lenke>skrive en beskjed til Nav</Lenke>.',

    'arbeidstidForm.arbeidsaktivitet.noValue':
        'Det er ikke registrert noen endring for {arbeidsaktivitetNavn}. Hvis du ikke ønsker å registrere noen endringer, kan du gå tilbake til forrige steg og velge bort {arbeidsaktivitetNavn}.',
    'arbeidstid.faktisk.mangler':
        'Du har ikke oppgitt hvor mye du jobber hos {navn} for alle uker i perioden med pleiepenger',

    'arbeidsaktivitetFormPart.aktivitet.erEndret': 'Endret arbeidstid',

    'arbeidsaktivitetContent.tags.endretArbeid': 'Arbeidstid endret',
    'arbeidsaktivitetContent.tags.ferieFjernet': 'Ferie fjernet',
    'arbeidsaktivitetContent.heading.perioder':
        '{antallPerioder, plural, one {Uker med pleiepenger} other {Dine perioder med pleiepenger}}',
    'arbeidsaktivitetContent.heading.ingenPerioder': 'Ingen perioder tilgjengelig for endring',
    'arbeidsaktivitetContent.utenforPeriode.før':
        'Hvis du ønsker å gjøre endringer før {førDato}, må du sende oss en melding via {skrivTilOssLink}',
    'arbeidsaktivitetContent.utenforPeriode.etter':
        'Hvis du ønsker å gjøre endringer etter {etterDato}, må du sende oss en melding via {skrivTilOssLink}.',
    'arbeidsaktivitetContent.utenforPeriode.førOgEtter':
        'Hvis du ønsker å gjøre endringer før {førDato} eller etter {etterDato}, må du sende oss en melding via {skrivTilOssLink}.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const arbeidstidStepMessages = {
    nb,
    nn,
};
