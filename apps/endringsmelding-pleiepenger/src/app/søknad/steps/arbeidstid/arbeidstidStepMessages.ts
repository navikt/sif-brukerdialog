const nb = {
    'arbeidstidForm.arbeidsaktivitet.noValue':
        'Det er ikke registrert noen endring for {arbeidsaktivitetNavn}. Hvis du ikke ønsker å registrere noen endringer, kan du gå tilbake til forrige steg og velge bort {arbeidsaktivitetNavn}.',
    'arbeidstid.faktisk.mangler':
        'Du har ikke oppgitt hvor mye du jobber hos {navn} for alle uker i perioden med pleiepenger',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const arbeidstidStepMessages = {
    nb,
    nn,
};
