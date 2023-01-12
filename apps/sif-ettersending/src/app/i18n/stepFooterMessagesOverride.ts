import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const stepFooterOverrideMessages: MessageFileFormat = {
    nb: {
        'avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
        'avbrytSøknadDialog.intro': 'Det du har fylt ut i skjemaet blir slettet, og du kommer tilbake til startsiden.',
        'avbrytSøknadDialog.tittel': 'Avbryt og slett',
        'avbrytSøknadDialog.spørsmål': 'Ønsker du å slette informasjonen?',
        'avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, slett',

        'fortsettSøknadSenereDialog.avbrytSøknadLabel': 'Ja, fortsett senere',
        'fortsettSøknadSenereDialog.fortsettSøknadLabel': 'Nei',
        'fortsettSøknadSenereDialog.intro': 'Vi lagrer informasjonen for deg i 72 timer.',
        'fortsettSøknadSenereDialog.spørsmål': 'Vil du avslutte nå og fortsette senere?',
        'fortsettSøknadSenereDialog.tittel': 'Avslutt og fortsett senere',
    },
};
