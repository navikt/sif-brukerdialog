import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

const soknadErrorIntlMessages: MessageFileFormat = {
    nb: {
        'common.errorPage.defaultTitle': 'Det oppstod en feil',

        'common.soknadErrorMessages.defaultTitle': 'Noe gikk galt...',
        'common.soknadErrorMessages.generalError.content':
            'Beklager, her har det dessverre skjedd en feil. Dersom feilen fortsetter, prøv igjen litt senere.',

        'common.soknadErrorMessages.generalSoknadError.content':
            'Beklager, her har det dessverre skjedd en feil. Vennligst gå tilbake og prøv igjen. Dersom feilen fortsetter, prøv igjen litt senere.',
        'common.soknadErrorMessages.gotoSoknadFrontpage': 'Gå tilbake til startsiden for søknaden',

        'common.soknadErrorMessages.missingSoknadData.title': 'Det oppstod en feil under visning av siden',
        'common.soknadErrorMessages.missingSoknadData.content':
            'Noe gikk feil under visning av denne siden. Vennligst gå tilbake og se over søknaden på nytt.',

        'common.soknadErrorMessages.unavailableSoknadStep.title': 'Det oppstod en feil under visning av siden',
        'common.soknadErrorMessages.unavailableSoknadStep.content':
            'Noe gikk feil under visning av denne siden, vennligst gå tilbake og se over søknaden. Dersom feilen vedvarer, prøv igjen senere.',
        'common.soknadErrorMessages.unavailableSoknadStep.linkText': 'Gå tilbake til {steg}',

        'common.soknadErrorMessages.missingApiData.title': 'Det oppstod en feil under visning av siden',
        'common.soknadErrorMessages.missingApiData.content':
            'Det virker til at noe informasjon mangler på tidligere steg. Vennligst gå tilbake og korriger dette.',

        'common.soknadErrorMessages.applicationUnavailable.title': 'Søknaden er dessverre ikke tilgjengelig',
        'common.soknadErrorMessages.applicationUnavailable.content':
            'Vi jobber så raskt vi kan med å få den tilgjengelig.',

        'common.soknadErrorMessages.unknownRoute.title': 'Du har kommet til en side som ikke finnes',
        'common.soknadErrorMessages.unknownRoute.content':
            'Noe gikk feil under visning av denne siden. Vennligst gå tilbake og prøv på nytt.',
        'common.soknadErrorMessages.unknownRoute.reset':
            'Dersom feilen bare fortsetter, kan du prøve å starte på nytt. Da vil det du har fylt ut i skjemaet bli slettet, og du kommer tilbake til startsiden.',
        'common.soknadErrorMessages.unknownRoute.reset.buttonLabel': 'Start på nytt',
    },
    nn: {
        'common.soknadErrorMessages.defaultTitle': 'Noko gjekk gale ...',
        'common.soknadErrorMessages.generalError.content':
            'Beklagar, her har det dessverre skjedd ein feil. Dersom feilen held fram, prøv igjen litt seinare.',

        'common.soknadErrorMessages.generalSoknadError.content':
            'Beklagar, her har det dessverre skjedd ein feil. Ver vennleg og gå tilbake og prøv igjen. Dersom feilen held fram, prøv igjen litt seinare.',
        'common.soknadErrorMessages.gotoSoknadFrontpage': 'Gå tilbake til startsida for søknaden',

        'common.soknadErrorMessages.missingSoknadData.title': 'Det oppstod ein feil under visinga av sida',
        'common.soknadErrorMessages.missingSoknadData.content':
            'Noko gjekk gale under visinga av denne sida. Du må dessverre fylle ut søknaden på nytt. Vi beklagar ulempa dette fører med seg for deg.',

        'common.soknadErrorMessages.unavailableSoknadStep.title': 'Det oppstod ein feil under visinga av sida',
        'common.soknadErrorMessages.unavailableSoknadStep.content':
            'Noko gjekk gale under visinga av denne sida. Du må dessverre fylle ut søknaden på nytt. Vi beklagar ulempa dette fører med seg for deg.',
        'common.soknadErrorMessages.unavailableSoknadStep.linkText': 'Gå tilbake til {steg}',

        'common.soknadErrorMessages.missingApiData.title': 'Det oppstod ein feil under visinga av sida',
        'common.soknadErrorMessages.missingApiData.content':
            'Det ser ut til at noko av informasjonen manglar på tidlegare steg. Ver vennleg og gå tilbake og korriger dette.',

        'common.soknadErrorMessages.applicationUnavailable.title': 'Søknaden er dessverre ikkje tilgjengeleg',
        'common.soknadErrorMessages.applicationUnavailable.content':
            'Vi jobbar så raskt vi kan med å gjere han tilgjengeleg.',

        'common.soknadErrorMessages.unknownRoute.title': 'Du har kome til ei side som ikkje finst',
        'common.soknadErrorMessages.unknownRoute.content': 'Ver vennleg og gå tilbake',
    },
};

export default soknadErrorIntlMessages;
