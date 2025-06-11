import { avbrytSøknadDialogMessages_nn } from '../components/avbrytSøknadDialog/i18n/nn';
import { fortsettSøknadSenereDialogMessages_nn } from '../components/fortsettSøknadSenereDialog/i18n/nn';
import { soknadErrorMessages_nn } from '../components/soknad-error-messages/i18n/nn';
import { samtykkeFormMessages_nn } from '../modules/samtykke-form/i18n/nn';
import { SoknadMessagesType } from './soknad.messages';

export const soknadMessages_nn: SoknadMessagesType = {
    'application.title': 'Applikasjonen', // Kun fallback - skal overstyres i hver app
    '@soknad.stepConfig.previousStepLinkText': 'Tilbake til {title}',
    '@soknad.loadingPage.henterInformasjon': 'Hentar informasjon',
    '@soknad.stepFooter.avbryt': 'Slett søknaden',
    '@soknad.stepFooter.fortsettSenere': 'Fortset seinare',
    '@soknad.velkommenGuide.tittel': 'Hei, {navn}',

    ...samtykkeFormMessages_nn,
    ...soknadErrorMessages_nn,
    ...avbrytSøknadDialogMessages_nn,
    ...fortsettSøknadSenereDialogMessages_nn,
};
