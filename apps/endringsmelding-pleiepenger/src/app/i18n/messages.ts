import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const defaultMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Endringsmelding - jobb i pleiepengeperioden',
        'application.bannerTitle': 'Endringsmelding - jobb i pleiepengeperioden',

        'step.aktivitet.pageTitle': 'Velg arbeidsforhold',
        'step.aktivitet.stepTitle': 'Velg arbeidsforhold',

        'step.arbeidstid.pageTitle': 'Jobb i pleiepengeperioden',
        'step.arbeidstid.stepTitle': 'Jobb i pleiepengeperioden',

        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'steg.footer.avbryt': 'Avbryt og slett melding om endring',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
        'avbrytSøknadDialog.intro':
            'Det du har fylt ut i skjemaet blir slettet, og du kommer tilbake til velkomstsiden.',
        'avbrytSøknadDialog.spørsmål': 'Ønsker du å slette melding om endring?',
        'avbrytSøknadDialog.tittel': 'Avbryt og slett melding om endring',
        'avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, avslutt og slett',

        'fortsettSøknadSenereDialog.avbrytSøknadLabel': 'Ja, fortsett senere',
        'fortsettSøknadSenereDialog.fortsettSøknadLabel': 'Nei',
        'fortsettSøknadSenereDialog.intro': 'Vi lagrer meldingen om endring for deg i 72 timer.',
        'fortsettSøknadSenereDialog.spørsmål': 'Vil du avslutte nå og fortsette senere?',
        'fortsettSøknadSenereDialog.tittel': 'Avslutt og fortsett senere',
    },
};
