const nb = {
    '@soknad.soknadErrorMessages.applicationUnavailable.title': 'Endringsmeldingen er dessverre ikke tilgjengelig',
    '@soknad.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobber så raskt vi kan med å få den tilgjengelig. Vennligst kom tilbake litt senere.',
    '@soknad.avbrytSøknadDialog.tittel': 'Slett melding om endring',
    '@soknad.stepFooter.avbryt': 'Slett melding om endring',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const sifCommonSoknadOverrideMessages = {
    nb,
    nn,
};
