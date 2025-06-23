import { avbrytSøknadDialogMessages_nb } from '../components/avbrytSøknadDialog/i18n/nb';
import { fortsettSøknadSenereDialogMessages_nb } from '../components/fortsettSøknadSenereDialog/i18n/nb';
import { soknadErrorMessages_nb } from '../components/soknad-error-messages/i18n/nb';
import { samtykkeFormMessages_nb } from '../modules/samtykke-form/i18n/nb';

export const soknadMessages_nb = {
    'application.title': 'Applikasjonen', // Kun fallback - skal overstyres i hver app
    '@soknad.stepConfig.previousStepLinkText': 'Tilbake til {title}',
    '@soknad.loadingPage.henterInformasjon': 'Henter informasjon',
    '@soknad.stepFooter.avbryt': 'Slett søknaden',
    '@soknad.stepFooter.fortsettSenere': 'Fortsett senere',
    '@soknad.velkommenGuide.tittel': 'Hei, {navn}',
    ...samtykkeFormMessages_nb,
    ...soknadErrorMessages_nb,
    ...avbrytSøknadDialogMessages_nb,
    ...fortsettSøknadSenereDialogMessages_nb,
};
