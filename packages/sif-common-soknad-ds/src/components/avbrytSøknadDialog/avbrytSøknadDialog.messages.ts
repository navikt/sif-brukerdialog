const nb = {
    'scs.avbrytSøknadDialog.tittel': 'Slett søknaden',
    'scs.avbrytSøknadDialog.intro':
        'Informasjonen du har fylt ut blir slettet, og du kommer tilbake til velkomstsiden.',
    'scs.avbrytSøknadDialog.spørsmål': 'Ønsker du å slette?',
    'scs.avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
    'scs.avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, slett',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const avbrytSøknadDialogMessages = {
    nb,
    nn,
};
