import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const deltBostedMessages: MessageFileFormat = {
    nb: {
        'step.deltBosted.pageTitle': 'Omsorgspengesøknad - avtale om delt bosted',
        'step.deltBosted.stepTitle': 'Avtale om delt bosted',
        'step.deltBosted.stepIndicatorLabel': 'Last opp din avtale om delt bosted',
        'step.deltBosted.nextButtonLabel': 'Fortsett',
        'step.deltBosted.helperTextPanel.1':
            'For å få ekstra omsorgsdager må du bo på samme folkeregistrerte adresse som barnet, eller ha en avtale om delt bosted med den andre forelderen.',
        'step.deltBosted.helperTextPanel.2':
            'Du har opplyst at du ikke bor på samme folkeregistrerte adresse som barnet, og derfor må du laste opp avtalen om delt bosted. Du laster opp avtalen enten ved å ta bilde av den, eller ved å skanne den.',
        'step.deltBosted.helperTextPanel.3.1': 'å få all tekst med på bildet',
        'step.deltBosted.helperTextPanel.3.2': 'at signaturen fra begge parter er synlig på bildet',
        'step.deltBosted.helperTextPanel.3.3': 'at bildet er leselig',
        'step.deltBosted.vedlegg.knappLabel': 'Last opp avtalen',
        'validation.samværsavtale.listIsEmpty': 'Du må laste opp samværsavtalen for å kunne gå videre.',
    },
};
