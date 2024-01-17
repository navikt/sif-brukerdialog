import { avbrytSøknadDialogMessages } from '../components/avbrytSøknadDialog/avbrytSøknadDialogMessages';
import { fortsettSøknadSenereDialogMessages } from '../components/fortsettSøknadSenereDialog/fortsettSøknadSenereDialogMessages';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeFormMessages';
import soknadErrorMessages from '../components/soknad-error-messages/soknadError.messages';

const nb = {
    'application.title': 'Applikasjonen', // Overstyres i hver app
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Henter informasjon',
    ...samtykkeFormMessages.nb,
    ...soknadErrorMessages.nb,
    ...avbrytSøknadDialogMessages.nb,
    ...fortsettSøknadSenereDialogMessages.nb,
};

export type SoknadIntlMessageKeys = keyof typeof nb;

export type SoknadIntlMessagesType = Record<SoknadIntlMessageKeys, string>;

const nn: SoknadIntlMessagesType = {
    'application.title': 'Applikasjonen',
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Hentar informasjon',
    ...samtykkeFormMessages.nn,
    ...soknadErrorMessages.nn,
    ...avbrytSøknadDialogMessages.nn,
    ...fortsettSøknadSenereDialogMessages.nn,
};

const soknadIntlMessages = {
    nb,
    nn,
};

export default soknadIntlMessages;
