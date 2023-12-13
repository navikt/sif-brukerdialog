import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const deltBostedMessages: MessageFileFormat = {
    nb: {
        'steg.deltBosted.stepIndicatorLabel': 'Last opp din avtale om delt bosted',
        'steg.deltBosted.nextButtonLabel': 'Fortsett',
        'steg.deltBosted.helperTextPanel.1':
            'For å få ekstra omsorgsdager må du bo på samme folkeregistrerte adresse som barnet, eller ha en avtale om delt bosted med den andre forelderen.',
        'steg.deltBosted.helperTextPanel.2':
            'Du har opplyst at du ikke bor på samme folkeregistrerte adresse som barnet, og derfor må du laste opp avtalen om delt bosted. Du laster opp avtalen enten ved å ta bilde av den, eller ved å skanne den.',
        'steg.deltBosted.helperTextPanel.3.1': 'å få all tekst med på bildet',
        'steg.deltBosted.helperTextPanel.3.2': 'at signaturen fra begge parter er synlig på bildet',
        'steg.deltBosted.helperTextPanel.3.3': 'at bildet er leselig',
        'steg.deltBosted.vedlegg.knappLabel': 'Last opp avtalen',
        'validation.samværsavtale.listIsEmpty': 'Du må laste opp samværsavtalen for å kunne gå videre.',
    },
};
