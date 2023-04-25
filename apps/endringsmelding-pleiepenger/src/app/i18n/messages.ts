import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const defaultMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Endringsmelding pleiepenger sykt barn',
        'application.bannerTitle': 'Endringsmelding pleiepenger sykt barn',

        'step.aktivitet.pageTitle': 'Velg arbeidsforhold - Endringsmelding pleiepenger sykt barn',
        'step.aktivitet.stepTitle': 'Velg arbeidsforhold',

        'step.arbeidstid.pageTitle': 'Jobb i pleiepengeperioden - Endringsmelding pleiepenger sykt barn',
        'step.arbeidstid.stepTitle': 'Jobb i pleiepengeperioden',

        'step.lovbestemtFerie.pageTitle': 'Ferie - Endringsmelding pleiepenger sykt barn',
        'step.lovbestemtFerie.stepTitle': 'Ferie i pleiepengeperioden',

        'step.oppsummering.pageTitle': 'Oppsummering - Endringsmelding pleiepenger sykt barn',
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
