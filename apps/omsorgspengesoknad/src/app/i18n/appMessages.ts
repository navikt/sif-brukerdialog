import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Omsorgspengesøknad',
        'application.bannerTitle': 'Søknad om ekstra omsorgsdager',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'step.omBarnet.pageTitle': 'Omsorgspengesøknad - opplysninger om barnet',
        'step.omBarnet.stepTitle': 'Barn',

        'step.deltBosted.pageTitle': 'Omsorgspengesøknad - Delt bosted',
        'step.deltBosted.stepTitle': 'Delt bosted',

        'step.legeerklaering.pageTitle': 'Omsorgspengesøknad - legeerklæring',
        'step.legeerklaering.stepTitle': 'Legeerklæring',

        'step.oppsummering.pageTitle': 'Omsorgspengesøknad - Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',
        'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen vedlegg er lastet opp',
        'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen vedlegg er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',
        'fileUploadErrors.part1': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstartet av søknaden. Vennligst prøv igjen senere.',
        'initialLoadError.text.2': 'Dersom feilen vedvarer, kan du prøve å starte på nytt.',
        'initialLoadError.startPåNytt': 'Start på nytt',
    },
};
