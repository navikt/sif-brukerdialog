const nb = {
    'scs.soknadErrorMessages.applicationUnavailable.title': 'Endringsmeldingen er dessverre ikke tilgjengelig',
    'scs.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobber så raskt vi kan med å få den tilgjengelig. Vennligst kom tilbake litt senere.',
    'scs.avbrytSøknadDialog.tittel': 'Slett melding om endring',
    'scs.stepFooter.avbryt': 'Slett melding om endring',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const sifCommonSoknadOverrideMessages = {
    nb,
    nn,
};
