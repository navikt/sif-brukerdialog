import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Søknad om ekstra omsorgsdager',
        'application.bannerTitle': 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'step.omAnnenForelder.pageTitle': 'Om den andre forelderen',
        'step.omAnnenForelder.stepTitle': 'Om den andre forelderen',

        'step.annenForelderSituasjon.pageTitle': 'Den andre forelderens situasjon',
        'step.annenForelderSituasjon.stepTitle': 'Den andre forelderens situasjon',

        'step.omBarna.pageTitle': 'Om barn',
        'step.omBarna.stepTitle': 'Om barn',

        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',
    },
};
