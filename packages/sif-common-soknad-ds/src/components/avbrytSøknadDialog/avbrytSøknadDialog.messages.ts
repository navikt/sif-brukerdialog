const nb = {
    '@soknad.avbrytSøknadDialog.tittel': 'Slett søknaden',
    '@soknad.avbrytSøknadDialog.intro':
        'Informasjonen du har fylt ut blir slettet, og du kommer tilbake til velkomstsiden.',
    '@soknad.avbrytSøknadDialog.spørsmål': 'Ønsker du å slette?',
    '@soknad.avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
    '@soknad.avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, slett',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const avbrytSøknadDialogMessages = {
    nb,
    nn,
};
