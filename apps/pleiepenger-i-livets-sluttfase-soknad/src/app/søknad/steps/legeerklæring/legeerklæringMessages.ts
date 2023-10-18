import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const legeerklæringMessages: MessageFileFormat = {
    nb: {
        'step.legeerklæring.pageTitle': 'Legeerklæring',
        'step.legeerklæring.stepTitle': 'Legeerklæring',
        'step.legeerklæring.stepIndicatorLabel': 'Legeerklæring',
        'step.legeerklæring.nextButtonLabel': 'Fortsett',

        'step.legeerklæring.counsellorPanel.info':
            'Søker du for første gang må du laste opp en legeerklæring, som bekrefter at personen er i livets sluttfase. Vi trenger kun én legeerklæring. Det vil si at hvis du eller en annen søker allerede har sendt en slik legeerklæring, kan du bare gå videre uten å laste opp noe.',

        'step.legeerklæring.vedlegg.knappLabel': 'Last opp legeerklæringen',

        'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',
    },
};
