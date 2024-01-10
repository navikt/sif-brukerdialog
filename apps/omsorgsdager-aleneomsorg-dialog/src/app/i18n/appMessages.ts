import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Søknad om ekstra omsorgsdager ved aleneomsorg',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'step.omOmsorgenForBarn.stepTitle': 'Om aleneomsorg for barn',
        'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for aleneomsorg',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',

        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',
    },
};
