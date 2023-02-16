import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const defaultMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Endringsmelding arbeidstid - Pleiepenger sykt barn',
        'application.bannerTitle': 'Endringsmelding arbeidstid - Pleiepenger sykt barn',

        'step.aktivitet.pageTitle': 'Hvilke arbeidsforhold ønsker du å endre?',
        'step.aktivitet.stepTitle': 'Hvilke arbeidsforhold ønsker du å endre?',

        'step.arbeidstid.pageTitle': 'Endre arbeidstid',
        'step.arbeidstid.stepTitle': 'Endre arbeidstid',

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
