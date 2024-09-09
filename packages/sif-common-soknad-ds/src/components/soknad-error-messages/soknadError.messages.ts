const nb = {
    '@soknad.errorPage.defaultTitle': 'Det oppstod en feil',

    '@soknad.soknadErrorMessages.defaultTitle': 'Noe gikk galt...',
    '@soknad.soknadErrorMessages.generalError.content':
        'Beklager, her har det dessverre skjedd en feil. Dersom feilen fortsetter, prøv igjen litt senere.',

    '@soknad.soknadErrorMessages.generalSoknadError.content':
        'Beklager, her har det dessverre skjedd en feil. Vennligst gå tilbake og prøv igjen. Dersom feilen fortsetter, prøv igjen litt senere.',
    '@soknad.soknadErrorMessages.gotoSoknadFrontpage': 'Gå tilbake til startsiden for søknaden',

    '@soknad.soknadErrorMessages.missingSoknadData.title': 'Det oppstod en feil under visning av siden',
    '@soknad.soknadErrorMessages.missingSoknadData.content':
        'Noe gikk feil under visning av denne siden. Vennligst gå tilbake og se over søknaden på nytt.',

    '@soknad.soknadErrorMessages.unavailableSoknadStep.title': 'Det oppstod en feil under visning av siden',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.content':
        'Noe gikk feil under visning av denne siden, vennligst gå tilbake og se over søknaden. Dersom feilen vedvarer, prøv igjen senere.',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.linkText': 'Gå tilbake til {steg}',

    '@soknad.soknadErrorMessages.missingApiData.title': 'Det oppstod en feil under visning av siden',
    '@soknad.soknadErrorMessages.missingApiData.content':
        'Det virker til at noe informasjon mangler på tidligere steg. Vennligst gå tilbake og korriger dette.',

    '@soknad.soknadErrorMessages.applicationUnavailable.title': 'Søknaden er dessverre ikke tilgjengelig',
    '@soknad.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobber så raskt vi kan med å få den tilgjengelig.',

    '@soknad.soknadErrorMessages.unknownRoute.title': 'Du har kommet til en side som ikke finnes',
    '@soknad.soknadErrorMessages.unknownRoute.content':
        'Noe gikk feil under visning av denne siden. Vennligst gå tilbake og prøv på nytt.',
    '@soknad.soknadErrorMessages.unknownRoute.reset':
        'Dersom feilen bare fortsetter, kan du prøve å starte på nytt. Da vil det du har fylt ut i skjemaet bli slettet, og du kommer tilbake til startsiden.',
    '@soknad.soknadErrorMessages.unknownRoute.reset.buttonLabel': 'Start på nytt',
};

const nn: Record<keyof typeof nb, string> = {
    '@soknad.errorPage.defaultTitle': 'Det oppstod ein feil',

    '@soknad.soknadErrorMessages.defaultTitle': 'Noko gjekk gale ...',
    '@soknad.soknadErrorMessages.generalError.content':
        'Beklagar, her har det dessverre skjedd ein feil. Dersom feilen held fram, prøv igjen litt seinare.',

    '@soknad.soknadErrorMessages.generalSoknadError.content':
        'Beklagar, her har det dessverre skjedd ein feil. Ver vennleg og gå tilbake og prøv igjen. Dersom feilen held fram, prøv igjen litt seinare.',
    '@soknad.soknadErrorMessages.gotoSoknadFrontpage': 'Gå tilbake til startsida for søknaden',

    '@soknad.soknadErrorMessages.missingSoknadData.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.missingSoknadData.content':
        'Noko gjekk gale under visinga av denne sida. Du må dessverre fylle ut søknaden på nytt. Vi beklagar ulempa dette fører med seg for deg.',

    '@soknad.soknadErrorMessages.unavailableSoknadStep.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.content':
        'Noko gjekk gale under visinga av denne sida. Du må dessverre fylle ut søknaden på nytt. Vi beklagar ulempa dette fører med seg for deg.',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.linkText': 'Gå tilbake til {steg}',

    '@soknad.soknadErrorMessages.missingApiData.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.missingApiData.content':
        'Det ser ut til at noko av informasjonen manglar på tidlegare steg. Ver vennleg og gå tilbake og korriger dette.',

    '@soknad.soknadErrorMessages.applicationUnavailable.title': 'Søknaden er dessverre ikkje tilgjengeleg',
    '@soknad.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobbar så raskt vi kan med å gjere han tilgjengeleg.',

    '@soknad.soknadErrorMessages.unknownRoute.title': 'Du har kome til ei side som ikkje finst',
    '@soknad.soknadErrorMessages.unknownRoute.content': 'Ver vennleg og gå tilbake',

    '@soknad.soknadErrorMessages.unknownRoute.reset':
        'Dersom feilen berre held fram, kan du prøva å starta på nytt. Då vil det du har fylt ut i skjemaet bli sletta, og du kjem tilbake til startsida.',
    '@soknad.soknadErrorMessages.unknownRoute.reset.buttonLabel': 'Start på nytt',
};

export const soknadErrorMessages = {
    nb,
    nn,
};
