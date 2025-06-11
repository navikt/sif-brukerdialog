import { soknadErrorMessages_nb } from './nb';

export const soknadErrorMessages_nn: Record<keyof typeof soknadErrorMessages_nb, string> = {
    '@soknad.errorPage.defaultTitle': 'Det oppstod ein feil',

    '@soknad.soknadErrorMessages.defaultTitle': 'Noko gjekk gale ...',
    '@soknad.soknadErrorMessages.generalError.content':
        'Beklagar, her har det dessverre skjedd ein feil. Dersom feilen held fram, prøv igjen litt seinare.',

    '@soknad.soknadErrorMessages.generalSoknadError.content':
        'Beklagar, her har det dessverre skjedd ein feil. Ver venleg og gå tilbake og prøv igjen. Dersom feilen held fram, prøv igjen litt seinare.',
    '@soknad.soknadErrorMessages.gotoSoknadFrontpage': 'Gå tilbake til startsida for søknaden',

    '@soknad.soknadErrorMessages.missingSoknadData.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.missingSoknadData.content':
        'Noke gjekk gale under visinga av denne sida. Ver venleg og gå tilbake og sjå over søknaden på nytt. Me beklagar ulempa dette fører med seg for deg.',

    '@soknad.soknadErrorMessages.unavailableSoknadStep.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.content':
        'Noke gjekk gale under visinga av denne sida, ver venleg og gå tilbake og sjå over søknaden. Dersom feilen held fram, prøv igjen seinare. Me beklagar ulempa dette fører med seg for deg.',
    '@soknad.soknadErrorMessages.unavailableSoknadStep.linkText': 'Gå tilbake til {steg}',

    '@soknad.soknadErrorMessages.missingApiData.title': 'Det oppstod ein feil under visinga av sida',
    '@soknad.soknadErrorMessages.missingApiData.content':
        'Det ser ut til at noko av informasjonen manglar på tidlegare steg. Ver venleg og gå tilbake og rett opp i dette.',

    '@soknad.soknadErrorMessages.applicationUnavailable.title': 'Søknaden er dessverre ikkje tilgjengeleg',
    '@soknad.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobbar så raskt vi kan med å få den tilgjengeleg.',

    '@soknad.soknadErrorMessages.unknownRoute.title': 'Du har kome til ei side som ikkje finst',
    '@soknad.soknadErrorMessages.unknownRoute.content':
        'Noko gjekk feil under visninga av denne sida. Ver venleg og gå tilbake.',

    '@soknad.soknadErrorMessages.unknownRoute.reset':
        'Dersom feilen berre held fram, kan du prøva å starta på nytt. Då vil det du har fylt ut i skjemaet bli sletta, og du kjem tilbake til startsida.',
    '@soknad.soknadErrorMessages.unknownRoute.reset.buttonLabel': 'Start på nytt',
};
